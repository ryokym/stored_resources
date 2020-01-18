const initialAppState = {
  structure: []
};

const structureReducer = (state = initialAppState, action) => {
  if (action.type === "GET_RESOURCES") {
    return {
      ...state,
      structure: action.payload.resources
    };
  } else {
    return {
      ...state
    };
  }
};

export default structureReducer;
