const initialState = {
  dirname: ""
};

const modalFormReducer = (state = initialState, action) => {
  if (action.type === "INPUT_DIRECTORY_NAME") {
    return {
      ...state,
      dirname: action.payload.dirname
    };
  } else if (action.type === "BREAK_FORM_ENTERED") {
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
