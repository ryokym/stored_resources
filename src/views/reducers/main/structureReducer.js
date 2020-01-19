const initialAppState = {
  structure: new Map(),
  workdir: ""
};

const structureReducer = (state = initialAppState, action) => {
  if (action.type === "GET_STRUCTURE") {
    return {
      ...state,
      structure: action.payload.structure
    };
  } else if (action.type === "PRINT_WORKING_DIRECTORY") {
    return {
      ...state,
      workdir: action.payload.workdir
    };
  } else {
    return {
      ...state
    };
  }
};

export default structureReducer;
