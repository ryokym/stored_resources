import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Account from "./containers/Account";
import { accountConfigureStore } from "./configureStore";

const store = accountConfigureStore();

render(
  <Provider store={store}>
    <Account />
  </Provider>,
  document.getElementById("app")
);
