import $ from "jquery";
import common from "../common/common.js";
import { fetch as fetchPolyfill } from "whatwg-fetch";

/* keypress
-------------------------------------------------------*/

const key = {
  retn: 13,
  ctrl: 17,
  c: 67,
  i: 73,
  v: 86
};

document.onkeyup = function(e) {
  common.releaseKey();
};

common.document.on("keydown", "input:visible", function(e) {
  if (e.keyCode === key.retn) {
    main.workdir.find(".open").trigger("click");
  } else {
    if ($(this).hasClass("error")) $(this).removeClass("error");
  }
});

document.onkeydown = function(e) {
  common.keyStatus[e.keyCode] = true;

  if (common.ismode("change") && main.isview === true) {
    // Insert mode with short code i
    if (common.keyStatus[key.i] === true) {
      $("#edit").trigger("click");
    }
    // Clipping object with short code cmd + c
    else if (common.keyStatus[key.c] === true && e.metaKey === true) {
      main.movefrom = main.workdir.find(
        ".row_item:contains('" + main.name + "')"
      );
      common.rotateClass(main.movefrom.parent(".row"), ["change", "movefrom"]);
      main.cliped = main.dirname + "/" + main.name;
    }
  }
  // Pasting object ( move execute) with short code cmd + v
  else if (common.ismode("change") && main.isview === false) {
    if (common.keyStatus[key.v] === true && e.metaKey === true) {
      common.setmode("move");
      const moveto = main.workdir.find(".change");
      main.setElementData(
        moveto,
        function(elm) {
          main.name = elm.find(".row_item").text();
        },
        { cliped: main.cliped }

        // ここ
      );

      const done = function(response) {
        const add = $(
          '<div class="row"><p class="row_item">' + response + "</p></div>"
        );
        main.movefrom.parent(".row").remove();
        $(".level:last").append(add);
        main.movefrom = "";
        main.cliped = "";
      };
      const dataSet = main.getElementData();
      const requests = new FormData();
      requests.append("requests", JSON.stringify(dataSet));
      fetchPolyfill(common.toAjax, {
        method: "POST",
        body: requests
      }).then(function(response) {
        if (response.ok) {
          response.text().then(data => {
            done(data);
          });
        }
      });
      common.setmode("change");
    }
  }

  /**
   * Exit insert mode with short code ctrl + c
   */
  if (common.ismode("edit") && main.isview === false) {
    if (
      common.keyStatus[key.ctrl] === true &&
      common.keyStatus[key.c] === true
    ) {
      $("#edit").trigger("click");
    }
  }
};
