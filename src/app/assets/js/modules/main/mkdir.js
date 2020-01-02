import $ from "jquery";
import common from "../common/common.js";
import { fetch as fetchPolyfill } from "whatwg-fetch";

/* makedir
-------------------------------------------------------*/

const $row = $(".row:last").clone();

export const close = function() {
  $(".createNewDirRow:visible").slideUp();
  common.setmode("change");
  $(this).hide();
};

export const open = function() {
  if (common.ismode("makedir")) {
    const textbox = $(".textbox:visible");
    main.setElementData(textbox, function(elm) {
      main.name = elm.val();
    });
    if (common.validateFiles(main.name)) {
      const createDirBtnArea = main.workdir.find(".row").first(),
        clone = $row.clone(),
        done = function() {
          const createNewDirRow = main.workdir.find(".createNewDirRow");
          clone.find(".row_item").text(main.name);
          main.workdir.append(clone);
          clone.show();
          textbox.val("");
          createDirBtnArea.find(".close").hide();
          createNewDirRow.slideUp();
          common.setmode("change");
        },
        dataSet = main.getElementData();

      const requests = new FormData();
      requests.append("requests", JSON.stringify(dataSet));
      fetchPolyfill(common.toAjax, {
        method: "POST",
        body: requests
      }).then(function(response) {
        if (response.ok) {
          done();
        }
      });
    } else {
      textbox.addClass("error");
    }
  } else if (!common.ismode("remove")) {
    main.setElementData($(this));
    const createNewDirRow = main.workdir.find(".createNewDirRow");
    $(this)
      .next(".close")
      .show();
    createNewDirRow.slideDown({
      start: function() {
        $(this).css({ display: "flex" });
        $(this)
          .find(".textbox")
          .focus();
      }
    });
    common.setmode("makedir");
  }
};
