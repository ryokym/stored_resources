"use strict";
window.common = {}
common = {
    userName       :    '',
    password       :    '',
    bucket         :    '',
    targetName     :    '',
    currentDirName :    '',
    currentLevel   :    '',
    currentDirElm  :    '',
    toAjax         :    '',

    mode           :    'upload',
    isPreview      :    false,
    document       :    $(document),

    setElementData: function(obj, callback) {
        this.currentDirElm = obj.parents('.level');
        this.currentDirName = this.currentDirElm.data('dir');
        this.currentLevel = parseInt(this.currentDirElm.data('level'));
        if (callback) callback(obj);
    },

    coloringTarget: function(thisElm, mode) {
        const modeName = (mode === 'upload')? 'upload': 'remove';
        $('.row').each(function() {
            let someLevel = $(this).parents('.level').data('level');
            if (parseInt(someLevel) >= common.currentLevel) {
                $(this).removeClass(modeName);
            }
        });
        thisElm.addClass(modeName);
    },

    adjustColumn: function() {
        $('.level').each(function(){
            let level = parseInt($(this).data('level'));
            if (level > common.currentLevel) $(this).remove();
        });
    },

    toggleFontColor: function() {
        if (common.mode === 'remove') {
            const remove = common.document.find('.remove');
            remove.addClass('upload').removeClass('remove');
        } else {
            const upload = common.document.find('.upload');
            upload.addClass('remove').removeClass('upload');
        }
    },

    addDraggable: function() {
        $('.row_item').draggable({
            disabled: false,
            revert: true,
            revertDuration: 200,
        });
    },

    getPostDataSet : function(actionType) {
        let preset = {
            requestData : {
                targetName: this.targetName,
                currentDirName: this.currentDirName,
                currentLevel: this.currentLevel,
                actionType: actionType
            }
        }
        var params = $.extend({}, preset, actionType);
        return params;
    },

    postRequest: function(dataObj, successFn, isFormData) {
        let defaults = {
            url : common.toAjax,
            type : "POST",
            async: false,
            dataType : "text",
            data : dataObj,
            success : successFn,
        }
        if (isFormData) {
            let defaultsAdd = {
                contentType: false,
                processData: false,
            }
            var params = $.extend({}, defaults, defaultsAdd, dataObj, successFn);
        } else {
            var params = $.extend({}, defaults, dataObj, successFn);
        }
        return $.ajax(params);
    },

    fileOrDirNameValidation: function(input) {
        if (
            input !== '' &&
            input.length <= 40 &&
            input.match(/^[A-Za-z0-9_\-.()?!&\[\]]*$/)
        )
        { return true; }
        else
        { return false;}
    },

    classSwitcher: function(before, after, callback) {
        this.each(function() {
            const elm = $(this);
            if (elm.hasClass(before)) {
                elm.addClass(after).removeClass(before);
            } else {
                elm.addClass(before).removeClass(after);
            }
        });
        if (callback) callback();
    }

}
