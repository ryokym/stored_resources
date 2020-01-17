import React from "react";
import Form from "./Form";
import Modal from "./Modal";

const renderFormOrModal = props => {
  const { modeState, formState, actions } = props;
  return modeState.mode === "verify" ? (
    <Modal formState={formState} actions={actions} />
  ) : (
    <Form modeState={modeState} formState={formState} actions={actions} />
  );
};

const BodyComponent = props => {
  return (
    <div className="container">
      <form name="form">{renderFormOrModal(props)}</form>
    </div>
  );
};

export default BodyComponent;
