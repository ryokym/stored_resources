import { receivePost } from "../actions";
import { select, call, fork, takeLatest, put } from "redux-saga/effects";
import { selectMode, selectFormdataForEnter } from "../selectors";
import common from "../utils/common";

function tryLogin(formdata) {
  const pathto = "/api/account.php";
  return common.callFetch(formdata, pathto);
}

function* executeIfNeeded(action) {
  const mode = yield select(selectMode);
  switch (mode) {
    case "enter":
      const formdata = yield select(selectFormdataForEnter);
      const data = yield call(tryLogin, formdata);
      yield put(receivePost(data));
      break;
    case "create":
      break;
    case "verify":
      break;
  }
}

export default function* rootSaga() {
  yield takeLatest("REQUEST_POST", executeIfNeeded);
}
