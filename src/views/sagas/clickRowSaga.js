import { select, call, takeLatest, put } from "redux-saga/effects";
import { selectBehavior, selectStructure } from "~/utils/selectors";
import { rebuildWorkdir, rebuildStructure } from "./modules/generator";
import { mainActions } from "~/actions";
import ActionTypes from "~/utils/actionTypes";
import common from "~/utils/common";

function doAsync(params) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto);
}

function* dispatchActionAtBehavior(props) {
  let { isSelected, ...params } = props.payload;
  const { behavior } = yield select(selectBehavior);
  let { workdir, structure } = yield select(selectStructure);
  params.actionType = behavior;

  if (params.actionType === "change") {
    workdir = yield call(rebuildWorkdir, workdir, params.hierarchy);
    const isRootdir = workdir === "" ? true : false;
    const newWorkdir = isRootdir
      ? params.name
      : [workdir, params.name].join("/");
    yield put(
      mainActions.printWorkingDirectory({
        workdir: newWorkdir
      })
    );
    params.path = workdir;
    let response = yield call(doAsync, params);
    response = JSON.parse(response);
    const newStructure = yield call(
      rebuildStructure,
      structure,
      params.hierarchy
    );
    if (response.isFile === false) {
      yield put(
        mainActions.clickDirectoryResource({
          content: "",
          isview: false
        })
      );
      newStructure.set(newStructure.size, response.result);
    } else {
      yield put(
        mainActions.getFileContent({
          content: response.result,
          isview: true
        })
      );
    }
    yield put(
      mainActions.getNewStructure({
        behavior: "change",
        structure: newStructure
      })
    );
  } else if (params.actionType === "remove") {
    params.path = yield call(rebuildWorkdir, workdir, params.hierarchy);
    yield put(
      mainActions.requireRemoveModal({
        name: params.name,
        path: params.path,
        hierarchy: params.hierarchy,
        isSelected: isSelected
      })
    );
    yield put(mainActions.clickOpenModalRemove());
  }
}

export default takeLatest(ActionTypes.CLICK_ROW, dispatchActionAtBehavior);
