import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Account from "./containers/Account";
import reducer from "./reducers";

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Account />
  </Provider>,
  document.getElementById("app")
);
