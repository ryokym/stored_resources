import { all } from "redux-saga/effects";
import requestPostSaga from "./requestPostSaga";
import logoutSaga from "./logoutSaga";
import clickExpandSaga from "./clickExpandSaga";
import clickRowSaga from "./clickRowSaga";
import clickRemoveSaga from "./clickRemoveSaga";
import InitiateSaga from "./InitiateSaga";
import makeDirectorySaga from "./makeDirectorySaga";
import removeResourceSaga from "./removeResourceSaga";
import dropedResourceSaga from "./dropedResourceSaga";

export function* accountRootSaga() {
  yield all([requestPostSaga]);
}

export function* mainRootSaga() {
  yield all([
    logoutSaga,
    clickExpandSaga,
    clickRowSaga,
    clickRemoveSaga,
    InitiateSaga,
    makeDirectorySaga,
    removeResourceSaga,
    dropedResourceSaga
  ]);
}
