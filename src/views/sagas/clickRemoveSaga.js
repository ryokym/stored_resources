import { select, takeLatest, put } from "redux-saga/effects";
import { selectFieldStatusForRemove } from "../selectors/mainSelector";
import { mainActions } from "../actions";

function* toggleRemove() {
  let isremove = yield select(selectFieldStatusForRemove);
  const behavior = isremove ? "remove" : "change";
  yield put(mainActions.clickRemoveNext(behavior, !isremove));
}

export default takeLatest("CLICK_REMOVE", toggleRemove);
