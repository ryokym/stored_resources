import { select, call, fork, takeLatest, put } from "redux-saga/effects";
import common from "../../utils/common";
import { getResources } from "../../actions/mainAction";

function doAsync(params) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto);
}

function* fetchListBucket() {
  const params = { actionType: "initiate" };
  const response = yield call(doAsync, params);
  const resources = JSON.parse(response);
  yield put(getResources("change", resources));
}

const behaviorSaga = [takeLatest("INITIATE", fetchListBucket)];

export default behaviorSaga;
