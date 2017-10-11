"use strict";

import { serverLog } from "./server";

export const userCtrl = {};

userCtrl.withTwitter = (req, res, next, passport) => { // ◄---------------------
  passport.authenticate("twitter")(req, res, next, passport);
};

userCtrl.withTwitterCallback = (req, res, next, passport) => { // ◄-------------
  passport.authenticate("twitter", (err, user) => {
    if (err) {
//      return next(err);
      console.log(err)
    } else {
      req.login(user, err => {
        if (err) {
//          return next(err);
          console.log(err)
        } else {
          serverLog("info", "userCtrl.withTwitterCallback - user " +
              user._id + " signed in");
          return res.send(finishOauthWindow(user));
        }
      });
    }
  })(req, res, next, passport);
};

userCtrl.mustAuth = (req, res, next) => { // ◄----------------------------------
  req.isAuthenticated() ?
      next() :
      res.redirect("/");
};

userCtrl.signout = (req, res) => { // ◄-----------------------------------------
  req.logout();
  res.redirect("/");
};

let finishOauthWindow = (user) => { // ◄----------------------------------------
  return (`
    <html>
      <head>
        <script>
          opener.receiveFromChild(${JSON.stringify(user)});
          window.close();
        </script>
      </head>
    </html>
  `);
};