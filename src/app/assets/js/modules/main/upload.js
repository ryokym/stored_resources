import $ from "jquery";
import common from "../common/common.js";

/* upload
-------------------------------------------------------*/

const upload = {
  decorate: function() {
    document
      .getElementById("upload_drop_area")
      .classList.add("uploadMouseOver");
  },

  undecorate: function() {
    document
      .getElementById("upload_drop_area")
      .classList.remove("uploadMouseOver");
  },

  fileUpload: function(f) {
    const clone = $(".row:last").clone();
    const requests = new FormData();
    const toUploadDir = $(".level").eq(-1);
    main.dirname = toUploadDir.data("dir");
    const dataSet = main.getElementData();

    requests.append("requests", JSON.stringify(dataSet));
    requests.append("uploaded", f);
    const done = function(response) {
      if (common.validateFiles(response)) {
        clone.find(".row_item").text(response);
        clone.show();
        toUploadDir.append(clone);
      } else {
        alert(response);
      }
      upload.undecorate();
      common.setmode("change");
    };
    common.postRequest(requests, done);
  }
};

export const dragover = function(e) {
  e.stopPropagation();
  e.preventDefault();
  upload.decorate();
};

export const dragleave = function(e) {
  e.stopPropagation();
  e.preventDefault();
  upload.undecorate();
};

export const drop = function(e) {
  if (common.ismode("change")) {
    common.setmode("upload");
    e.preventDefault();
    upload.undecorate();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      upload.fileUpload(files[i]);
    }
  }
};
