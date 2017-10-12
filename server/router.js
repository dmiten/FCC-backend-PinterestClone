"use strict";

import { userCtrl } from "./userctrl";
import { picCtrl } from "./picctrl";

export default function router(app, passport) {

  app.get("/api/user/withtwitter",
      (req, res, next) => userCtrl.withTwitter(req, res, next, passport));

  app.get("/api/user/withtwitter/callback",
      (req, res, next) => userCtrl.withTwitterCallback(req, res, next, passport));

  app.get("/api/user/signout",
      (req, res, next) => userCtrl.mustAuth(req, res, next),
      (req, res) => userCtrl.signout(req, res));

  app.get("/api/pic/get",
      (req, res, next) => picCtrl.get(req, res, next));

  app.post("/api/pic/add",
      (req, res, next) => userCtrl.mustAuth(req, res, next),
      (req, res, next) => picCtrl.add(req, res, next));

  app.post("/api/pic/update",
      (req, res, next) => userCtrl.mustAuth(req, res, next),
      (req, res, next) => picCtrl.update(req, res, next));

  app.post("/api/pic/delete",
      (req, res, next) => userCtrl.mustAuth(req, res, next),
      (req, res, next) => picCtrl.delete(req, res, next));

  app.use((req, res) => {
    res.status(404).send("Wrong address used.");
  });

  app.use((err, req, res) => {
    res.status(500).send("Internal server error.");
  });
};