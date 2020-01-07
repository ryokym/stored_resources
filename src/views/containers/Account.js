import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import common from "../utils/common";

class Account extends React.Component {
  render() {
    const { account, actions } = this.props;
    // console.log(this.props);
    return (
      <React.Fragment>
        <div className="menu">
          <div className="menu_wrapper">
            <span>Do You Chenge To Mode ? </span>
            <div
              id="switcher"
              className={account.prevHover + " switch_txt"}
              onClick={() => actions.toggleMode()}
            >
              {account.prev.toUpperCase()}
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
                  // onChange={() => actions.inputId()}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password?"
                  // onChange={() => actions.inputPass()}
                />
              </div>
              <div id="send">
                <input
                  className={account.context}
                  type="text"
                  value={account.context.toUpperCase()}
                  readonly
                  // onClick={() => actions.postRequest()}
                />
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state, ownProps) => ({
  account: state.account
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Account);
