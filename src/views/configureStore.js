import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { accountReducer, mainReducer } from "./reducers";
import rootSaga from "./sagas/accountSaga";

export function accountConfigureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(accountReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return store;
}
export function mainConfigureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(mainReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return store;
}
