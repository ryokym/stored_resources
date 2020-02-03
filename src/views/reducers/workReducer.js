import ActionTypes from "~/utils/actionTypes";

const initialState = {
  name: "",
  path: ""
};

const workReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUIRE_REMOVE_MODAL:
      return {
        ...state,
        name: action.payload.name,
        path: action.payload.path
      };
    case ActionTypes.BREAK_WORKING_RESOURCE:
      return {
        ...initialState
      };
    case ActionTypes.DID_REMOVE_RESOURCE:
      return {
        name: action.payload.name,
        path: action.payload.path
      };
    default:
      return { ...state };
  }
};

export default workReducer;
