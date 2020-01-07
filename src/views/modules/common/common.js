import { fetch as fetchPolyfill } from "whatwg-fetch";

/**
 * common js
 */

export default class Common {
  constructor() {}

  static appName = "STORED_RESOURCES";

  static postRequest(params, to, callback) {
    const requests = new FormData();
    requests.append("requests", JSON.stringify(params));
    fetchPolyfill(to, {
      method: "POST",
      body: requests
    }).then(function(response) {
      if (response.ok && callback != undefined) {
        response.text().then(data => {
          callback(data);
        });
      }
    });
  }

  static rotate(param, params, exec) {
    if (params instanceof Array) {
      const count = params.length;
      if (params[count - 1] === param) {
        exec(params[0]);
      } else {
        for (var i = 0; i < count; i++) {
          if (param === params[i]) {
            exec(params[++i]);
            break;
          }
        }
      }
    }
  }
}
