const initialState = {
  mode: "enter",
  context: "sign_in",
  prev: "sign_up",
  prevHover: "sign_up_hover"
};

const modeReducer = (state = initialState, action) => {
  if (action.type === "CLICK_SIGNIN_OR_UP") {
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
      mode: action.payload.mode
    };
  } else {
    return {
      ...state
    };
  }
};

export default modeReducer;
