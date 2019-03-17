/**
* main js
*
* main objects
-------------------------------------------------------*/

window.main = {}

main = {
    name        : '',
    dirname     : '',
    level       : '',
    workdir     : '',
    stateWidth  : '',
    isPreview   : false,
    rootdir     : 1,
    leftgap     : 42,
    toAjax      : 'main/execute.php',
    setElementData : function(obj, callback) {
        this.workdir = obj.parents('.level');
        this.dirname = this.workdir.data('dir');
        this.level   = parseInt(this.workdir.data('level'));
        if (callback) callback(obj);
    },
    getElementData : function(actionType) {
        let preset = {
            requestData : {
                name       : this.name,
                dirname    : this.dirname,
                level      : this.level,
                actionType : actionType
            }
        }
        var params = $.extend({}, preset, actionType);
        return params;
    },
}

common.mode   = 'upload';
common.toAjax = common.basePath + main.toAjax;

/* jQuery objects
-------------------------------------------------------*/

const previewArea    = $('#preview');
const uploadArea     = $('#upload_area');
const uploadDropArea = $('#upload_drop_area');
const removeArea     = $('#remove_area');
const removeDropArea = $('#remove_drop_area');
const columnArea     = $('#column');
const displayArea    = $('#display');
const rowClone       = $('.row:last').clone();
const template       = $('.level').clone();

template.find('.row:has(.row_item)').remove();

/* change
-------------------------------------------------------*/

common.document.on('click', '.row:has(.row_item)', function() {
    main.setElementData($(this), function(elm) {
        main.name = elm.find('.row_item').text();
    });
    if (common.ismode('makedir')) {
        common.setmode('upload');
        $('.close:visible').trigger('click');
    }
    main.workdir.find('.' + common.mode).removeClass(common.mode);
    $(this).addClass(common.mode);

    const afterChangeAction = function(response) {
        const data = JSON.parse(response);
        if (data.isFile === false) {
            const templateClone = template.clone();
            const newDirname = (main.level === main.rootdir)
                ? main.name
                : main.dirname + '/' + main.name;
            main.isPreview = false;
            common.adjustColumn(main.level);
            templateClone.data('level', ++main.level);
            templateClone.data('dir', newDirname);
            var elm = '';
            data.result.forEach(function(value) {
                elm += '<div class="row"><p class="row_item">' + value + '</p></div>';
            });
            columnArea.append(templateClone);
            templateClone.show().append(elm);
            $('.prettyprint').empty();

            if (common.ismode('upload')) uploadArea.show();
            if (common.ismode('remove')) common.swapAttParams.call(templateClone.find('.open'), 'enable', 'disable');

        } else {
            main.isPreview = true;
            if (common.ismode('upload')) previewArea.show();
            previewArea.empty();
            uploadArea.hide();
            previewArea.append('<code class="prettyprint">' + data.result +'</code>');
            common.adjustColumn(main.level);
        }
    }
    actionDataSet = main.getElementData('change');
    common.postRequest(actionDataSet,afterChangeAction)
    .done(function() { PR.prettyPrint() });
});

/* remove
-------------------------------------------------------*/

$('#remove').on('click', function() {
    const open = $('.open');
    const row = $('.row');
    const rowItem = $('.row_item');
    common.swapAttParams.call(row, 'upload', 'remove');
    common.swapAttParams.call(open,'disable','enable');
    $('.close:visible').trigger('click');
    if (common.ismode('upload')) {
        common.setmode('remove');
        previewArea.hide();
        uploadArea.hide();
        removeArea.css({display: 'flex'});
        common.addDraggable.call(rowItem);
    } else {
        common.setmode('upload');
        removeArea.hide();
        if (main.isPreview) $('#preview').show();
        else uploadArea.show();
        $('.row_item').draggable({ disabled: true });
    }

    removeDropArea.droppable({
        accept: '.row_item',
        over: function() { removeDropArea.addClass('removeMouseOver') },
        out : function() { removeDropArea.removeClass('removeMouseOver') },
        drop: function(e, data) {
            main.setElementData(data.draggable);
            main.name = data.helper.context.textContent;
            removeDropArea.removeClass('removeMouseOver');
            if (confirm(main.dirname + '/' + main.name + 'を削除しますか?') === false) {
                return false;
            } else {
                data.draggable.parent().remove();
                const afterRemoveAction = function() {
                    common.adjustColumn(main.level);
                }
                const removeActionDataSet = main.getElementData('remove');
                common.postRequest(removeActionDataSet, afterRemoveAction);
            }
        }
    });
});

/* expand
-------------------------------------------------------*/

$('#expand').on('click', function() {
    if (common.ismode('expand')) {
        common.setmode('upload');
        columnArea.show();
        displayArea.css({
            'margin-left':  0,
            'right'      : main.stateWidth - main.leftgap,
        });
        displayArea.animate({'right':0});
        columnArea.animate({'right':0});
    } else {
        common.setmode('expand');
        main.stateWidth = columnArea.outerWidth();
        var maxWidth = $('.container').innerWidth();
        columnArea.animate({
            'right':main.stateWidth,
        });
        displayArea.animate({'right':main.stateWidth - main.leftgap}, {
            complete: function() {
                displayArea.css({
                    'margin-left': main.leftgap,
                    'right'      : 0,
                });
                columnArea.hide();
            }
        })
    }
});

/* logout
-------------------------------------------------------*/

$('#logout').on('click', function() {
    const afterLogoutAction = function () {
        location.href = '/index.php?logout';
    }
    const logoutActionDataSet = main.getElementData('logout');
    common.postRequest(logoutActionDataSet, afterLogoutAction);
});

/* makedir
-------------------------------------------------------*/

common.document.on('click', '.close', function() {
    $('.createNewDirRow:visible').slideUp();
    common.setmode('upload');
    $(this).hide();
});

common.document.on('click', '.open, .enable', function() {
    if (common.ismode('makedir')) {
        const textbox = $('.textbox:visible')
        main.setElementData(textbox, function(elm) {
            main.name = elm.val();
        });
        if (common.validateFiles(main.name)) {
            const createDirBtnArea = main.workdir.find('.row').first();
            const clone = rowClone.clone();
            afterMakedirAction = function() {
                const createNewDirRow = main.workdir.find('.createNewDirRow');
                common.setmode('upload');
                clone.find('.row_item').text(main.name);
                main.workdir.append(clone);
                clone.show();
                textbox.val('');
                createDirBtnArea.find('.close').hide();
                createNewDirRow.slideUp();
            }
            const makedirActionDataSet = main.getElementData('makedir');
            common.postRequest(makedirActionDataSet, afterMakedirAction);
        } else {
            textbox.addClass('error');
        }

    }
    else if (!common.ismode('remove')) {
        main.setElementData($(this));
        const createNewDirRow = main.workdir.find('.createNewDirRow');
        common.setmode('makedir');
        $(this).next('.close').show();
        createNewDirRow.slideDown({
            start: function() {
                $(this).css({display: "flex"});
                $(this).find('.textbox').focus();
            }
        });
    }
});

/* upload
-------------------------------------------------------*/

uploadDropArea.on('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).addClass('uploadMouseOver');
});
uploadDropArea.on('dragleave', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).removeClass('uploadMouseOver');
});

common.document.on('drop', uploadDropArea, function(_e) {
    if (common.ismode('upload')) {
        _e.preventDefault();
        $(this).removeClass('uploadMouseOver');
        const e = _e.originalEvent;
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            fileUpload(files[i]);
        }
    }
});

function fileUpload(f) {
    const clone = rowClone.clone();
    const formData = new FormData();
    const toUploadDir = $('.level').eq(-1);
    main.dirname = toUploadDir.data('dir');
    formData.append('file', f);
    let requestData = main.getElementData('upload');
    requestData = JSON.stringify(requestData);
    formData.append('requestData', requestData);
    formData.append('isUpload', true);
    const afterUploadAction = function(response) {
        if (common.validateFiles(response)) {
            clone.find('.row_item').text(response);
            clone.show();
            toUploadDir.append(clone);
        } else {
            alert(response);
        }
        uploadDropArea.removeClass('uploadMouseOver');
    }
    common.postRequest(formData, afterUploadAction, true);
}

/* keypress
-------------------------------------------------------*/

common.document.on('keydown', 'input:visible', function(e) {
    if (e.keyCode === 13) {
        main.workdir.find('.open').trigger('click');
    } else {
        if ($(this).hasClass('error')) $(this).removeClass('error');
    }
});
