import { select, call, takeLatest, put } from "redux-saga/effects";
import { selectStructure } from "~/selectors/mainSelector";
import { mainActions } from "~/actions";
import ActionTypes from "~/utils/actionTypes";
import common from "~/utils/common";

function doAsync(params) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto);
}

function* fetchMakeDirectory(props) {
  let params = props.payload;
  const isCorrectName = common.validateFileFormat(params.name);
  if (isCorrectName) {
    params.actionType = "makedir";
    yield call(doAsync, params);
    let structure = yield select(selectStructure);
    const hierarchy = common.getHierarchy(params.path);
    let column = structure.get(hierarchy);
    column.push(params.name);
    structure.set(hierarchy, column);
    yield put(
      mainActions.continuousInputMkdirForm({
        dirname: ""
      })
    );
    yield put(
      mainActions.redrawStructure({
        structure: structure
      })
    );
  }
}
export default takeLatest(ActionTypes.MAKE_DIRECTORY, fetchMakeDirectory);
