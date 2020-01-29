import { select, call, takeLatest, put } from "redux-saga/effects";
import common from "../utils/common";

function doAsync(params) {
  const pathto = "/api/main.php";
  return common.callFetch(params, pathto);
}

function* fetchMakeDirectory(props) {
  console.log(props);
}

export default takeLatest("MAKE_DIRECTORY", fetchMakeDirectory);
