"use strict";

let initialState = {
  userIdToShow: undefined
};

export const mode = (state = initialState, action) => {
  switch (action.type) {
    case "MODE_SWITCH": // ◄----------------------------------------------------
      return {
        userIdToShow: action.payload
      };
    default:
      return state;
  }
};