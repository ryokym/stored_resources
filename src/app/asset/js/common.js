/**
* common js
*/

"use strict";

/* common objects
-------------------------------------------------------*/

window.common = {}

common = {
    mode     : '',
    toAjax   : '',
    basePath : '/app/content/',
    document : $(document),

    getmode : function() {
        return this.mode;
    },

    setmode : function(mode) {
        this.mode = mode;
    },

    ismode  : function(mode) {
        if (this.mode === mode) return true;
        else return false;
    },

    adjustColumn : function(level) {
        $('.level').each(function(){
            let anyLevel = parseInt($(this).data('level'));
            if (anyLevel > level) $(this).remove();
        });
    },

    addDraggable : function() {
            this.draggable({
            disabled       : false,
            revert         : true,
            revertDuration : 200,
        });
    },

    postRequest : function(dataSet, successFn, isFormData) {
        let defaults = {
            url      : common.toAjax,
            type     : "POST",
            async    : false,
            dataType : "text",
            data     : dataSet,
            success  : successFn,
        }
        if (isFormData) {
            let defaultsAdd = {
                contentType: false,
                processData: false,
            }
            var params = $.extend({}, defaults, defaultsAdd, dataSet, successFn);
        } else {
            var params = $.extend({}, defaults, dataSet, successFn);
        }
        return $.ajax(params);
    },

    validateFiles : function(input) {
        if (
            input !== '' &&
            input.length <= 40 &&
            input.match(/^[A-Za-z0-9_\-.()?!&\[\]]*$/)
        )
        { return true; }
        else
        { return false;}
    },

    swapAttParams : function(before, after, callback) {
        this.each(function() {
            const elm = $(this);
            if (elm.hasClass(before)) {
                elm.addClass(after).removeClass(before);
            }
            else if (elm.hasClass(after)) {
                elm.addClass(before).removeClass(after);
            }
        });
        if (callback) callback();
    },

}
