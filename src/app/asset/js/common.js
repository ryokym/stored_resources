/**
* common js
*/

"use strict";

/* object literal
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

    togglemode : function(from, to) {
        if (this.mode === from) this.setmode(to);
        else this.setmode(from);
    },

    valfn : function(param) {
        if (param) this.val(param);
        else return this.val();
    },

    txtfn : function(param) {
        if (param) this.text(param);
        else return this.text();
    },

    swapfn: function(fname, store, params) {
        var target = this;
        store = common[fname].call(this);
        params.forEach(function(value) {
            var param = value;
            if (value != store) {
                common[fname].call(target, param);
            }
        })
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
        if (input !== ''
        &&  input.length <= 40
        &&  input.match(/^[A-Za-z0-9_\-.()?!&\[\]]*$/))
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

    swapAttAryParams : function(before, after, callback) {
        if (this instanceof Array) {
            this.forEach(function(value) {
                common.swapAttParams.call(value, before.shift(), after.shift());
            });
            if (callback) callback();
        }
    },

    ukey : function() {
        var key = "", i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i == 8 || i == 12 || i == 16 || i == 20) {
                key += "-"
            }
            key += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return key;
    },

    }
