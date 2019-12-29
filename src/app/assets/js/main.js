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
  setElementData: function(obj, callback, add) {
    this.workdir = obj.parents(".level");
    this.dirname = this.workdir.data("dir");
    this.level = parseInt(this.workdir.data("level"));
    if (add) this.add = add;
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
    if (this.add) {
      response.requestData.add = this.add;
    }
    return response;
  },

  adjust: function() {
    $(".level").each(function() {
      let anyLevel = parseInt($(this).data("level"));
      if (anyLevel > main.level) $(this).remove();
    });
  },

  logout: function() {
    common.setmode("logout");
    const done = function() {
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
for (let member of Object.keys(upload)) {
  document
    .querySelector("#upload_drop_area")
    .addEventListener(upload[member].name, upload[member]);
}
