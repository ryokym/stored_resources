const initialState = {
  modalMkdirIsOpen: false,
  modalVerifyIsOpen: false,
  modalRemoveIsOpen: false
};

const modalReducer = (state = initialState, action) => {
  if (action.type === "CLICK_OPEN_MODAL_MKDIR") {
    return {
      ...state,
      modalMkdirIsOpen: action.payload.modalIsOpen
    };
  } else if (action.type === "CLICK_OPEN_MODAL_VERIFY") {
    return {
      ...state,
      modalVerifyIsOpen: action.payload.modalIsOpen
    };
  } else if (action.type === "CLICK_OPEN_MODAL_REMOVE") {
    return {
      ...state,
      modalRemoveIsOpen: action.payload.modalIsOpen
    };
  } else if (action.type === "CLICK_CLOSE_MODAL") {
    return {
      ...initialState
    };
  } else {
    return {
      ...state
    };
  }
};

export default modalReducer;
