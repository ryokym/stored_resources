import { select, takeLatest, put } from "redux-saga/effects";
import { selectFieldStatusForRemove } from "../selectors/mainSelector";
import { mainActions } from "../actions";
import { baseToast, toastMsg } from "~/configureToast";
import { toast } from "react-toastify";
toast.configure(baseToast);

function* toggleRemove() {
  let isremove = yield select(selectFieldStatusForRemove);
  const behavior = isremove ? "change" : "remove";
  behavior === "remove" && toast.error(toastMsg.clickRemove);
  yield put(
    mainActions.clickRemoveNext({
      behavior: behavior,
      isremove: !isremove
    })
  );
}

export default takeLatest("CLICK_REMOVE", toggleRemove);
