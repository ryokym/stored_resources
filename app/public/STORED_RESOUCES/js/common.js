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

$(function(){
    flag.isModeUpload = true;
    $(document).on('click', '.row', function(){
        if (flag.isModeCreateDir === false) {
            var thisDir = $(this).parents('.level').attr('data-dir');
            var thisName = $(this).find('.row_item').text();
            var thisLevel = $(this).parents('.level').attr('data-level');
            thisLevel = parseInt(thisLevel);

            $('.column').find('.row_item').each(function() {
                var targetLevel = $(this).parents('.level').attr('data-level');
                if (targetLevel >= thisLevel) {
                    var color = $(this).css('color');
                    if (color !== defaultColor) {
                        $(this).css('color', defaultColor);
                        $(this).parent().removeClass('selected');
                    }
                }
            });
            if (flag.isModeDestroy === true) {
                $(this).find('.row_item').css('color', destroyColor);
                $(this).addClass('selected');
            } else {
                $(this).find('.row_item').css('color', selectedColor);
                $(this).addClass('selected');
            }

            $.ajax({
                url : "ajax.php",
                type : "POST",
                dataType : "text",
                data : {
                    dir : thisDir,
                    name : thisName,
                    level : thisLevel,
                },
                success : function(response) {
                    var maxLevel = $('.level').last().attr('data-level');
                    maxLevel = parseInt(maxLevel);
                    /* 選択された項目がディレクトリだった場合 */
                    if (isJSON(response) === true) {
                        var data = JSON.parse(response);
                        var template = $('.template').clone();
                        var newDir = thisDir + '/' + thisName;

                        adjustColumn(thisLevel);

                        newLevel = maxLevel;
                        if (thisLevel === maxLevel) {
                            newLevel++;
                        } else if (thisLevel < maxLevel) {
                            newLevel = ++thisLevel;
                        }

                        setWidth(newLevel);

                        $('.template').addClass('level');
                        $('.template').attr('data-level', newLevel);
                        $('.template').attr('data-dir', newDir);

                        var index = 0;
                        data.forEach(function(value) {
                            if (index == 0) {
                                $('.template').append('<div class="row"><img src="img/plus10.png" class="plus_icon show_txtbox"/><img src="img/close.png" class="close"/></div><div class="row createNewDirRow"><input class="textbox" type="text"/></div>');
                            }
                            $('.template').append('<div class="row"><p class="row_item" data-dir="'+ newDir +'">' + value + '</p></div>');
                            index++;
                        });

                        $('.template').show();
                        $('.template').removeClass('template');
                        $('.column').last().append(template);
                        $('.prettyprint').empty();
                        flag.isModeUpload = true;
                        if (flag.isModeDestroy === true) {
                            addDraggable();
                        } else {
                            $('#upload_area').show();
                        }
                        /* 選択された項目がファイルだった場合 */
                    } else {
                        $('#preview').empty();
                        $('#upload_area').hide();
                        flag.isModeUpload = false;
                        if (flag.isModeDestroy === false) {
                            $('#preview').append('<code class="prettyprint">' + response +'</code>');
                            adjustColumn(thisLevel);
                            setColumnWidth(thisLevel)
                            setPreviewWidth(thisLevel, maxLevel);
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
        }
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
                    url : "ajax.destroy.php",
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

    /* createNewDir */
    $(document).on('click', '.show_txtbox', function() {
        if (flag.isModeCreateDir === false) {
            $(this).removeClass('show_txtbox');
            $(this).addClass('gen_dir');
            flag.isModeCreateDir = true;
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
        } else {

        }
    });
    $(document).on('click', '.close', function() {
        flag.isModeCreateDir = false;
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
    $(document).on('click', '.gen_dir', function() {
        var createDirBtnArea = $(this).parent();
        var textboxArea = createDirBtnArea.next();
        var newDirName = $('.textbox:visible').val();
        var thisColumn = $(this).parents('.level');
        var clone = thisColumn.find('.row:last').clone();
        var currentDirName = thisColumn.attr('data-dir') + '/';
        $.ajax({
            type: 'POST',
            url: "ajax.createDir.php",
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
                flag.isModeCreateDir = false;
                return false;
            }
        });
    })
});
/* document.ready() end */

function addDraggable() {
    // flag.isModeUpload = false;
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
        url: "ajax.upload.php",
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
