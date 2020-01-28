import React from "react";
import Form from "./Form";

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
