"use strict";

export const modeSwitch = userId => ({ // ◄-------------------------------------
  type: "MODE_SWITCH",
  payload: userId
});