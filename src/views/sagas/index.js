import { all } from "redux-saga/effects";
import requestPostSaga from "./requestPostSaga";
import logoutSaga from "./logoutSaga";
import clickRowSaga from "./clickRowSaga";
import clickRemoveSaga from "./clickRemoveSaga";
import InitiateSaga from "./InitiateSaga";
import makeDirectorySaga from "./makeDirectorySaga";
import removeResourceSaga from "./removeResourceSaga";

export function* accountRootSaga() {
  yield all([requestPostSaga]);
}

export function* mainRootSaga() {
  yield all([
    logoutSaga,
    clickRowSaga,
    clickRemoveSaga,
    InitiateSaga,
    makeDirectorySaga,
    removeResourceSaga
  ]);
}
