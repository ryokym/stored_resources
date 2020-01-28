export const clickCloseModal = () => ({
  type: "CLICK_CLOSE_MODAL",
  payload: { modalIsOpen: false }
});

export const clickOpenModalVerify = () => ({
  type: "CLICK_OPEN_MODAL_VERIFY",
  payload: {
    modalIsOpen: true
  }
});

export const clickOpenModalMkdir = () => ({
  type: "CLICK_OPEN_MODAL_MKDIR",
  payload: { modalIsOpen: true }
});
