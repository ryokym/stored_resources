const initialAppState = {
  mode: "enter",
  context: "sign_in",
  prev: "sign_up",
  prevHover: "sign_up_hover"
};

const modeReducer = (state = initialAppState, action) => {
  if (action.type === "TOGGLE_MODE") {
    return {
      ...state,
      mode: action.payload.mode,
      context: action.payload.context,
      prev: action.payload.prev,
      prevHover: action.payload.prevHover
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      mode: action.payload.mode
    };
  } else if (action.type === "OPEN_MODAL") {
    return {
      ...state,
      mode: action.payload.mode,
      bucketkey: action.payload.bucketkey
    };
  } else {
    return {
      ...state
    };
  }
};

export default modeReducer;
