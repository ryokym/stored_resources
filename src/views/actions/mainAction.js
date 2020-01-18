export const initiate = () => ({
  type: "INITIATE"
});

export const getResources = (behavior, resources) => ({
  type: "GET_RESOURCES",
  payload: {
    behavior: behavior,
    resources: resources
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
