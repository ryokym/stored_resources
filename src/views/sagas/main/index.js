import { all } from "redux-saga/effects";
import logoutSaga from "./logoutSaga";

export default function* rootSaga() {
  yield all([...logoutSaga]);
}
