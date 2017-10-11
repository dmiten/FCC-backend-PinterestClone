"use strict";

import { combineReducers } from "redux";

import { mode } from "./mode-reducer";
import { pics } from "./pics-reducer";
import { user } from "./user-reducer";

export const reducer = combineReducers({ mode, pics, user });