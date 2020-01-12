import { receivePost } from "../actions";
import { select, call, fork, takeLatest, put } from "redux-saga/effects";
import {
  selectMode,
  selectFormdataForEnter,
  selectFormdataForVerify
} from "../selectors";
import common from "../utils/common";

function doAsync(formdata) {
  const pathto = "/api/account.php";
  return common.callFetch(formdata, pathto);
}

function* executeIfNeeded(action) {
  const mode = yield select(selectMode);
  if (mode === "enter") {
    const formdata = yield select(selectFormdataForEnter);
    const data = yield call(doAsync, formdata);
    yield put(receivePost(data));
  } else if (mode === "create") {
    yield put(receivePost(""));
  } else if (mode === "verify") {
    const formdata = yield select(selectFormdataForVerify);
    const data = yield call(doAsync, formdata);
    yield put(receivePost(data));
  }
}

export default function* rootSaga() {
  yield takeLatest("REQUEST_POST", executeIfNeeded);
}
