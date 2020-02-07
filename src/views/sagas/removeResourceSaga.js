import { call, select, takeLatest, put } from "redux-saga/effects";
import { selectStructure, selectFieldState } from "~/utils/selectors";
import { rebuildWorkdir } from "./modules/generator";
import { mainActions } from "~/actions";
import ActionTypes from "~/utils/actionTypes";
import common from "~/utils/common";

function doAsync(params) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto);
}

function* fetchRemoveResource(props) {
  let { isSelected, hierarchy, ...params } = props.payload;
  hierarchy = Number(hierarchy);
  params.actionType = "remove";
  yield call(doAsync, params);
  let { structure, workdir } = yield select(selectStructure);
  let column = structure.get(hierarchy);
  column = column.filter(item => {
    return item !== params.name;
  });
  structure.set(hierarchy, column);
  const { isview } = yield select(selectFieldState);
  if (isview && isSelected && structure.size - 1 === hierarchy) {
    yield put(
      mainActions.clearContentView({
        content: "",
        isview: false
      })
    );
  }
  if (isSelected) {
    workdir = yield call(rebuildWorkdir, workdir, hierarchy);
    yield put(
      mainActions.printWorkingDirectory({
        workdir: workdir
      })
    );
    for (let key of structure.keys()) {
      hierarchy < key && structure.delete(key);
    }
  }
  yield put(
    mainActions.redrawStructure({
      structure: structure
    })
  );

  yield put(mainActions.didRemoveResource());
  yield put(mainActions.clickCloseModal());
}
export default takeLatest(ActionTypes.REMOVE_RESOURCE, fetchRemoveResource);
