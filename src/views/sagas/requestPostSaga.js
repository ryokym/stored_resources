import { select, call, takeLatest, put } from "redux-saga/effects";
import { selectBehavior, selectForm } from "~/utils/selectors";
import { accountActions } from "~/actions";
import ActionTypes from "~/utils/actionTypes";
import common from "~/utils/common";

function doAsync(formdata) {
  const pathto = "/api/account.php";
  return common.callFetch(formdata, pathto);
}

function* didEnter() {
  location.href = "/";
}

function* didCreate() {
  yield put(
    accountActions.requireVerifyForm({
      behavior: "verify",
      bucketkey: common.createKey()
    })
  );
  yield put(accountActions.clickOpenModalVerify());
}

function* didVerify() {
  alert("account creation suceeded!");
  location.href = "/";
}

function* executeIfNeeded() {
  const { behavior } = yield select(selectBehavior);
  const { ...formdata } = yield select(selectForm);
  formdata.actionType = behavior;
  const response = yield call(doAsync, formdata);
  switch (response) {
    case "enter":
      return yield call(didEnter);
    case "create":
      return yield call(didCreate);
    case "verify":
      return yield call(didVerify);
    default:
      alert(response);
  }
}

export default takeLatest(ActionTypes.REQUEST_POST, executeIfNeeded);
