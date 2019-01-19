var onClickChDir = function() {
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
        url : ajaxDir + "ajax.php",
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
                        $('.template').append('<div class="row"><img src="' + assetDir + '/img/plus10.png" class="plus_icon show_txtbox"/><img src="' + assetDir + '/img/close.png" class="close"/></div><div class="row createNewDirRow"><input class="textbox" type="text"/></div>');
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

;(function($) {
    $.fn.fnEnableChDirHandler = function() {
        this.each(function() {
            $(document).on('click', '.row', onClickChDir);
        })
    }
})(jQuery);

;(function($) {
    $.fn.fnDisableChDirHandler = function() {
        this.each(function() {
            $(document).off('click', '.row', onClickChDir);
        })
    }
})(jQuery);
