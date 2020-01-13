import { receivePost } from "../actions";
import { select, call, fork, takeLatest, put } from "redux-saga/effects";
import {
  selectMode,
  selectFormdataForSignInOrUp,
  selectFormdataForCreateAccount
} from "../selectors";
import common from "../utils/common";

function doAsync(formdata) {
  const pathto = "/api/account.php";
  return common.callFetch(formdata, pathto);
}

function* executeIfNeeded(action) {
  const mode = yield select(selectMode);
  if (mode === "enter" || mode === "create") {
    const formdata = yield select(selectFormdataForSignInOrUp);
    const data = yield call(doAsync, formdata);
    yield put(receivePost(data));
  } else if (mode === "verify") {
    const formdata = yield select(selectFormdataForCreateAccount);
    const data = yield call(doAsync, formdata);
    yield put(receivePost(data));
  }
}

export default function* rootSaga() {
  yield takeLatest("REQUEST_POST", executeIfNeeded);
}
