"use strict";

import axios from "axios";

export const userWithTwitter = () => { // ◄-------------------------------------
  return dispatch => {
    dispatch({ type: "USER_WITHTWITTER_START" });
    window.open("/api/user/withTwitter", "oauth with twitter");
    window.receiveFromChild  = (user) => {
      dispatch(userWithTwitterSuccess(user));
      localStorage.user = JSON.stringify(user);
    };
  };
};

const userWithTwitterSuccess = user => ({ // ◄----------------------------------
  type: "USER_WITHTWITTER_SUCCESS",
  payload: { user: user }
});

export const userSignOut = () => { // ◄-----------------------------------------
  return dispatch => {
    dispatch({ type: "USER_SIGNOUT_START" });
    axios("/api/user/signout")
    .then(() => {
      delete localStorage.user;
      dispatch ({type: "USER_SIGNOUT_SUCCESS" });
    })
    .catch(err => console.log(err));
  };
};