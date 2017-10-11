"use strict";

import React from "react";
import { render } from "react-dom";
import thunk from "redux-thunk";
import reduxLogger from "redux-logger";
import { Provider } from "react-redux";
import {
  createStore,
  applyMiddleware
} from "redux";

import { reducer } from "./reducers/reducer";
import { App } from "./components";

let middlewares = [thunk],
    persistentState = {
      mode: undefined,
      user: undefined
    };

if(localStorage.user){
  persistentState.user = JSON.parse(localStorage.user);
}

if(process.env.NODE_ENV !== "production"){
  middlewares.push(reduxLogger);
}

const store = createStore(
    reducer,
    persistentState,
    applyMiddleware(...middlewares)
);

render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById("root")
);

