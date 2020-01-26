import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import modeReducer from "./account/modeReducer";
import formReducer from "./account/formReducer";
import behaviorReducer from "./main/behaviorReducer";
import structureReducer from "./main/structureReducer";
import fieldReducer from "./main/fieldReducer";
import modalFormReducer from "./main/modalFormReducer";

export const accountReducer = combineReducers({
  modalReducer,
  modeReducer,
  formReducer
});

export const mainReducer = combineReducers({
  modalReducer,
  behaviorReducer,
  structureReducer,
  fieldReducer,
  modalFormReducer
});
