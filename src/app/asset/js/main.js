$(function() {
    common.toAjax = '/app/content/main/execute.php';
    $('#remove_area').hide();
});

var rowClone = $('.row:last').clone();
var template = $('.level').clone();
template.find('.row:has(.row_item)').remove();

common.document.on('click', '.row:has(.row_item)', function() {
    var thisObj = $(this);
    common.targetName = thisObj.find('.row_item').text();
    common.currentDirName = thisObj.parents('.level').attr('data-dir');
    common.currentLevel = parseInt(thisObj.parents('.level').attr('data-level'));
    if (common.mode === 'createNewDir') {
        common.mode = 'upload';
        $('.close:visible').trigger('click');
    }
    common.coloringTarget(thisObj, common.mode);
    var afterChangeAction = function(response) {
        var data = JSON.parse(response);
        if (data.isFile === false) {
            var templateClone = template.clone();
            var newDirName = (common.currentLevel == 1)? common.targetName: common.currentDirName + '/' + common.targetName;
            common.isPreview = false;
            common.adjustColumn();
            templateClone.attr('data-level', ++common.currentLevel);
            templateClone.attr('data-dir', newDirName);
            data.result.forEach(function(value) {
                templateClone.append('<div class="row"><p class="row_item">' + value + '</p></div>');
            });
            templateClone.show();
            $('.column').append(templateClone);
            $('.prettyprint').empty();
            delete templateClone;
            if (common.mode === 'upload') $('#upload_area').show();
            else common.addDraggable();

        } else {
            var previewArea = $('#preview');
            common.isPreview = true;
            if (common.mode === 'upload') previewArea.show();
            previewArea.empty();
            $('#upload_area').hide();
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
    var tagText = $('.show_txtbox');
    common.toggleFontColor();
    common.classSwitcher.call(tagText,'opacity','');
    $('.close:visible').trigger('click');
    if (common.mode === 'upload') {
        common.mode = 'remove';
        $('#preview').hide();
        $('#upload_area').hide();
        $('#remove_area').show();
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
    var removeDropArea = $('#remove_drop_area');
    removeDropArea.droppable({
        accept: '.row_item',
        over: function() {
            removeDropArea.addClass('removeMouseOver');
        },
        out: function() {
            removeDropArea.removeClass('removeMouseOver');
        },
        drop: function(e, data) {
            common.targetName = data.helper.context.textContent;
            common.currentDirName = data.draggable.parents('.level').attr('data-dir');
            common.currentLevel = data.draggable.parents('.level').attr('data-level');
            removeDropArea.removeClass('removeMouseOver');
            if (confirm(common.currentDirName + '/' + common.targetName + 'を削除しますか?') === false) {
                return false;
            } else {
                data.draggable.parent().remove();
                var afterRemoveAction = function() {
                    common.adjustColumn();
                }
                var removeActionDataSet = common.getPostDataSet('remove');
                common.postRequest(removeActionDataSet, afterRemoveAction);
            }
        }
    });
});
/* moderemove end */

/* expand */
common.document.on('click', '#expand', function() {
    var column = $('.column')
    if (column.hasClass('hide')) column.show('slide', '', 300).removeClass('hide')
    else column.hide('slide', '', 300).promise().done(function(){ column.addClass('hide');});
});

/* logout */
common.document.on('click', '#logout', function() {
    location.href = '/app/content/login/index.php?action=logout';
})

/* createNewDir */
common.document.on('click', '.show_txtbox', function() {
    var createNewDirRow = $(this).parent().next('.createNewDirRow');
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
    var makeDirBtn = $(this).siblings('.gen_dir');
    common.classSwitcher.call($('.show_txtbox'), 'opacity', '');
    common.classSwitcher.call(makeDirBtn, 'gen_dir', 'show_txtbox');
    $('.createNewDirRow:visible').slideUp();
    common.mode = 'upload';
    $(this).hide();
})

common.document.on('click', '.gen_dir', function() {
    var textbox = $('.textbox:visible');
    common.targetName = textbox.val();
    if (common.newDirNameValidation(common.targetName)) {
        var createDirBtnArea = $(this).parent();
        var thisColumn = $(this).parents('.level');
        var clone = rowClone.clone();
        common.currentDirName = thisColumn.attr('data-dir');
        afterMakedirAction = function() {
            var createNewDirRow = $(this).parent().next('.createNewDirRow');
            common.mode = 'upload';
            clone.find('.row_item').text(common.targetName);
            thisColumn.append(clone);
            clone.show();
            textbox.val('');
            createDirBtnArea.find('.close').hide();
            common.classSwitcher.call($('.show_txtbox'), 'opacity', '');
            common.classSwitcher.call(createDirBtnArea.find('.gen_dir'), 'gen_dir', 'show_txtbox');
            $('.createNewDirRow:visible').slideUp();
        }
        var makedirActionDataSet = common.getPostDataSet('makedir');
        common.postRequest(makedirActionDataSet, afterMakedirAction);
    } else {
        textbox.addClass('error');
    }
});
/* createNewDir END */
/* upload */
var uploadDropArea = $("#upload_drop_area");
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
        $(this).css('border', '1px dashed #000');
        var e = _e.originalEvent;
        var files = e.dataTransfer.files;
        for (var i = 0; i < files.length; i++) {
            fileUpload(files[i]);
        }
    }
});

function fileUpload(f) {
    var formData = new FormData();
    var toUploadDir = $('.level').eq(-1);
    var toUploadDirName = toUploadDir.attr('data-dir');
    var clone = rowClone.clone();
    formData.append('file', f);
    common.currentDirName = toUploadDirName;
    var requestData = common.getPostDataSet('upload');
    requestData = JSON.stringify(requestData);
    formData.append('requestData', requestData);
    formData.append('isUpload', true);
    var afterUploadAction = function(response) {
        if (response === '') {
            alert('ERROR!');
        } else {
            clone.find('.row_item').text(response);
            clone.show();
            toUploadDir.append(clone);
        }
        $("#upload_drop_area").removeClass('uploadMouseOver');
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
