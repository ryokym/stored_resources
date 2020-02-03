import ActionTypes from "~/utils/actionTypes";
import baseToast from "~/configureToast";
import { toast } from "react-toastify";
toast.configure(baseToast);

export const initiate = () => ({
  type: ActionTypes.INITIATE
});

export const clickRow = ({ ...props }) => ({
  type: ActionTypes.CLICK_ROW,
  payload: props
});

export const getNewStructure = (behavior, structure) => ({
  type: ActionTypes.GET_NEW_STRUCTURE,
  payload: {
    behavior: behavior,
    structure: structure
  }
});

export const printWorkingDirectory = workdir => ({
  type: ActionTypes.PRINT_WORKING_DIRECTORY,
  payload: { workdir: workdir }
});

export const getFileContent = content => ({
  type: ActionTypes.GET_FILE_CONTENT,
  payload: {
    content: content,
    isview: true
  }
});

export const clickDirectoryResource = () => ({
  type: ActionTypes.CLICK_DIRECTORY_RESOURCE,
  payload: {
    content: "",
    isview: false
  }
});

export const requireMkdirForm = () => ({
  type: ActionTypes.REQUIRE_MKDIR_FORM,
  payload: { behavior: "mkdir" }
});

export const breakMkdirForm = () => ({
  type: ActionTypes.BREAK_MKDIR_FORM,
  payload: { behavior: "change", dirname: "" }
});

export const makeDirectory = ({ ...props }) => {
  toast.info("Make Directory Succeeded!");
  return {
    type: ActionTypes.MAKE_DIRECTORY,
    payload: props
  };
};

export const inputDirectoryName = dirname => ({
  type: ActionTypes.INPUT_DIRECTORY_NAME,
  payload: { dirname: dirname }
});

export const continuousInputMkdirForm = () => ({
  type: ActionTypes.CONTINUOUS_INPUT_MKDIR_FORM,
  payload: { dirname: "" }
});

export const redrawStructure = structure => ({
  type: ActionTypes.REDRAW_STRUCTURE,
  payload: { structure: structure }
});

export const clickExpand = () => ({
  type: ActionTypes.CLICK_EXPAND,
  payload: { behavior: "expand" }
});

export const clickRemove = () => ({
  type: ActionTypes.CLICK_REMOVE
});

export const clickRemoveNext = (hehavior, isremove) => ({
  type: ActionTypes.CLICK_REMOVE_NEXT,
  payload: {
    behavior: hehavior,
    isremove: isremove
  }
});

export const requireRemoveModal = (name, path) => ({
  type: ActionTypes.REQUIRE_REMOVE_MODAL,
  payload: {
    name: name,
    path: path
  }
});

export const removeResource = ({ ...props }) => ({
  type: ActionTypes.REMOVE_RESOURCE,
  payload: props
});

export const didRemoveResource = () => {
  toast.success("remove success!");
  return {
    type: ActionTypes.DID_REMOVE_RESOURCE,
    payload: {
      name: "",
      path: ""
    }
  };
};

export const breakWorkingResource = () => ({
  type: ActionTypes.BREAK_WORKING_RESOURCE
});

export const clickEdit = () => ({
  type: ActionTypes.CLICK_EDIT,
  payload: { behavior: "edit" }
});

export const clickLogout = () => ({
  type: ActionTypes.CLICK_LOGOUT,
  payload: { behavior: "logout" }
});
