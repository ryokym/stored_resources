import { select, takeLatest, put } from "redux-saga/effects";
import { selectFieldState } from "~/utils/selectors";
import { mainActions } from "~/actions";
import ActionTypes from "~/utils/actionTypes";

function* toggleExpand() {
  let { isview, isexpand } = yield select(selectFieldState);
  if (isview) {
    const behavior = isexpand ? "change" : "expand";
    yield put(
      mainActions.clickExpandNext({
        behavior: behavior,
        isexpand: !isexpand
      })
    );
  }
}

export default takeLatest(ActionTypes.CLICK_EXPAND, toggleExpand);
