import { select, call, fork, takeLatest, put, join } from "redux-saga/effects";
import common from "../../utils/common";
import { rebuildWorkdir, rebuildStructure } from "./modules/generator";
import {
  selectStructure,
  selectWorkingDirectory
} from "../../selectors/mainSelector";
import {
  getNewStructure,
  printWorkingDirectory,
  clickDirectoryResource,
  getFileContent
} from "../../actions/mainAction";

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
  yield put(getNewStructure("change", structure));
}

function* fetchResources(props) {
  let params = props.payload;
  let workdir = yield select(selectWorkingDirectory);

  workdir = yield call(rebuildWorkdir, workdir, params.hierarchy);
  const isRootdir = workdir === "" ? true : false;
  const newWorkdir = isRootdir ? params.name : [workdir, params.name].join("/");
  yield put(printWorkingDirectory(newWorkdir));
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
    yield put(clickDirectoryResource());
    newStructure.set(newStructure.size, response.result);
  } else {
    yield put(getFileContent(response.result));
  }
  yield put(getNewStructure("change", newStructure));
}

const behaviorSaga = [
  takeLatest("INITIATE", fetchListBucket),
  takeLatest("CLICK_ROW", fetchResources)
];

export default behaviorSaga;
