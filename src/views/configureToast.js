import { css } from "glamor";

/**
 * for more information : https://github.com/fkhadra/react-toastify#Api
 */

export const baseToast = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  pauseOnHover: false,
  pauseOnFocusLoss: true,
  rtl: false,
  closeOnClick: true,
  newestOnTop: true,
  className: css({
    opacity: 0.8
  }),
  bodyClassName: css({
    textAlign: "center",
    fontFamily: "Myriad, monospace, Tahoma, Sans-Serif",
    fontSize: "19px",
    fontStyle: "italic"
  }),
  draggable: false
};

export const toastMsg = {
  makeDirectory: "Make Directory Succeeded!",
  didRemoveResource: "Remove Resource Succeeded!",
  clickRemove: "mode remove",
  dropResource: "Upload File Succeeded!"
};
