import { fetch as fetchPolyfill } from "whatwg-fetch";

export default class Common {
  constructor() {}

  static appName = "STORED_RESOURCES";

  static callFetch(params, pathto, uploaded) {
    return new Promise(resolve => {
      const requests = new FormData();
      requests.append("requests", JSON.stringify(params));
      if (uploaded && requests.append("uploaded", uploaded));
      fetchPolyfill(pathto, {
        method: "POST",
        body: requests
      }).then(response => {
        if (response.ok) {
          response.text().then(data => {
            resolve(data);
          });
        }
      });
    });
  }

  static rotate(param, params) {
    if ([...params.keys()][params.size - 1] === param) {
      return [...params][0];
    } else {
      let index = 0;
      for (const key of params.keys()) {
        if (key === param) {
          return [...params][++index];
        }
        index++;
      }
    }
  }

  static createKey() {
    let key = "",
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
  }

  static validateFileFormat(input) {
    const judgment =
      input !== "" &&
      input.length <= 40 &&
      input.match(/^[A-Za-z0-9_\-.()?!&\[\]]*$/)
        ? true
        : false;
    return judgment;
  }

  static rebuildPathForSpecifiedHierarchy(path, hierarchy) {
    const dirs = path.split("/");
    const dirlist = dirs.filter((dir, index) => {
      if (index < hierarchy) {
        return dir;
      }
    });
    return dirlist.join("/");
  }

  static getHierarchy(workdir) {
    return workdir !== "" ? workdir.split("/").length : 0;
  }
}
