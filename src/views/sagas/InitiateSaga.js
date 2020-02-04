import { select, call, takeLatest, put } from "redux-saga/effects";
import { selectStructure } from "~/selectors/mainSelector";
import { mainActions } from "~/actions";
import ActionTypes from "~/utils/actionTypes";
import common from "~/utils/common";

function doAsync(params) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto);
}

function* fetchListBucket() {
  const params = { actionType: "initiate" };
  const response = yield call(doAsync, params);
  const resources = JSON.parse(response);
  let structure = yield select(selectStructure);
  structure.set(structure.size, resources);
  yield put(
    mainActions.getNewStructure({
      behavior: "change",
      structure: structure
    })
  );
}

export default takeLatest(ActionTypes.INITIATE, fetchListBucket);
