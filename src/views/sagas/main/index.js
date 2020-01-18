import { all } from "redux-saga/effects";
import logoutSaga from "./logoutSaga";
import behaviorSaga from "./behaviorSaga";

export default function* rootSaga() {
  yield all([...logoutSaga, ...behaviorSaga]);
}
