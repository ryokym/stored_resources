import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Main from "./containers/Main";
import { mainConfigureStore } from "./configureStore";

const store = mainConfigureStore();

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("app")
);
