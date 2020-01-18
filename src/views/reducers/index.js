import { combineReducers } from "redux";
import modeReducer from "./account/modeReducer";
import formReducer from "./account/formReducer";
import behaviorReducer from "./main/behaviorReducer";
import structureReducer from "./main/structureReducer";

export const accountReducer = combineReducers({
  modeReducer,
  formReducer
});

export const mainReducer = combineReducers({
  behaviorReducer,
  structureReducer
});
