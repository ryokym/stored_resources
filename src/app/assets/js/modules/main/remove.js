import $ from "jquery";
require("jui/widgets/draggable.js");
require("jui/widgets/droppable.js");
import common from "../common/common.js";
import { fetch as fetchPolyfill } from "whatwg-fetch";

/* remove
-------------------------------------------------------*/

export default function() {
  const remove = {
    decorate: function() {
      document.getElementById("remove_area").classList.add("removeMouseOver");
    },

    undecorate: function() {
      document
        .getElementById("remove_area")
        .classList.remove("removeMouseOver");
    },

    droped: function(e, data) {
      main.setElementData(data.draggable);
      main.name = data.draggable[0].innerText;
      remove.undecorate();
      if (
        confirm(main.dirname + "/" + main.name + "を削除しますか?") === false
      ) {
        return false;
      } else {
        data.draggable.parent().remove();
        const done = function() {
            main.adjust();
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
      }
    }
  };

  return (function() {
    const open = $(".open"),
      row = $(".row"),
      rowItem = $(".row_item");

    common.rotate(common.mode, ["change", "remove"], function(another) {
      common.setmode(another);
    });
    common.rotateClass($(".change, .remove"), ["change", "remove"]);
    common.rotateClass(open, ["enable", "disable"]);
    $(".close:visible").trigger("click");

    if (common.ismode("remove")) {
      $("#preview , #upload_area").hide();
      $("#remove_area").css({ display: "flex" });
      common.addDraggable.call(rowItem);
    } else {
      $("#remove_area").hide();
      if (main.isview) $("#preview").show();
      else $("#upload_area").show();
      $(".row_item").draggable({ disabled: true });
    }

    $("#remove_drop_area").droppable({
      accept: ".row_item",
      over: remove.decorate(),
      out: remove.undecorate(),
      drop: function(e, data) {
        remove.droped(e, data);
      }
    });
  })();
}
