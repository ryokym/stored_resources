import ActionTypes from "~/utils/actionTypes";

export const clickCloseModal = () => ({
  type: ActionTypes.CLICK_CLOSE_MODAL,
  payload: { modalIsOpen: false }
});

export const clickOpenModalVerify = () => ({
  type: ActionTypes.CLICK_OPEN_MODAL_VERIFY,
  payload: { modalIsOpen: true }
});

export const clickOpenModalMkdir = () => ({
  type: ActionTypes.CLICK_OPEN_MODAL_MKDIR,
  payload: { modalIsOpen: true }
});

export const clickOpenModalRemove = () => ({
  type: ActionTypes.CLICK_OPEN_MODAL_REMOVE,
  payload: { modalIsOpen: true }
});
