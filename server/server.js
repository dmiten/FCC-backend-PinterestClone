"use strict";

import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import expressWinston from "express-winston";
import helmet from "helmet";
import http from "http";
import https from "https";
import session from "express-session";
import winston from "winston";

import mongoose from "mongoose";
import MongoStore from "connect-mongo";

// ▼--------------- { cert: cert.pem, key: key.pem } for HTTPS or falsy for HTTP
import { getCredentials } from "./.data/credentials";
import { dbStart } from "./handledb";
import makePassport from "./makepassport";
import router from "./router";

function getWinston() { // ◄----------------------------------------------------
  let winstonOptions = {
    colorize: true,
    json: false,
    timestamp: () => {
      let date = new Date(Date.now());
      return date.toLocaleString() + "." + date.getUTCMilliseconds();
    }
  };
  return new winston.Logger({
    transports: [new winston.transports.Console(winstonOptions)]
  });
}

export function serverLog(type, message) { // ◄---------------------------------
  getWinston()[type](message);
}

export function serverStart() { // ◄--------------------------------------------
  Promise.all([dbStart(), getCredentials()])
  .then(([dbStarted, credentials]) => serverApp(credentials));
}

export function serverApp(credentials) { // ◄-----------------------------------
  let app = express(),
      passport = makePassport(),
      httpApp,
      server;

  app.use(helmet());
  app.use(expressWinston.logger({
    expressFormat: true,
    meta: false,
    msg: "HTTP(s) {{ req.method }} {{ req.url }}",
    transports: [getWinston()]
  }));
  app.use(compression());
  app.use("/", express.static("./public/"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new (MongoStore(session))({ db: mongoose.connection.db })
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  router(app, passport);

  if (credentials) {

    httpApp = express();
    app.set("port", process.env.PORT || 8443);
    httpApp.set("port", process.env.PORT || 8080);
    httpApp.set(helmet());

    httpApp.get("*", (req, res) => {
      res.redirect("https://" + req.hostname +":" + app.get("port") + req.url);
      serverLog("info", "serverApp - redirected to HTTPS");
    });

    http.createServer(httpApp)
    .listen(httpApp.get("port"), () => {
      serverLog("info", "serverApp - express HTTP server listening on port " +
          httpApp.get("port"));
    });

    server = https.createServer(credentials, app);

    server.listen(app.get("port"), () => {
      serverLog("info", "serverApp - express HTTPS server listening on port " +
          app.get("port"));
    });

  } else {

    app.set("port", process.env.PORT || 8080);

    server = http.createServer(app);

    server.listen(app.get("port"), () => {
      serverLog("info", "serverApp - express HTTP server listening on port " +
          app.get("port"));
    });
  }

  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ]
  }));
}