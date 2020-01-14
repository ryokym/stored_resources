import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { accountReducer } from "./reducers";
import rootSaga from "./sagas";

export function accountConfigureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(accountReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return store;
}
