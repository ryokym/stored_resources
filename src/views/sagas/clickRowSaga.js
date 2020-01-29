import { select, call, takeLatest, put } from "redux-saga/effects";
import common from "../utils/common";
import { rebuildWorkdir, rebuildStructure } from "./modules/generator";
import {
  selectStructure,
  selectWorkingDirectory
} from "../selectors/mainSelector";
import { mainActions } from "../actions";

function doAsync(params) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto);
}

function* fetchResources(props) {
  let params = props.payload;
  let workdir = yield select(selectWorkingDirectory);

  workdir = yield call(rebuildWorkdir, workdir, params.hierarchy);
  const isRootdir = workdir === "" ? true : false;
  const newWorkdir = isRootdir ? params.name : [workdir, params.name].join("/");
  yield put(mainActions.printWorkingDirectory(newWorkdir));
  params.actionType = "change";
  params.path = workdir;
  let response = yield call(doAsync, params);
  response = JSON.parse(response);
  const structure = yield select(selectStructure);
  const newStructure = yield call(
    rebuildStructure,
    structure,
    params.hierarchy
  );
  if (response.isFile === false) {
    yield put(mainActions.clickDirectoryResource());
    newStructure.set(newStructure.size, response.result);
  } else {
    yield put(mainActions.getFileContent(response.result));
  }
  yield put(mainActions.getNewStructure("change", newStructure));
}

export default takeLatest("CLICK_ROW", fetchResources);
