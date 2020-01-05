import $ from "jquery";
require("jui/widgets/draggable.js");
require("jui/widgets/droppable.js");
import common from "./modules/common/common.js";
import change from "./modules/main/change.js";
import remove from "./modules/main/remove.js";
import expand from "./modules/main/expand.js";
import * as mkdir from "./modules/main/mkdir.js";
import * as upload from "./modules/main/upload.js";
import edit from "./modules/main/edit.js";
import keypress from "./modules/main/keypress.js";

/* main
-------------------------------------------------------*/

window.main = {};
main = {
  isview: false,
  rootdir: 1,
  toAjax: "main/execute.php",
  codeStyle: { "line-height": "2.6vh", "font-family": "ricty" },
  setElementData: function(obj, callback, opt) {
    this.workdir = obj.parents(".level");
    this.dirname = this.workdir.data("dir");
    this.level = parseInt(this.workdir.data("level"));
    if (opt) this.opt = opt;
    if (callback) callback(obj);
  },

  getElementData: function() {
    let response = {
      requestData: {
        name: this.name,
        dirname: this.dirname,
        level: this.level,
        actionType: common.mode
      }
    };
    if (this.opt) {
      const key = Object.keys(this.opt)[0];
      response.requestData[key] = this.opt[key];
    }
    return response;
  },

  adjust: function() {
    const elms = document.querySelectorAll(".level");
    elms.forEach(elm => {
      let level = parseInt(elm.getAttribute("data-level"));
      if (level > main.level) {
        elm.remove();
      }
    });
  },

  logout: function() {
    common.setmode("logout");
    const done = () => {
        location.href = "/index.php?logout";
      },
      dataSet = main.getElementData();
    common.postRequest(dataSet, done);
  }
};

/* Initialize
-------------------------------------------------------*/

common.mode = "change";
common.toAjax = common.basePath + main.toAjax;

/* Binding Events
-------------------------------------------------------*/

common.document.on("click", ".row:has(.row_item)", change);
common.document.on("click", ".close", mkdir.close);
common.document.on("click", ".open, .enable", mkdir.open);
document.querySelector("#remove").addEventListener("click", remove);
document.querySelector("#expand").addEventListener("click", expand);
document.querySelector("#edit").addEventListener("click", edit);
document.querySelector("#logout").addEventListener("click", main.logout);

let elm = document.getElementById("upload_drop_area");
elm.addEventListener("dragover", upload.dragover);
elm.addEventListener("dragleave", upload.dragleave);
elm.addEventListener("drop", upload.drop);
