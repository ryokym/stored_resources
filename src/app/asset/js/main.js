/**
* main js
*
* object leteral
-------------------------------------------------------*/

window.main = {}
main = {
    name        : '',
    dirname     : '',
    level       : '',
    workdir     : '',
    stateWidth  : '',
    isview      : false,
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
    adjustColumn : function() {
        $('.level').each(function(){
            let anyLevel = parseInt($(this).data('level'));
            if (anyLevel > main.level) $(this).remove();
        });
    },
}

/* jQuery object
-------------------------------------------------------*/

const $preview    = $('#preview');
const $upload     = $('#upload_area');
const $uploadDrop = $('#upload_drop_area');
const $remove     = $('#remove_area');
const $removeDrop = $('#remove_drop_area');
const $column     = $('#column');
const $display    = $('#display');
const $row        = $('.row:last').clone();
const $level      = $('.level').clone();

/* initialize
-------------------------------------------------------*/

common.mode   = 'upload';
common.toAjax = common.basePath + main.toAjax;
$level.find('.row:has(.row_item)').remove();

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
            const $levelClone = $level.clone();
            const newDirname = (main.level === main.rootdir)
                ? main.name
                : main.dirname + '/' + main.name;
            main.isview = false;
            main.adjustColumn();
            $levelClone.data('level', ++main.level);
            $levelClone.data('dir', newDirname);
            var elm = '';
            data.result.forEach(function(value) {
                elm += '<div class="row"><p class="row_item">' + value + '</p></div>';
            });
            $column.append($levelClone);
            $levelClone.show().append(elm);
            $('.prettyprint').empty();

            if (common.ismode('upload')) $upload.show();
            if (common.ismode('remove')) common.swapAttParams.call($levelClone.find('.open'), 'enable', 'disable');

        } else {
            main.isview = true;
            if (common.ismode('upload')) $preview.show();
            $preview.empty();
            $upload.hide();
            $preview.append('<code class="prettyprint">' + data.result +'</code>');
            main.adjustColumn();
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
    common.swapAttAryParams.call([row, open],
        ['upload', 'enable' ],
        ['remove', 'disable'],
    );
    $('.close:visible').trigger('click');
    common.togglemode('upload', 'remove');
    if (common.ismode('remove')) {
        $preview.hide();
        $upload.hide();
        $remove.css({display: 'flex'});
        common.addDraggable.call(rowItem);
    } else {
        $remove.hide();
        if (main.isview) $preview.show();
        else $upload.show();
        $('.row_item').draggable({ disabled: true });
    }

    $removeDrop.droppable({
        accept: '.row_item',
        over: function() { $removeDrop.addClass('removeMouseOver') },
        out : function() { $removeDrop.removeClass('removeMouseOver') },
        drop: function(e, data) {
            main.setElementData(data.draggable);
            main.name = data.helper.context.textContent;
            $removeDrop.removeClass('removeMouseOver');
            if (confirm(main.dirname + '/' + main.name + 'を削除しますか?') === false) {
                return false;
            } else {
                data.draggable.parent().remove();
                const afterRemoveAction = function() {
                    main.adjustColumn();
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
    if (main.isview && !common.ismode('remove')) {
        common.togglemode('expand', 'upload');
        if (common.ismode('upload')) {
            $column.show();
            $display.css({
                'margin-left':  0,
                'right'      : main.stateWidth - main.leftgap,
            });
            $display.animate({'right':0});
            $column.animate({'right':0});
        }
        if (common.ismode('expand')){
            main.stateWidth = $column.outerWidth();
            var maxWidth = $('.container').innerWidth();
            $column.animate({
                'right':main.stateWidth,
            });
            $display.animate({'right':main.stateWidth - main.leftgap}, {
                complete: function() {
                    $display.css({
                        'margin-left': main.leftgap,
                        'right'      : 0,
                    });
                    $column.hide();
                }
            })
        }
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
            const clone = $row.clone();
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

$uploadDrop.on('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).addClass('uploadMouseOver');
});
$uploadDrop.on('dragleave', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).removeClass('uploadMouseOver');
});

common.document.on('drop', $uploadDrop, function(_e) {
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
    const clone = $row.clone();
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
        $uploadDrop.removeClass('uploadMouseOver');
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
