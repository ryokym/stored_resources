import { select, takeLatest, put } from "redux-saga/effects";
import { selectFieldState } from "~/utils/selectors";
import { mainActions } from "~/actions";
import ActionTypes from "~/utils/actionTypes";
import { baseToast, toastMsg } from "~/configureToast";
import { toast } from "react-toastify";
toast.configure(baseToast);

function* toggleRemove() {
  let { isremove } = yield select(selectFieldState);
  const behavior = isremove ? "change" : "remove";
  behavior === "remove" && toast.error(toastMsg.clickRemove);
  yield put(
    mainActions.clickRemoveNext({
      behavior: behavior,
      isremove: !isremove
    })
  );
}

export default takeLatest(ActionTypes.CLICK_REMOVE, toggleRemove);
