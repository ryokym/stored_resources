export const initiate = () => ({
  type: "INITIATE"
});

export const clickRow = ({ ...props }) => ({
  type: "CLICK_ROW",
  payload: props
});

export const getStructure = (behavior, structure) => ({
  type: "GET_STRUCTURE",
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

export const clickExpand = () => ({
  type: "CLICK_EXPAND",
  payload: { behavior: "expand" }
});

export const clickRemove = () => ({
  type: "CLICK_REMOVE",
  payload: { behavior: "remove" }
});

export const clickEdit = () => ({
  type: "CLICK_EDIT",
  payload: { behavior: "edit" }
});

export const clickLogout = () => ({
  type: "CLICK_LOGOUT",
  payload: { behavior: "logout" }
});
