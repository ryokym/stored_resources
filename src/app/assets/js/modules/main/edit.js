import $ from "jquery";
import common from "../common/common.js";
import { fetch as fetchPolyfill } from "whatwg-fetch";

/* edit
-------------------------------------------------------*/

export default function() {
  return (function() {
    if (main.isview === true) {
      main.isview = false;
      const text = $("#preview")
          .find("span")
          .text(),
        code = $("code"),
        replace = $('<code contenteditable="true"></code>');
      $.when(code.replaceWith(replace)).done(function() {
        replace.text(text).css(main.codeStyle);
      });
    } else {
      main.isview = true;
      let edited = $(".level:last").find(".change > .row_item"),
        content = $("code").text();
      main.setElementData(
        edited,
        function(elm) {
          main.name = elm.text();
        },
        { content: content }
      );
      const done = function() {
        edited.trigger("click");
      };
      const dataSet = main.getElementData();
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
    }
    common.rotate(common.mode, ["change", "edit"], function(another) {
      common.setmode(another);
    });
  })();
}
