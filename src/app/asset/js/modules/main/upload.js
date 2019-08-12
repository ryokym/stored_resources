import $ from 'jquery';
import common from '../common/common.js';

/* upload
-------------------------------------------------------*/

const upload = {
    decorate : function() {
        document.getElementById("upload_drop_area").classList.add("uploadMouseOver")
    },

    undecorate : function() {
        document.getElementById("upload_drop_area").classList.remove("uploadMouseOver")
    },

    fileUpload : function(f) {
        const clone = $('.row:last').clone(),
              formData = new FormData(),
              toUploadDir = $('.level').eq(-1);

        main.dirname = toUploadDir.data('dir');
        formData.append('file', f);
        let requestData = main.getElementData();
        requestData = JSON.stringify(requestData);
        formData.append('requestData', requestData);
        formData.append('isUpload', true);
        const done = function(response) {
            if (common.validateFiles(response)) {
                clone.find('.row_item').text(response);
                clone.show();
                toUploadDir.append(clone);
            } else {
                alert(response);
            }
            upload.undecorate()
            common.setmode('change');
        }
        common.postRequest(formData, done, true);
    },
}

export const dragover = function(e) {
    e.stopPropagation();
    e.preventDefault();
    upload.decorate()
}

export const dragleave = function(e) {
    e.stopPropagation();
    e.preventDefault();
    upload.undecorate()
}

export const drop = function(e) {
    if (common.ismode('change')) {
        common.setmode('upload');
        e.preventDefault();
        upload.undecorate()
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            upload.fileUpload(files[i]);
        }
    }
}
