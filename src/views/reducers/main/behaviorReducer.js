const initialAppState = {
  mode: "change"
};

const behaviorReducer = (state = initialAppState, action) => {
  if (action.type === "CLICK_EXPAND") {
    return {
      ...state,
      behavior: action.payload.behavior
    };
  } else if (action.type === "CLICK_REMOVE") {
    return {
      ...state,
      behavior: action.payload.behavior
    };
  } else if (action.type === "CLICK_EDIT") {
    return {
      ...state,
      behavior: action.payload.behavior
    };
  } else {
    return {
      ...state
    };
  }
};

export default behaviorReducer;
