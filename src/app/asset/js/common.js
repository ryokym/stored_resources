window.common = {}
common = {
    document: $(document),
    targetName: '',
    currentDirName: '',
    currentLevel: '',
    mode: 'upload',
    isPreview: false,
    toAjax: '/app/content/main/execute.php',

    coloringTarget: function(thisElm, mode) {
        modeName = (mode === 'upload')? 'upload': 'remove';
        $('.row').each(function() {
            var someLevel = $(this).parents('.level').attr('data-level');
            if (parseInt(someLevel) >= common.currentLevel) {
                $(this).removeClass(modeName);
            }
        });
        thisElm.addClass(modeName);
    },

    adjustColumn: function() {
        $('.level').each(function(){
            var level = parseInt($(this).attr('data-level'));
            if (level > common.currentLevel) $(this).remove();
        });
    },

    toggleFontColor: function() {
        if (common.mode === 'remove') {
            var remove = common.document.find('.remove');
            remove.addClass('upload').removeClass('remove');
        } else {
            var upload = common.document.find('.upload');
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
        var preset = {
            jsonData : {
                targetName: this.targetName,
                currentDirName: this.currentDirName,
                currentLevel: this.currentLevel,
                actionType: actionType
            }
        }
        var params = $.extend({}, preset, actionType);
        return params;
    },

    postJson: function(dataObj, successFn, isFormData) {
        var defaults = {
            url : common.toAjax,
            type : "POST",
            async: false,
            dataType : "text",
            data : dataObj,
            success : successFn,
        }
        if (isFormData) {
            var defaultsAdd = {
                contentType: false,
                processData: false,
            }
            var params = $.extend({}, defaults, defaultsAdd, dataObj, successFn);
        } else {
            var params = $.extend({}, defaults, dataObj, successFn);
        }
        return $.ajax(params);
    },

    newDirNameValidation: function(input) {
        if (
            input !== '' &&
            input.length <= 40 &&
            input.match(/^[A-Za-z0-9_\-.()?!&\[\]]*$/)
        ) {
            return true;
        } else {
            return false;
        }
    }

}
