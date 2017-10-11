"use strict";

import passport from "passport";
import passportTwitter from "passport-twitter";

import { serverLog } from "./server";
import User from "./usermodel";

export default function makePassport() {

  const twitterCallbackURL = process.env.NODE_ENV ?
      "https://daffy-payment.glitch.me/api/user/withtwitter/callback" :
      "https://127.0.0.1:8443/api/user/withtwitter/callback";

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use("twitter", new passportTwitter.Strategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: twitterCallbackURL,
        passReqToCallback: true
      },
      (req, token, tokenSecret, profile, done) => {
        User.findOne({ twitterId: profile.id }, (err, existingUser) => {

          if (existingUser) return done(null, existingUser);

          User.create({
                twitterId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                profilePhotos: profile.photos
              },
              (err, user) => done(err, user)
          );
        });
      }
  ));

  serverLog("info", "makePassport - passport ok");
  return passport;
}