$(function() {
    $('#destroy_area').hide();
});

common.document.on('click', '.row:has(.row_item)', function() {
    var thisObj = $(this);
    common.targetName = thisObj.find('.row_item').text();
    common.currentDirName = thisObj.parents('.level').attr('data-dir');
    common.currentLevel = parseInt(thisObj.parents('.level').attr('data-level'));
    common.coloringTarget(thisObj, common.mode);
    $.ajax({
        url : common.ajaxDir + "ajax.php",
        type : "POST",
        dataType : "text",
        data : {
            dir : common.currentDirName,
            name : common.targetName,
            level : common.currentLevel,
        },
        success : function(response) {
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
                common.isPreview = true;
                $('#preview').empty();
                $('#upload_area').hide();
                if (common.mode === 'upload') {
                    $('#preview').append('<code class="prettyprint">' + response +'</code>');
                    common.adjustColumn();
                } else {
                    $('#preview').append('<code class="prettyprint" style="display: none;">' + response +'</code>');
                }
            }
        }
    }).done(function() {
        $(document).ready(function() {
            PR.prettyPrint();
        })
    });
});

/* modeDestroy */
common.document.on('click', '#destroy', function() {
    common.toggleFontColor();
    console.log(common.mode);
    if (common.mode === 'upload') {
        common.mode = 'destroy';
        $('#preview').hide();
        $('#upload_area').hide();
        $('#destroy_area').show();
        common.addDraggable();
    } else {
        common.mode = 'upload';
        $('#destroy_area').hide();
        if (common.isPreview) $('#preview').show();
        else $('#upload_area').show();

        $('.row').each(function() {
            $(this).draggable({
                disabled: true,
            })
        })
    }
    var destroyDropArea = $('#destroy_drop_area');
    destroyDropArea.droppable({
        accept: '.row_item',
        over: function() {
            destroyDropArea.addClass('destroyMouseOver');
        },
        out: function() {
            destroyDropArea.removeClass('destroyMouseOver');
        },
        drop: function(e, data) {
            common.targetName = data.helper.context.textContent;
            var thisDataDir = data.draggable.parents('.level').attr('data-dir');
            var path = thisDataDir + '/';
            common.currentLevel = data.draggable.parents('.level').attr('data-level');
            destroyDropArea.removeClass('destroyMouseOver');
            if (confirm(path + common.targetName + 'を削除しますか?') === false) {
                return false;
            } else {
                $.ajax({
                    url : common.ajaxDir + "ajax.destroy.php",
                    type : "POST",
                    dataType : "text",
                    data : {
                        name: common.targetName,
                        path: path
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
/* modeDestroy end */

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
    var currentDirName = thisColumn.attr('data-dir') + '/';
    $.ajax({
        type: 'POST',
        url: common.ajaxDir + "ajax.createDir.php",
        data : {
            newDirName: newDirName,
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
    alert(toUploadDir);
    formData.append('file', f);
    formData.append('dir', toUploadDir);
    $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        url: common.ajaxDir + "ajax.upload.php",
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
