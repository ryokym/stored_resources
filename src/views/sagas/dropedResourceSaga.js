import { select, call, takeLatest, put } from "redux-saga/effects";
import { selectStructure } from "~/utils/selectors";
import { mainActions } from "~/actions";
import ActionTypes from "~/utils/actionTypes";
import common from "~/utils/common";
import { baseToast, toastMsg } from "~/configureToast";
import { toast } from "react-toastify";
toast.configure(baseToast);

function doAsync(params, resource) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto, resource);
}

function* fetchUploadResource(props) {
  const { resource } = props.payload;
  const filename = resource[0].name;
  const isCorrectName = common.validateFileFormat(filename);
  if (isCorrectName) {
    let { workdir } = yield select(selectStructure);
    const params = {
      actionType: "upload",
      path: workdir,
      name: filename,
      filename: "uploaded"
    };

    const response = yield call(doAsync, params, resource[0]);
    if (response !== params.name) {
      alert(response);
      return;
    } else {
      let { structure } = yield select(selectStructure);
      const hierarchy = common.getHierarchy(params.path);
      let column = structure.get(hierarchy);
      column.push(params.name);
      structure.set(hierarchy, column);
      yield put(
        mainActions.redrawStructure({
          structure: structure
        })
      );
      toast.success(toastMsg.dropResource);
    }
  }
}
export default takeLatest(ActionTypes.DROPED_RESOURCE, fetchUploadResource);
