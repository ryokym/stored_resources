const initialState = {
  modalMkdirIsOpen: false,
  modalVerifyIsOpen: false
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
  } else if (action.type === "CLICK_CLOSE_MODAL") {
    return {
      ...state,
      modalMkdirIsOpen: action.payload.modalIsOpen,
      modalVerifyIsOpen: action.payload.modalIsOpen
    };
  } else {
    return {
      ...state
    };
  }
};

export default modalReducer;
