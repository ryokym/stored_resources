import * as modalAction from "./modalAction";
import * as accountAction from "./accountAction";
import * as mainAction from "./mainAction";

export const accountActions = {
  ...modalAction,
  ...accountAction
};

export const mainActions = {
  ...modalAction,
  ...mainAction
};
