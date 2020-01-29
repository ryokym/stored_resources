import { all } from "redux-saga/effects";
import requestPostSaga from "./requestPostSaga";
import logoutSaga from "./logoutSaga";
import clickRowSaga from "./clickRowSaga";
import InitiateSaga from "./InitiateSaga";
import makeDirectorySaga from "./makeDirectorySaga";

export function* accountRootSaga() {
  yield all([requestPostSaga]);
}

export function* mainRootSaga() {
  yield all([logoutSaga, clickRowSaga, InitiateSaga, makeDirectorySaga]);
}
