import { combineReducers } from "redux";
import modeReducer from "./account/modeReducer";
import formReducer from "./account/formReducer";

export const accountReducer = combineReducers({
  modeReducer,
  formReducer
});
