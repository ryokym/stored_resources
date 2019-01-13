var ajaxDir = '/app/content/main/ajax/';
var assetDir = '/app/asset';
var selectedColor = 'rgb(137, 189, 255)';
var defaultColor = 'rgb(231, 246, 254)';
var destroyColor = 'rgb(255, 203, 137)';

var flag = {
    isModeDestroy : false,
    isModeUpload : false,
    isModeCreateDir : false
}


var uploadAreaColors = {
    'background-color': '#1a1a4d',
    'opacity': '0.7'
}
var destroyAreaColors = {
    'border': '2px dashed #E8F5FC',
    'background-color': '#442c34'
}

var uploadAreaDefaultColors = {
    'background-color': 'transparent'
}
var destoryAreaDefaultColors = {
    'border': '2px dashed #E8F5FC',
    'background-color': 'transparent'
}

flag.isModeUpload = true;

function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function(script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}

/*配列カンマ区切りで読み込み順指定*/
getScripts([assetDir + '/js/toggleChDirHandler.js'], function() {
    $('.row').fnEnableChDirHandler();

    $(document).on('click', '.gen_dir', function() {
        var createDirBtnArea = $(this).parent();
        var textboxArea = createDirBtnArea.next();
        var newDirName = $('.textbox:visible').val();
        var thisColumn = $(this).parents('.level');
        var clone = thisColumn.find('.row:last').clone();
        var currentDirName = thisColumn.attr('data-dir') + '/';
        $.ajax({
            type: 'POST',
            url: ajaxDir + "ajax.createDir.php",
            data : {
                newDirName: newDirName,
                currentDirName: currentDirName
            },
            success: function() {
                clone.find('.row_item').text(newDirName);
                thisColumn.append(clone);
                createDirBtnArea.find('.close').hide();
                createDirBtnArea.find('.gen_dir').addClass('show_txtbox');
                createDirBtnArea.find('.gen_dir').removeClass('gen_dir');
                var createNewDirRow = $(this).parent().next('.createNewDirRow');
                textboxArea.slideUp();
                $('.row').fnEnableChDirHandler();
                return false;
            }
        });
    });

    /* createNewDir */
    $(document).on('click', '.show_txtbox', function() {
        $('.row').fnDisableChDirHandler();
        $(this).removeClass('show_txtbox');
        $(this).addClass('gen_dir');
        $(this).next('.close').show();
        var createNewDirRow = $(this).parent().next('.createNewDirRow');
        createNewDirRow.slideDown({
            start: function () {
                $(this).css({
                display: "flex"
                })
            }
        });
        return false;
    });

    /* create directory close */
    $(document).on('click', '.close', function() {
        $('.row').fnEnableChDirHandler();
        $(this).prev().removeClass('gen_dir');
        $(this).prev().addClass('show_txtbox')
        $(this).hide();
        var createNewDirRow = $(this).parent().next('.createNewDirRow');
        createNewDirRow.slideUp();
        return false;
    });
    $('.textbox').focus(function() {
        return false;
    });
});



/* modeDestroy */
$('#destroy_area').hide();
$('#destroy').click(function() {
    toggleFontColor();
    if (flag.isModeDestroy === false) {
        flag.isModeDestroy = true;
        $('.prettyprint').hide();
        $('#upload_area').hide();
        $('#destroy_area').show();
        $(this).css('color', destroyColor);
        addDraggable();
    } else {
        flag.isModeDestroy = false;
        $('#destroy_area').hide();
        if (flag.isModeUpload === true) {
            $('#upload_area').show();
        } else {
            $('.prettyprint').show();
        }


        $(this).css('color', defaultColor);
        $('.row').each(function() {
            $(this).draggable({
                disabled: true,
            })
        })
    }
});

var destroyDropArea = $('#destroy_drop_area');
destroyDropArea.droppable({
    accept: '.row_item',
    over: function() {
        destroyDropArea.css(destroyAreaColors);
    },
    out: function() {
        destroyDropArea.css(destoryAreaDefaultColors);
    },
    drop: function(e, data) {
        var name = data.helper.context.textContent;
        var thisDataDir = data.helper.context.dataset.dir
        var path = thisDataDir + '/';
        destroyDropArea.css(destoryAreaDefaultColors);
        var thisElm = $('[data-dir="'+ thisDataDir +'"]');
        if (confirm(path + name + 'を削除しますか?') === false) {
            return false;
        } else {
            $.ajax({
                url : ajaxDir + "ajax.destroy.php",
                type : "POST",
                dataType : "text",
                data : {
                    name: name,
                    path: path
                }, success : function(response) {
                    thisElm.each(function() {
                        if ($(this).text() === name) {
                            $(this).remove();
                        }
                    })
                    var data = JSON.parse(response);
                    data.forEach(function(value) {
                        $('.level').each(function(){
                            if ($(this).attr('data-dir') === value) {
                                $(this).remove();
                            }
                        });
                    });
                }
            });
        }
    }
});
/* modeDestroy end */
/* expand */
$('#expand').click(function() {
    var column = $('.column')
    if (column.hasClass('hide')) {
        column.show('slide', '', 300);
        column.removeClass('hide');
        $('#preview').css('width', tmpPreviewWidth);
    } else {
        tmpPreviewWidth = $('#preview').css('width');
        column.hide('slide', '', 300).promise().done(function(){
            column.addClass('hide');
            $('#preview').css('width', '100%');
        })
    }
});
/* logout */
$('#logout').click(function() {
    location.href = '/app/login.php?logout';
});

function addDraggable() {
    $('.row_item').each(function() {
        $(this).draggable({
            disabled: false,
            revert: true,
            revertDuration: 200,
        });
    });
}

function toggleFontColor() {
    $('.row_item').each(function() {
        var fontColor = $(this).css('color');
        if (flag.isModeDestroy === true) {
            if ($(this).css('color') === destroyColor) {
                $(this).css('color', selectedColor);
            }
        } else {
            if ($(this).css('color') === selectedColor) {
                $(this).css('color', destroyColor);
            }
        }
    })
}

$(document).on({
    'mouseenter' : function() {
        if (flag.isModeDestroy === true) {
            var color = destroyColor;
        } else {
            var color = selectedColor;
        }
        if ($(this).hasClass('selected') === false) {
            $(this).find('.row_item').css('color', color);
        }
    },
    'mouseleave' : function() {
        if ($(this).hasClass('selected') === false) {
            $(this).find('.row_item').css('color', defaultColor);
        }
    }
}, '.row');

function setWidth(level) {
    setColumnWidth(level);
    setPreviewWidth(level);
}

function setColumnWidth(level) {
    var level = parseInt(level);
    var newWidth = level * 11;
    $('.column').css('width', newWidth + 'em');
}

function setPreviewWidth(level, maxLevel) {
    var level = parseInt(level);
    var adjustEm = 11;
    var defaultPreviewEm = 67;
    var pixelPerEm = 15;
    if (level > 1) {
        var subPixel = ((level * adjustEm) - adjustEm) * pixelPerEm;
        var newPixel = (defaultPreviewEm * pixelPerEm) - subPixel;
        var newEm = newPixel / pixelPerEm;
        $('#preview').css('width', newEm + 'em');
    } else {
        $('#preview').css('width', defaultPreviewEm + 'em');
    }
}

function adjustColumn(thisLevel) {
    thisLevel = parseInt(thisLevel);
    $('.level').each(function(){
        var level = $(this).attr('data-level');
        level = parseInt(level);
        if (level > thisLevel) {
            $(this).remove();
        }
    });
}

/* ファイルアップロード */

var obj = $("#upload_drop_area");
obj.on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
});
obj.on('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).css(uploadAreaColors);
});
obj.on('dragleave', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).css(uploadAreaDefaultColors);
})

$(document).on('drop', obj, function(_e) {
    if (flag.isModeDestroy === false) {
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
    formData.append('file', f);
    var currentDir = $('.level').last().attr('data-dir');
    formData.append('dir', currentDir);
    $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        url: ajaxDir + "ajax.upload.php",
        data : formData,
        success: function(data) {
        location.reload();
        }
    });
}

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
