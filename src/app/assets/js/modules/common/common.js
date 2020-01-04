import $ from "jquery";
import { fetch as fetchPolyfill } from "whatwg-fetch";

/**
 * common js
 */

("use strict");

/* object literal
-------------------------------------------------------*/
window.common = {};

export default common = {
  mode: "",
  toAjax: "",
  basePath: "/app/content/",
  document: $(document),
  keyStatus: {},

  getmode: function() {
    return this.mode;
  },

  setmode: function(mode) {
    this.mode = mode;
  },

  ismode: function(mode) {
    if (this.mode === mode) return true;
    else return false;
  },

  getFormElmsValue: function(names) {
    if (names instanceof Array) {
      var values = {};
      names.forEach(function(name) {
        values[name] = document.form.elements[name].value;
      });
      return values;
    }
  },

  rotate: function(param, params, exec) {
    if (params instanceof Array) {
      const count = params.length;
      if (params[count - 1] === param) {
        exec(params[0]);
      } else {
        for (var i = 0; i < count; i++) {
          if (param === params[i]) {
            exec(params[++i]);
            break;
          }
        }
      }
    }
  },

  swapValue: function(fname, store, params) {
    var $this = this;
    store = $this[fname]();
    params.forEach(function(value) {
      if (value != store) {
        $this[fname](value);
      }
    });
  },

  addDraggable: function() {
    this.draggable({
      disabled: false,
      revert: true,
      revertDuration: 200
    });
  },

  postRequest: function(params, callback) {
    fetchPolyfill(common.toAjax, {
      method: "POST",
      body: params
    }).then(function(response) {
      if (response.ok && callback != undefined) {
        response.text().then(data => {
          callback(data);
        });
      }
    });
  },

  validateFiles: function(input) {
    if (
      input !== "" &&
      input.length <= 40 &&
      input.match(/^[A-Za-z0-9_\-.()?!&\[\]]*$/)
    ) {
      return true;
    } else {
      return false;
    }
  },

  rotateClass: function(elm, classes) {
    if (classes instanceof Array) {
      const count = classes.length;
      if (elm.hasClass(classes[count - 1])) {
        elm.removeClass(classes[count - 1]);
        elm.addClass(classes[0]);
      } else {
        for (var i = 0; i < count; i++) {
          if (elm.hasClass(classes[i])) {
            elm.removeClass(classes[i]);
            elm.addClass(classes[++i]);
            break;
          }
        }
      }
    }
  },

  ukey: function() {
    var key = "",
      i,
      random;
    for (i = 0; i < 32; i++) {
      random = (Math.random() * 16) | 0;
      if (i == 8 || i == 12 || i == 16 || i == 20) {
        key += "-";
      }
      key += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
    }
    return key;
  },

  saved: $(),
  clickDisable: function(status) {
    if (status === "start") {
      common.saved = this;
      this.css("pointer-events", "none");
    } else if (status === "end") {
      common.saved.css("pointer-events", "auto");
    }
  },

  releaseKey: function() {
    for (var keycode in common.keyStatus) {
      common.keyStatus[keycode] = false;
    }
  }
};
