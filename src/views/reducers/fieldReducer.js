import ActionTypes from "~/utils/actionTypes";

const initialState = {
  content: "",
  isview: false,
  isremove: false,
  isexpand: false
};

const fieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_FILE_CONTENT:
      return {
        ...state,
        content: action.payload.content,
        isview: action.payload.isview
      };
    case ActionTypes.CLICK_DIRECTORY_RESOURCE:
      return {
        ...state,
        content: action.payload.content,
        isview: action.payload.isview
      };
    case ActionTypes.CLICK_REMOVE_NEXT:
      return {
        ...state,
        isremove: action.payload.isremove
      };
    case ActionTypes.CLEAR_CONTENT_VIEW:
      return {
        ...state,
        content: action.payload.content,
        isview: action.payload.isview
      };
    case ActionTypes.CLICK_EXPAND_NEXT:
      return {
        ...state,
        isexpand: action.payload.isexpand
      };
    default:
      return { ...state };
  }
};

export default fieldReducer;
