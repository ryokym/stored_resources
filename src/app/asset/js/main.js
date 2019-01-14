$(function() {
    $('#remove_area').hide();
});

common.document.on('click', '.row:has(.row_item)', function() {
    var thisObj = $(this);
    common.targetName = thisObj.find('.row_item').text();
    common.currentDirName = thisObj.parents('.level').attr('data-dir');
    common.currentLevel = parseInt(thisObj.parents('.level').attr('data-level'));
    common.coloringTarget(thisObj, common.mode);
    var changeAction = function(response) {
        var maxLevel = parseInt($('.level').eq(-1).attr('data-level'));
        /* 選択された項目がディレクトリだった場合 */
        if (isJSON(response) === true) {
            var data = JSON.parse(response);
            var templateClone = $('.template').clone();
            var template = $('.template')
            var newDirName = (common.currentLevel == 1)? common.targetName: common.currentDirName + '/' + common.targetName;
            common.isPreview = false;
            common.adjustColumn();
            template.attr('data-level', ++common.currentLevel);
            template.attr('data-dir', newDirName);
            data.forEach(function(value) {
                template.append('<div class="row"><p class="row_item" data-dir="'+ newDirName +'">' + value + '</p></div>');
            });
            template.show().removeClass('template');
            $('.column').last().append(templateClone);
            $('.prettyprint').empty();
            if (common.mode === 'upload') $('#upload_area').show();
            else common.addDraggable();
            /* 選択された項目がファイルだった場合 */
        } else {
            var previewArea = $('#preview');
            common.isPreview = true;
            if (common.mode === 'upload') previewArea.show();
            previewArea.empty();
            $('#upload_area').hide();
            previewArea.append('<code class="prettyprint">' + response +'</code>');
            common.adjustColumn();
        }
    }
    actionDataSet = common.getPostDataSet('change');
    common.postJson(actionDataSet,changeAction)
    .done(function() {
        $(document).ready(function() {
            PR.prettyPrint();
        });
    });
});

/* moderemove */
common.document.on('click', '#remove', function() {
    common.toggleFontColor();
    console.log(common.mode);
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
                $.ajax({
                    url : common.toAjax,
                    type : "POST",
                    dataType : "text",
                    data : {
                        action: 'remove',
                        targetName: common.targetName,
                        currentDirName: thisDataDir
                    }, success : function(response) {
                        var elm = $('[data-dir="'+ thisDataDir +'"]').find('.row_item:contains(' + common.targetName + ')');
                        elm.parent('.row').remove();
                        common.adjustColumn();
                    }
                });
            }
        }
    });
});
/* moderemove end */

/* expand */
common.document.on('click', '#expand', function() {
    var column = $('.column')
    if (column.hasClass('hide')) column.show('slide', '', 300).removeClass('hide');
    else column.hide('slide', '', 300).promise().done(function(){ column.addClass('hide');})
});

/* logout */
common.document.on('click', '#logout', function() {
    location.href = '/app/content/login/index.php?logout';
})

/* createNewDir */
common.document.on('click', '.show_txtbox', function() {
    if (common.mode != 'createNewDir') {
        common.mode = 'createNewDir';
        var thisBtn = $(this);
        var createNewDirRow = $(this).parent().next('.createNewDirRow');
        thisBtn.removeClass('show_txtbox');
        thisBtn.addClass('gen_dir');
        thisBtn.next('.close').show();
        createNewDirRow.slideDown({
            start: function() {
                $(this).css({
                    display: "flex"
                });
            }
        });
    }
});

common.document.on('click', '.close', function() {
    var plusBtn = $(this).prev();
    var createNewDirRow = plusBtn.parent().next('.createNewDirRow');
    common.mode = 'upload';
    plusBtn.removeClass('gen_dir');
    plusBtn.addClass('show_txtbox')
    $(this).hide();
    createNewDirRow.slideUp();
})

$(document).on('click', '.gen_dir', function() {
    var createDirBtnArea = $(this).parent();
    var textboxArea = createDirBtnArea.next();
    var newDirName = $('.textbox:visible').val();
    var thisColumn = $(this).parents('.level');
    var clone = thisColumn.find('.row:last').clone();
    var currentDirName = thisColumn.attr('data-dir');
    $.ajax({
        type: 'POST',
        url: common.toAjax,
        data : {
            action: 'makedir',
            targetName: newDirName,
            currentDirName: currentDirName
        },
        success: function() {
            common.mode = 'upload';
            clone.find('.row_item').text(newDirName);
            thisColumn.append(clone);
            createDirBtnArea.find('.close').hide();
            createDirBtnArea.find('.gen_dir').addClass('show_txtbox');
            createDirBtnArea.find('.gen_dir').removeClass('gen_dir');
            var createNewDirRow = $(this).parent().next('.createNewDirRow');
            textboxArea.slideUp();
        }
    });
})
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
    var toUploadDir = $('.level').eq(-2).attr('data-dir');
    formData.append('action', 'upload');
    formData.append('file', f);
    formData.append('currentDirName', toUploadDir);
    $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        url: common.toAjax,
        data : formData,
        success: function(data) {
        location.reload();
        }
    });
}
/* upload END */

var isJSON = function(arg) {
    arg = (typeof arg === "function") ? arg() : arg;
    if (typeof arg  !== "string") {
        return false;
    }
    try {
    arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
        return true;
    } catch (e) {
        return false;
    }
};
