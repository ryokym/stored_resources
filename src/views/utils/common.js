import { fetch as fetchPolyfill } from "whatwg-fetch";

export default class Common {
  constructor() {}

  static appName = "STORED_RESOURCES";

  static callFetch(params, pathto) {
    return new Promise(resolve => {
      const requests = new FormData();
      requests.append("requests", JSON.stringify(params));
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
}
