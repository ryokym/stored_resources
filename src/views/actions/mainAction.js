export const initiate = () => ({
  type: "INITIATE"
});

export const click_row = ({ ...props }) => ({
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

export const click_expand = () => ({
  type: "CLICK_EXPAND",
  payload: { behavior: "expand" }
});

export const click_remove = () => ({
  type: "CLICK_REMOVE",
  payload: { behavior: "remove" }
});

export const click_edit = () => ({
  type: "CLICK_EDIT",
  payload: { behavior: "edit" }
});

export const click_logout = () => ({
  type: "CLICK_LOGOUT",
  payload: { behavior: "logout" }
});
