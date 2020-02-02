import { select, call, takeLatest, put } from "redux-saga/effects";
import common from "../utils/common";
import { rebuildWorkdir, rebuildStructure } from "./modules/generator";
import {
  selectBehavior,
  selectStructure,
  selectWorkingDirectory
} from "../selectors/mainSelector";
import { mainActions } from "../actions";

function doAsync(params) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto);
}

function* dispatchActionAtBehavior(props) {
  let params = props.payload;
  const behavior = yield select(selectBehavior);
  let workdir = yield select(selectWorkingDirectory);
  params.actionType = behavior;

  if (params.actionType === "change") {
    workdir = yield call(rebuildWorkdir, workdir, params.hierarchy);
    const isRootdir = workdir === "" ? true : false;
    const newWorkdir = isRootdir
      ? params.name
      : [workdir, params.name].join("/");
    yield put(mainActions.printWorkingDirectory(newWorkdir));
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
  } else if (params.actionType === "remove") {
    params.path = common.rebuildPathForSpecifiedHierarchy(
      workdir,
      params.hierarchy
    );
    yield put(mainActions.requireRemoveModal(params.name, params.path));
    yield put(mainActions.clickOpenModalRemove());
  }
}

export default takeLatest("CLICK_ROW", dispatchActionAtBehavior);
