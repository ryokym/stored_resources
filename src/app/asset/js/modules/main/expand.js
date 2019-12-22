import $ from "jquery";
import common from "../common/common.js";

/* expand
-------------------------------------------------------*/

export default function() {
  const expand = {
    stateWidth: 0,
    leftgap: 42
  };

  return (function() {
    const $column = $("#column"),
      $display = $("#display");

    if (main.isview && !common.ismode("remove")) {
      common.rotate(common.mode, ["expand", "change"], function(nextmode) {
        common.setmode(nextmode);
      });
      if (common.ismode("change")) {
        $column.show();
        $display.css({
          "margin-left": 0,
          right: expand.stateWidth - expand.leftgap
        });
        $display.animate({ right: 0 });
        $column.animate({ right: 0 });
      }
      if (common.ismode("expand")) {
        expand.stateWidth = $column.outerWidth();
        var maxWidth = $(".container").innerWidth();
        $column.animate({
          right: expand.stateWidth
        });
        $display.animate(
          { right: expand.stateWidth - expand.leftgap },
          {
            complete: function() {
              $display.css({
                "margin-left": expand.leftgap,
                right: 0
              });
              $column.hide();
            }
          }
        );
      }
    }
  })();
}
