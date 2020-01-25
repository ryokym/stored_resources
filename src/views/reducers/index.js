import { combineReducers } from "redux";
import modeReducer from "./account/modeReducer";
import formReducer from "./account/formReducer";
import behaviorReducer from "./main/behaviorReducer";
import structureReducer from "./main/structureReducer";
import fieldReducer from "./main/fieldReducer";
import modalFormReducer from "./main/modalFormReducer";

export const accountReducer = combineReducers({
  modeReducer,
  formReducer
});

export const mainReducer = combineReducers({
  behaviorReducer,
  structureReducer,
  fieldReducer,
  modalFormReducer
});
