import ActionTypes from "~/utils/actionTypes";

const initialState = {
  behavior: "enter"
};

const behaviorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_NEW_STRUCTURE:
      return {
        ...state,
        behavior: action.payload.behavior
      };
    case ActionTypes.REQUIRE_MKDIR_FORM:
      return {
        ...state,
        behavior: action.payload.behavior
      };
    case ActionTypes.BREAK_MKDIR_FORM:
      return {
        ...state,
        behavior: action.payload.behavior
      };
    case ActionTypes.GET_RESOURCES:
      return {
        ...state,
        behavior: action.payload.behavior
      };
    case ActionTypes.CLICK_SIGNIN_OR_UP:
      return {
        ...state,
        behavior: action.payload.behavior
      };
    case ActionTypes.REQUIRE_VERIFY_FORM:
      return {
        ...state,
        behavior: action.payload.behavior
      };
    case ActionTypes.REQUIRE_SIGNIN_OR_UP_FORM:
      return {
        ...state,
        behavior: action.payload.behavior
      };
    case ActionTypes.CLICK_REMOVE_NEXT:
      return {
        ...state,
        behavior: action.payload.behavior
      };
    case ActionTypes.CLICK_EXPAND_NEXT:
      return {
        ...state,
        behavior: action.payload.behavior
      };
    default:
      return { ...state };
  }
};

export default behaviorReducer;
