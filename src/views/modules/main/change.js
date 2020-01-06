import $ from "jquery";
import common from "../common/common.js";

/* change
-------------------------------------------------------*/

const $level = $(".level").clone();
$level.find(".row:has(.row_item)").remove();

export default function() {
  if (common.ismode("remove")) return false;
  common.clickDisable.call($(".row:has(.row_item)"), "start");
  main.setElementData($(this), function(elm) {
    main.name = elm.find(".row_item").text();
  });
  if (common.ismode("makedir")) {
    common.setmode("change");
    $(".close:visible").trigger("click");
  }
  main.workdir.find("." + common.mode).removeClass(common.mode);
  $(this).addClass(common.mode);

  const done = function(response) {
    const data = JSON.parse(response);
    if (data.isFile === false) {
      const $levelClone = $level.clone();
      const newDirname =
        main.level === main.rootdir
          ? main.name
          : main.dirname + "/" + main.name;
      main.isview = false;
      main.adjust();
      $levelClone.attr("data-level", ++main.level).attr("data-dir", newDirname);
      var elm = "";
      data.result.forEach(function(value) {
        elm += '<div class="row"><p class="row_item">' + value + "</p></div>";
      });
      $("#column").append($levelClone);
      $levelClone.show().append(elm);
      $(".prettyprint").empty();

      if (common.ismode("change")) $("#upload_area").show();
      if (common.ismode("remove"))
        common.rotateClass($levelClone.find(".open"), ["enable", "disable"]);
    } else {
      const $preview = $("#preview");
      main.isview = true;
      if (common.ismode("change")) $preview.show();
      $preview.empty();
      $("#upload_area").hide();
      $preview.append('<code class="prettyprint">' + data.result + "</code>");
      main.adjust();
      PR.prettyPrint();
    }
  };
  const dataSet = main.getElementData();
  const requests = new FormData();
  requests.append("requests", JSON.stringify(dataSet));
  common.postRequest(requests, done);
  common.clickDisable("end");
}
