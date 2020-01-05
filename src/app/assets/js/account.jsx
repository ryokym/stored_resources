import React from "react";
import ReactDOM from "react-dom";
import { fetch as fetchPolyfill } from "whatwg-fetch";

const done = function(response) {
  if (response === "enter") {
    location.href = Account.forward;
  } else {
    alert(response);
  }
};

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: "SIGN UP" };
    this.forward = "/";
    this.requestTo = "/app/content/login/execute.php";
  }

  toggleMode() {
    this.setState(() => {
      if (this.state.mode === "SIGN UP") {
        return { mode: "SIGN IN" };
      } else {
        return { mode: "SIGN UP" };
      }
    });
  }

  inputId(e) {
    this.setState({ username: e.target.value });
  }

  inputPass(e) {
    this.setState({ password: e.target.value });
  }

  showvalue() {
    alert(this.state.username);
  }

  postrequest() {
    const dataSet = {
      actionType: "enter",
      username: this.state.username,
      password: this.state.password
    };
    const requests = new FormData();
    requests.append("requests", JSON.stringify(dataSet));
    fetchPolyfill(this.requestTo, {
      method: "POST",
      body: requests
    }).then(function(response) {
      if (response.ok) {
        response.text().then(data => {
          done(data);
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="menu">
          <div className="menu_wrapper">
            <span>Do You Chenge To Mode ? </span>
            <div
              id="switcher"
              className="sign_up_txt switch_txt"
              onClick={this.toggleMode.bind(this)}
            >
              {this.state.mode}
            </div>
          </div>
        </div>
        <div className="container">
          <form name="form">
            <div className="wrapper">
              <div className="title">
                <h1>{this.state.mode}</h1>
              </div>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="yourname?"
                  onChange={this.inputId.bind(this)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password?"
                  onChange={this.inputPass.bind(this)}
                />
              </div>
              <div id="send">
                <input
                  className="sign_in_bk btn_color"
                  type="text"
                  value="Enter"
                  readonly
                  onClick={this.postrequest.bind(this)}
                />
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const app = document.getElementById("app");
ReactDOM.render(<Account />, app);
