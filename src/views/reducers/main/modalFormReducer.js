const initialState = {
  dirname: ""
};

const modalFormReducer = (state = initialState, action) => {
  if (action.type === "INPUT_DIRECTORY_NAME") {
    return {
      ...state,
      dirname: action.payload.dirname
    };
  } else if (action.type === "BREAK_MKDIR_FORM") {
    return {
      ...state,
      dirname: action.payload.dirname
    };
  } else {
    return {
      ...state
    };
  }
};

export default modalFormReducer;
