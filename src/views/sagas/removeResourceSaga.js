import { call, takeLatest, put } from "redux-saga/effects";
import { mainActions } from "../actions";
import common from "~/utils/common";

function doAsync(params) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto);
}

function* fetchRemoveResource(props) {
  let params = props.payload;
  params.actionType = "remove";
  yield call(doAsync, params);
  // TODO
  // 背景ディレクトリ構造を再描画
  yield put(mainActions.didRemoveResource());
  yield put(mainActions.clickCloseModal());
}
export default takeLatest("REMOVE_RESOURCE", fetchRemoveResource);
