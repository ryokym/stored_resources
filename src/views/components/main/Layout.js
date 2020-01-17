import React from "react";

const LayoutComponent = ({ ...props }) => {
  return (
    <body>
      <div class="wrapper">{props.children}</div>
    </body>
  );
};

export default LayoutComponent;
