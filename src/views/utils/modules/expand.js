import "web-animations-js/web-animations-next.min.js";

export default function(props) {
  let [width, behavior, side, display] = props;

  return (() => {
    const collapse = (elm, distance, isHide = false, isBack = false) => {
      const width = distance ? distance : elm.offsetWidth;
      const to = isBack ? width : -width;
      elm.animate(
        [{ left: "0px" }, { left: to + "px" }],
        500
      ).onfinish = () => {
        const prop = isHide ? "none" : "flex";
        elm.style.display = prop;
      };
      if (!distance) {
        return width;
      }
    };

    if (behavior === "change" && width) {
      collapse(display, width, false, true);
      collapse(side, width, false, true);
    }

    if (behavior === "expand") {
      width = collapse(side, "", true);
      collapse(display, width);
      return width;
    }
  })();
}
