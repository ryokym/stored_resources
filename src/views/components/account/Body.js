import React from "react";
import Form from "./Form";

// const renderFormOrModal = props => {
//   const { modeState, formState, actions } = props;
//   return modeState.mode === "verify" ? (
//     <VerifyModal formState={formState} actions={actions} />
//   ) : (
//     <Form modeState={modeState} formState={formState} actions={actions} />
//   );
// };

const BodyComponent = props => {
  return (
    <div className="container">
      <form name="form">
        <Form {...props}></Form>
      </form>
    </div>
  );
};

export default BodyComponent;
