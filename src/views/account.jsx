import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Account from "./containers/Account";
import configureStore from "./configureStore";

const store = configureStore();

render(
  <Provider store={store}>
    <Account />
  </Provider>,
  document.getElementById("app")
);
