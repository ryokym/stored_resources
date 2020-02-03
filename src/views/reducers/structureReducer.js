import ActionTypes from "~/utils/actionTypes";

const initialState = {
  structure: new Map(),
  workdir: ""
};

const structureReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_NEW_STRUCTURE:
      return {
        ...state,
        structure: action.payload.structure
      };
    case ActionTypes.PRINT_WORKING_DIRECTORY:
      return {
        ...state,
        workdir: action.payload.workdir
      };
    case ActionTypes.REDRAW_STRUCTURE:
      return {
        ...state,
        structure: action.payload.structure
      };
    default:
      return { ...state };
  }
};

export default structureReducer;
