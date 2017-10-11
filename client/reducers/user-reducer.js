"use strict";

let initialState = {};

export const user = (state = initialState, action) => {
  switch(action.type) {
    case "USER_WITHTWITTER_SUCCESS": // ◄---------------------------------------
      return {
        ...state,
        ...action.payload.user
      };
    case "USER_SIGNOUT_SUCCESS": // ◄-------------------------------------------
      return {};
    default:
      return state;
  }
};