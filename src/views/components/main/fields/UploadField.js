import React from "react";
import Dropzone from "react-dropzone";

const UploadFieldComponent = ({ actions }) => {
  return (
    <div id="upload_area">
      <Dropzone
        onDrop={resource => actions.dropedResource({ resource: resource })}
      >
        {({ getRootProps }) => (
          <img
            id="upload_drop_area"
            src="/assets/img/dragDrop.svg"
            {...getRootProps()}
          />
        )}
      </Dropzone>
    </div>
  );
};

export default UploadFieldComponent;
