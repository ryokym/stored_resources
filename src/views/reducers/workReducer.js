const initialState = {
  name: "",
  path: ""
};

const workReducer = (state = initialState, action) => {
  if (action.type === "REQUIRE_REMOVE_MODAL") {
    return {
      ...state,
      name: action.payload.name,
      path: action.payload.path
    };
  } else if (action.type === "BREAK_WORKING_RESOURCE") {
    return {
      ...initialState
    };
  } else if (action.type === "DID_REMOVE_RESOURCE") {
    return {
      name: action.payload.name,
      path: action.payload.path
    };
  } else {
    return {
      ...state
    };
  }
};

export default workReducer;
