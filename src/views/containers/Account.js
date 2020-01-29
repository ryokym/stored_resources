import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { accountActions } from "../actions";
import common from "../utils/common";
import Body from "../components/account/Body";
import Menu from "../components/account/Menu";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.getInvertedContext = this.getInvertedContext.bind(this);
    this.mapedContexts = new Map([
      ["enter", "sign_in"],
      ["create", "sign_up"]
    ]);
  }

  getInvertedContext(behavior) {
    if (behavior === "verify") return { ...this.accountProps };
    const [anotherBehavior, anotherContext] = common.rotate(
      behavior,
      this.mapedContexts
    );
    return {
      anotherBehavior: anotherBehavior,
      anotherContext: anotherContext,
      context: this.mapedContexts.get(behavior),
      contextHover: `${anotherContext}_hover`
    };
  }

  render() {
    const { behaviorState, actions } = this.props;
    const { ...accountProps } = this.getInvertedContext(behaviorState.behavior);
    this.accountProps = { ...accountProps };
    return (
      <>
        <Menu
          {...accountProps}
          behaviorState={behaviorState}
          actions={actions}
        />
        <Body {...this.props} {...accountProps}>
          {this.props.children}
        </Body>
      </>
    );
  }
}

const mapState = (state, ownProps) => ({
  modalState: state.modalReducer,
  formState: state.formReducer,
  behaviorState: state.behaviorReducer
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(accountActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Account);
