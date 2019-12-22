import $ from "jquery";
import common from "../common/common.js";

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
      const dataSet = main.getElementData(),
        done = function() {
          edited.trigger("click");
        };
      common.postRequest(dataSet, done);
    }
    common.rotate(common.mode, ["change", "edit"], function(another) {
      common.setmode(another);
    });
  })();
}
