import { select, takeLatest, put } from "redux-saga/effects";
import { selectFieldStatusForRemove } from "../selectors/mainSelector";
import { mainActions } from "../actions";
import baseToast from "~/configureToast";
import { toast } from "react-toastify";
toast.configure(baseToast);

function* toggleRemove() {
  let isremove = yield select(selectFieldStatusForRemove);
  const behavior = isremove ? "change" : "remove";
  behavior === "remove" && toast.error("mode remove");
  yield put(mainActions.clickRemoveNext(behavior, !isremove));
}

export default takeLatest("CLICK_REMOVE", toggleRemove);
