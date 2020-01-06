import common from "../common/common.js";
import "web-animations-js/web-animations-next.min.js";

/* expand
-------------------------------------------------------*/
const state = {
  width: 0
};

export default function() {
  return (function() {
    const column = document.getElementById("column");
    const display = document.getElementById("display");

    const collapse = function(distance, isHide = false, isBack = false) {
      const elm = this;
      const width = distance ? distance : elm.offsetWidth;
      const to = isBack ? width : -width;
      this.animate(
        [{ left: "0px" }, { left: to + "px" }],
        500
      ).onfinish = function() {
        const prop = isHide ? "none" : "flex";
        elm.style.display = prop;
      };
      if (!distance) {
        return width;
      }
    };

    if (main.isview && !common.ismode("remove")) {
      common.rotate(common.mode, ["expand", "change"], function(nextmode) {
        common.setmode(nextmode);
      });
      if (common.ismode("change")) {
        collapse.call(display, state.width, false, true);
        collapse.call(column, state.width, false, true);
      }

      if (common.ismode("expand")) {
        state.width = collapse.call(column, "", true);
        collapse.call(display, state.width);
      }
    }
  })();
}
