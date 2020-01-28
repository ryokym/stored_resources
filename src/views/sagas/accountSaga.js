import { accountActions } from "../actions";
import { select, call, fork, takeLatest, put } from "redux-saga/effects";
import {
  selectMode,
  selectFormdataForSignInOrUp,
  selectFormdataForCreateAccount
} from "../selectors/accountSelector";
import common from "../utils/common";

function doAsync(formdata) {
  const pathto = "/api/account.php";
  return common.callFetch(formdata, pathto);
}

function* dispatch(response) {
  if (response === "enter") {
    location.href = "/";
  } else if (response === "create") {
    yield put(accountActions.requireVerifyForm("verify", common.createKey()));
    yield put(accountActions.clickOpenModalVerify());
  } else if (response === "verify") {
    alert("account creation suceeded!");
    location.href = "/";
  } else {
    alert(response);
  }
}

function* executeIfNeeded() {
  const mode = yield select(selectMode);
  let formdata;
  if (mode === "verify") {
    formdata = yield select(selectFormdataForCreateAccount);
  } else {
    formdata = yield select(selectFormdataForSignInOrUp);
  }
  const response = yield call(doAsync, formdata);
  yield call(dispatch, response);
}

export default function* rootSaga() {
  yield takeLatest("REQUEST_POST", executeIfNeeded);
}
