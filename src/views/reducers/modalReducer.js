import ActionTypes from "~/utils/actionTypes";

const initialState = {
  modalMkdirIsOpen: false,
  modalVerifyIsOpen: false,
  modalRemoveIsOpen: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLICK_OPEN_MODAL_MKDIR:
      return {
        ...state,
        modalMkdirIsOpen: action.payload.modalIsOpen
      };
    case ActionTypes.CLICK_OPEN_MODAL_VERIFY:
      return {
        ...state,
        modalVerifyIsOpen: action.payload.modalIsOpen
      };
    case ActionTypes.CLICK_OPEN_MODAL_REMOVE:
      return {
        ...state,
        modalRemoveIsOpen: action.payload.modalIsOpen
      };
    case ActionTypes.CLICK_CLOSE_MODAL:
      return {
        ...initialState
      };
    default:
      return { ...state };
  }
};

export default modalReducer;
