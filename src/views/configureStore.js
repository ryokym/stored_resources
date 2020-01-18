import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { accountReducer, mainReducer } from "./reducers";
import accountRootSaga from "./sagas/accountSaga";
import mainRootSaga from "./sagas/main/index";

export function accountConfigureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(accountReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(accountRootSaga);

  return store;
}
export function mainConfigureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(mainReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(mainRootSaga);

  return store;
}
