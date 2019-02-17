$(function() {
    $('#remove_area').hide();
});

common.toAjax = '/app/content/main/execute.php';
const rowClone = $('.row:last').clone();
const template = $('.level').clone();
template.find('.row:has(.row_item)').remove();

const previewArea = $('#preview');
const uploadArea = $('#upload_area');
const uploadDropArea = $('#upload_drop_area');
const removeArea = $('#remove_area');
const removeDropArea = $('#remove_drop_area');
const column = $('.column');


common.document.on('click', '.row:has(.row_item)', function() {
    common.setElementData($(this), function(elm) {
        common.targetName = elm.find('.row_item').text();
    });
    if (common.mode === 'createNewDir') {
        common.mode = 'upload';
        $('.close:visible').trigger('click');
    }
    common.coloringTarget($(this), common.mode);
    const afterChangeAction = function(response) {
        const data = JSON.parse(response);
        if (data.isFile === false) {
            const templateClone = template.clone();
            const newDirName = (common.currentLevel == 1)?
                common.targetName:
                common.currentDirName + '/' + common.targetName;
            common.isPreview = false;
            common.adjustColumn();
            templateClone.attr('data-level', ++common.currentLevel);
            templateClone.attr('data-dir', newDirName);
            data.result.forEach(function(value) {
                templateClone.append('<div class="row"><p class="row_item">' + value + '</p></div>');
            });
            templateClone.show();
            column.append(templateClone);
            $('.prettyprint').empty();
            if (common.mode === 'upload') uploadArea.show();
            else common.addDraggable();

        } else {
            common.isPreview = true;
            if (common.mode === 'upload') previewArea.show();
            previewArea.empty();
            uploadArea.hide();
            previewArea.append('<code class="prettyprint">' + data.result +'</code>');
            common.adjustColumn();
        }
    }
    actionDataSet = common.getPostDataSet('change');
    common.postRequest(actionDataSet,afterChangeAction)
    .done(function() {
        $(document).ready(function() {
            PR.prettyPrint();
        });
    });
});

/* moderemove */
common.document.on('click', '#remove', function() {
    const tagText = $('.show_txtbox');
    common.toggleFontColor();
    common.classSwitcher.call(tagText,'opacity','');
    $('.close:visible').trigger('click');
    if (common.mode === 'upload') {
        common.mode = 'remove';
        previewArea.hide();
        uploadArea.hide();
        removeArea.show();
        common.addDraggable();
    } else {
        common.mode = 'upload';
        $('#remove_area').hide();
        if (common.isPreview) $('#preview').show();
        else $('#upload_area').show();
        $('.row').each(function() {
            $(this).draggable({
                disabled: true,
            })
        })
    }

    removeDropArea.droppable({
        accept: '.row_item',
        over: function() {
            removeDropArea.addClass('removeMouseOver');
        },
        out: function() {
            removeDropArea.removeClass('removeMouseOver');
        },
        drop: function(e, data) {
            common.setElementData(data.draggable);
            common.targetName = data.helper.context.textContent;
            removeDropArea.removeClass('removeMouseOver');
            if (confirm(common.currentDirName + '/' + common.targetName + 'を削除しますか?') === false) {
                return false;
            } else {
                data.draggable.parent().remove();
                const afterRemoveAction = function() {
                    common.adjustColumn();
                }
                const removeActionDataSet = common.getPostDataSet('remove');
                common.postRequest(removeActionDataSet, afterRemoveAction);
            }
        }
    });
});
/* moderemove end */

/* expand */
common.document.on('click', '#expand', function() {
    if (column.hasClass('hide')) column.show('slide', '', 300).removeClass('hide')
    else column.hide('slide', '', 300).promise().done(function(){ column.addClass('hide');});
});

/* logout */
common.document.on('click', '#logout', function() {
    const afterLogoutAction = function () {
        location.href = '/index.php?logout';
    }
    const logoutActionDataSet = common.getPostDataSet('logout');
    common.postRequest(logoutActionDataSet, afterLogoutAction);
});

/* createNewDir */
common.document.on('click', '.show_txtbox', function() {
    const textbox = $('.show_txtbox');
    common.setElementData($(this));
    const createNewDirRow = common.thisColumn.find('.createNewDirRow');
    common.classSwitcher.call($(this), 'gen_dir', 'show_txtbox');
    common.classSwitcher.call($('.show_txtbox'), 'opacity', '');
    common.mode = 'createNewDir';
    $(this).next('.close').show();
    createNewDirRow.slideDown({
        start: function() {
            $(this).css({display: "flex"});
            $(this).find('.textbox').focus();
        }
    });
});

common.document.on('click', '.close', function() {
    const makeDirBtn = $(this).siblings('.gen_dir');
    common.classSwitcher.call($('.show_txtbox'), 'opacity', '');
    common.classSwitcher.call(makeDirBtn, 'gen_dir', 'show_txtbox');
    $('.createNewDirRow:visible').slideUp();
    common.mode = 'upload';
    $(this).hide();
})

common.document.on('click', '.gen_dir', function() {
    const textbox = $('.textbox:visible')
    common.setElementData(textbox, function(elm) {
        common.targetName = elm.val();
    })
    if (common.fileOrDirNameValidation(common.targetName)) {
        const createDirBtnArea = common.thisColumn.find('.row:first');
        const clone = rowClone.clone();
        afterMakedirAction = function() {
            const createNewDirRow = common.thisColumn.find('.createNewDirRow');
            common.mode = 'upload';
            clone.find('.row_item').text(common.targetName);
            common.thisColumn.append(clone);
            clone.show();
            textbox.val('');
            createDirBtnArea.find('.close').hide();
            common.classSwitcher.call($('.show_txtbox'), 'opacity', '');
            common.classSwitcher.call(createDirBtnArea.find('.gen_dir'), 'gen_dir', 'show_txtbox');
            $('.createNewDirRow:visible').slideUp();
        }
        const makedirActionDataSet = common.getPostDataSet('makedir');
        common.postRequest(makedirActionDataSet, afterMakedirAction);
    } else {
        textbox.addClass('error');
    }
});
/* createNewDir END */
/* upload */
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
    if (common.mode === 'upload') {
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
    common.currentDirName = toUploadDir.attr('data-dir');
    formData.append('file', f);
    let requestData = common.getPostDataSet('upload');
    requestData = JSON.stringify(requestData);
    formData.append('requestData', requestData);
    formData.append('isUpload', true);
    const afterUploadAction = function(response) {
        if (common.fileOrDirNameValidation(response)) {
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
/* upload END */

/* keyboard shortcut */
common.document.on('keydown', 'input:visible', function(e) {
    if (e.keyCode === 13) {
        $('.gen_dir').trigger('click');
    } else {
        if ($(this).hasClass('error')) $(this).removeClass('error');
    }
});
