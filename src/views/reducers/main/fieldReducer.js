const initialState = {
  content: "",
  isview: false,
  isremove: false
};

const fieldReducer = (state = initialState, action) => {
  if (action.type === "GET_FILE_CONTENT") {
    return {
      ...state,
      content: action.payload.content,
      isview: action.payload.isview
    };
  } else if (action.type === "CLICK_DIRECTORY_RESOURCE") {
    return {
      ...state,
      content: action.payload.content,
      isview: action.payload.isview
    };
  } else {
    return {
      ...state
    };
  }
};

export default fieldReducer;
