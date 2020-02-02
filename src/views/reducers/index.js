import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import formReducer from "./formReducer";
import behaviorReducer from "./behaviorReducer";
import structureReducer from "./structureReducer";
import fieldReducer from "./fieldReducer";
import workReducer from "./workReducer";

export const accountReducer = combineReducers({
  modalReducer,
  behaviorReducer,
  formReducer
});

export const mainReducer = combineReducers({
  modalReducer,
  behaviorReducer,
  structureReducer,
  fieldReducer,
  formReducer,
  workReducer
});
