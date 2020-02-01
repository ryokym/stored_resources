import React from "react";
import baseToast from "~/configureToast";
import { toast } from "react-toastify";

const RemoveFieldComponent = () => {
  toast.configure(baseToast);
  toast.error("mode remove");
  return <div id="remove_area">Click on the resource you want to delete</div>;
};

export default RemoveFieldComponent;
