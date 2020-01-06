import React from "react";
import ReactDOM from "react-dom";
import common from "./modules/common/common.js";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "",
      context: "",
      prev: "sign_up",
      prevHover: "sign_up_hover",
      username: "",
      password: "",
      bucket: "",
      bucketkey: "",
      bucketval: ""
    };
    this.modes = ["enter", "create"];
    this.forward = "/";
    this.execpath = common.basepath + "/account.php";
    this.done = response => {
      let isFinish = false;
      if (typeof this[response] == "function") {
        isFinish = true;
        this[response](isFinish);
      } else {
        alert(response);
      }
    };
  }
  componentDidMount() {
    this.enter();
  }

  enter(isfinish) {
    if (isfinish) {
      location.href = this.forward;
    } else {
      this.setState(() => {
        return { mode: "enter", context: "sign_in" };
      });
    }
  }

  create() {
    this.setState(() => {
      return { mode: "create", context: "sign_up" };
    });
  }

  verify(isfinish) {
    if (isfinish) {
    }
  }

  toggleMode() {
    const prev = this.state.context;
    common.rotate(this.state.mode, this.modes, action => {
      this.setState({
        prev: prev,
        prevHover: prev + "_hover"
      });
      this[action]();
    });
  }

  inputId(e) {
    this.setState({ username: e.target.value });
  }

  inputPass(e) {
    this.setState({ password: e.target.value });
  }

  postRequest() {
    const params = {
      actionType: "enter",
      username: this.state.username,
      password: this.state.password
    };
    common.postRequest(params, this.execpath, this.done);
  }

  render() {
    return (
      <React.Fragment>
        <div className="menu">
          <div className="menu_wrapper">
            <span>Do You Chenge To Mode ? </span>
            <div
              id="switcher"
              className={this.state.prevHover + " switch_txt"}
              onClick={this.toggleMode.bind(this)}
            >
              {this.state.prev.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="container">
          <form name="form">
            <div className="wrapper">
              <div className="title">
                <h1>{common.appName}</h1>
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
                  className={this.state.context}
                  type="text"
                  value={this.state.context.toUpperCase()}
                  readonly
                  onClick={this.postRequest.bind(this)}
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
