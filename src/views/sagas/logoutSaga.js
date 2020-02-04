import { call, takeLatest } from "redux-saga/effects";
import ActionTypes from "~/utils/actionTypes";
import common from "~/utils/common";

function doAsync() {
  const pathto = "/api/main.php";
  return common.callFetch({ actionType: "logout" }, pathto);
}

function* executeLogout() {
  yield call(doAsync);
  location.href = "/";
}

export default takeLatest(ActionTypes.CLICK_LOGOUT, executeLogout);
