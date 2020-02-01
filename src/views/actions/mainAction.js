export const initiate = () => ({
  type: "INITIATE"
});

export const clickRow = ({ ...props }) => ({
  type: "CLICK_ROW",
  payload: props
});

export const getNewStructure = (behavior, structure) => ({
  type: "GET_NEW_STRUCTURE",
  payload: {
    behavior: behavior,
    structure: structure
  }
});

export const printWorkingDirectory = workdir => ({
  type: "PRINT_WORKING_DIRECTORY",
  payload: { workdir: workdir }
});

export const getFileContent = content => ({
  type: "GET_FILE_CONTENT",
  payload: {
    content: content,
    isview: true
  }
});

export const clickDirectoryResource = () => ({
  type: "CLICK_DIRECTORY_RESOURCE",
  payload: {
    content: "",
    isview: false
  }
});

export const requireMkdirForm = () => ({
  type: "REQUIRE_MKDIR_FORM",
  payload: { behavior: "mkdir" }
});

export const breakMkdirForm = () => ({
  type: "BREAK_MKDIR_FORM",
  payload: { behavior: "change", dirname: "" }
});

export const makeDirectory = ({ ...props }) => ({
  type: "MAKE_DIRECTORY",
  payload: props
});

export const inputDirectoryName = dirname => ({
  type: "INPUT_DIRECTORY_NAME",
  payload: { dirname: dirname }
});

export const continuousInputMkdirForm = () => ({
  type: "CONTINUOUS_INPUT_MKDIR_FORM",
  payload: { dirname: "" }
});

export const redrawStructure = structure => ({
  type: "REDRAW_STRUCTURE",
  payload: { structure: structure }
});

export const clickExpand = () => ({
  type: "CLICK_EXPAND",
  payload: { behavior: "expand" }
});

export const clickRemove = () => ({
  type: "CLICK_REMOVE"
});

export const clickRemoveNext = (hehavior, isremove) => ({
  type: "CLICK_REMOVE_NEXT",
  payload: {
    behavior: hehavior,
    isremove: isremove
  }
});

export const clickEdit = () => ({
  type: "CLICK_EDIT",
  payload: { behavior: "edit" }
});

export const clickLogout = () => ({
  type: "CLICK_LOGOUT",
  payload: { behavior: "logout" }
});
