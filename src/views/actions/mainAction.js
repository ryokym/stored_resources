import ActionTypes from "~/utils/actionTypes";
import { baseToast, toastMsg } from "~/configureToast";
import { toast } from "react-toastify";
toast.configure(baseToast);

export const initiate = () => ({
  type: ActionTypes.INITIATE
});

export const clickRow = ({ ...props }) => ({
  type: ActionTypes.CLICK_ROW,
  payload: props
});

export const getNewStructure = ({ ...props }) => ({
  type: ActionTypes.GET_NEW_STRUCTURE,
  payload: props
});

export const printWorkingDirectory = ({ ...props }) => ({
  type: ActionTypes.PRINT_WORKING_DIRECTORY,
  payload: props
});

export const getFileContent = ({ ...props }) => ({
  type: ActionTypes.GET_FILE_CONTENT,
  payload: props
});

export const clickDirectoryResource = ({ ...props }) => ({
  type: ActionTypes.CLICK_DIRECTORY_RESOURCE,
  payload: props
});

export const requireMkdirForm = ({ ...props }) => ({
  type: ActionTypes.REQUIRE_MKDIR_FORM,
  payload: props
});

export const breakMkdirForm = ({ ...props }) => ({
  type: ActionTypes.BREAK_MKDIR_FORM,
  payload: props
});

export const makeDirectory = ({ ...props }) => {
  toast.info(toastMsg.makeDirectory);
  return {
    type: ActionTypes.MAKE_DIRECTORY,
    payload: props
  };
};

export const inputDirectoryName = ({ ...props }) => ({
  type: ActionTypes.INPUT_DIRECTORY_NAME,
  payload: props
});

export const continuousInputMkdirForm = ({ ...props }) => ({
  type: ActionTypes.CONTINUOUS_INPUT_MKDIR_FORM,
  payload: props
});

export const redrawStructure = ({ ...props }) => ({
  type: ActionTypes.REDRAW_STRUCTURE,
  payload: props
});

export const clickRemove = () => ({
  type: ActionTypes.CLICK_REMOVE
});

export const clickRemoveNext = ({ ...props }) => ({
  type: ActionTypes.CLICK_REMOVE_NEXT,
  payload: props
});

export const requireRemoveModal = ({ ...props }) => ({
  type: ActionTypes.REQUIRE_REMOVE_MODAL,
  payload: props
});

export const removeResource = ({ ...props }) => ({
  type: ActionTypes.REMOVE_RESOURCE,
  payload: props
});

export const didRemoveResource = ({ ...props }) => {
  toast.success(toastMsg.didRemoveResource);
  return {
    type: ActionTypes.DID_REMOVE_RESOURCE,
    payload: props
  };
};

export const breakWorkingResource = () => ({
  type: ActionTypes.BREAK_WORKING_RESOURCE
});

export const clickExpand = () => ({
  type: ActionTypes.CLICK_EXPAND,
  payload: { behavior: "expand" }
});

export const clickEdit = () => ({
  type: ActionTypes.CLICK_EDIT,
  payload: { behavior: "edit" }
});

export const clickLogout = () => ({
  type: ActionTypes.CLICK_LOGOUT,
  payload: { behavior: "logout" }
});
