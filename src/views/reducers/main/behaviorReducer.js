const initialState = {
  behavior: "change"
};

const behaviorReducer = (state = initialState, action) => {
  if (action.type === "REQUIRE_MKDIR_FORM") {
    return {
      ...state,
      behavior: action.payload.behavior
    };
  } else if (action.type === "BREAK_MKDIR_FORM") {
    return {
      ...state,
      behavior: action.payload.behavior
    };
  } else if (action.type === "GET_RESOURCES") {
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
