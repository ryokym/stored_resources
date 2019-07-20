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
    add         : '',
    workdir     : '',
    stateWidth  : '',
    isview      : false,
    rootdir     : 1,
    leftgap     : 42,
    toAjax      : 'main/execute.php',
    codeStyle   : {'line-height':'2.6vh', 'font-family': 'ricty'},
    setElementData : function(obj, callback, add) {
        this.workdir = obj.parents('.level');
        this.dirname = this.workdir.data('dir');
        this.level   = parseInt(this.workdir.data('level'));
        if (add) this.add = add;
        if (callback) callback(obj);
    },
    getElementData : function() {
        let response = {
            requestData : {
                name       : this.name,
                dirname    : this.dirname,
                level      : this.level,
                actionType : common.mode,
            }
        }
        if (this.add) {
            response.requestData.add = this.add;
        }
        return response;
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
const $edit       = $('#edit');
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

common.mode   = 'change';
common.toAjax = common.basePath + main.toAjax;
$level.find('.row:has(.row_item)').remove();

/* change
-------------------------------------------------------*/

common.document.on('click', '.row:has(.row_item)', function() {
    if (common.ismode('remove')) return false;
    common.clickDisable.call($('.row:has(.row_item)'), 'start');
    main.setElementData($(this), function(elm) {
        main.name = elm.find('.row_item').text();
    });
    if (common.ismode('makedir')) {
        common.setmode('change');
        $('.close:visible').trigger('click');
    }
    main.workdir.find('.' + common.mode).removeClass(common.mode);
    $(this).addClass(common.mode);

    const afterProcess = function(response) {
        const data = JSON.parse(response);
        if (data.isFile === false) {
            const $levelClone = $level.clone();
            const newDirname = (main.level === main.rootdir)
                ? main.name
                : main.dirname + '/' + main.name;
            main.isview = false;
            main.adjustColumn();
            $levelClone.attr('data-level', ++main.level)
                       .attr('data-dir', newDirname);
            var elm = '';
            data.result.forEach(function(value) {
                elm += '<div class="row"><p class="row_item">' + value + '</p></div>';
            });
            $column.append($levelClone);
            $levelClone.show().append(elm);
            $('.prettyprint').empty();

            if (common.ismode('change')) $upload.show();
            if (common.ismode('remove')) common.rotateClass($levelClone.find('.open'), ['enable', 'disable']);

        } else {
            main.isview = true;
            if (common.ismode('change')) $preview.show();
            $preview.empty();
            $upload.hide();
            $preview.append('<code class="prettyprint">' + data.result +'</code>');
            main.adjustColumn();
        }
    }
    const dataSet = main.getElementData();
    common.postRequest(dataSet,afterProcess)
    .done(function() {
        PR.prettyPrint();
        common.clickDisable('end');
    });
});

/* remove
-------------------------------------------------------*/

$('#remove').on('click', function() {
    const open = $('.open');
    const row = $('.row');
    const rowItem = $('.row_item');
    common.rotate(common.mode, ['change', 'remove'], function(next){common.setmode(next)});
    common.rotateClass($('.change, .remove'), ['change', 'remove']);
    common.rotateClass(open, ['enable', 'disable']);
    alert(common.mode);
    $('.close:visible').trigger('click');
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
                const afterProcess = function() {
                    main.adjustColumn();
                }
                const dataSet = main.getElementData();
                common.postRequest(dataSet, afterProcess);
            }
        }
    });
});

/* expand
-------------------------------------------------------*/

$('#expand').on('click', function() {
    if (main.isview && !common.ismode('remove')) {
        common.togglemode('expand', 'change');
        if (common.ismode('change')) {
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
    common.setmode('logout');
    const afterProcess = function () {
        location.href = '/index.php?logout';
    }
    const dataSet = main.getElementData();
    common.postRequest(dataSet, afterProcess);
});

/* makedir
-------------------------------------------------------*/

common.document.on('click', '.close', function() {
    $('.createNewDirRow:visible').slideUp();
    common.setmode('change');
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
            afterProcess = function() {
                const createNewDirRow = main.workdir.find('.createNewDirRow');
                clone.find('.row_item').text(main.name);
                main.workdir.append(clone);
                clone.show();
                textbox.val('');
                createDirBtnArea.find('.close').hide();
                createNewDirRow.slideUp();
                common.setmode('change');
            }
            const dataSet = main.getElementData();
            common.postRequest(dataSet, afterProcess);
        } else {
            textbox.addClass('error');
        }

    }
    else if (!common.ismode('remove')) {
        main.setElementData($(this));
        const createNewDirRow = main.workdir.find('.createNewDirRow');
        $(this).next('.close').show();
        createNewDirRow.slideDown({
            start: function() {
                $(this).css({display: "flex"});
                $(this).find('.textbox').focus();
            }
        });
        common.setmode('makedir');
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
    if (common.ismode('change')) {
        common.setmode('upload');
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
    let requestData = main.getElementData();
    requestData = JSON.stringify(requestData);
    formData.append('requestData', requestData);
    formData.append('isUpload', true);
    const afterProcess = function(response) {
        if (common.validateFiles(response)) {
            clone.find('.row_item').text(response);
            clone.show();
            toUploadDir.append(clone);
        } else {
            alert(response);
        }
        $uploadDrop.removeClass('uploadMouseOver');
        common.setmode('change');
    }
    common.postRequest(formData, afterProcess, true);
}

/* edit
-------------------------------------------------------*/
common.document.on('click', '#edit', function() {
    if (main.isview === true) {
        main.isview = false;
        common.togglemode('change', 'edit');
        const text = $preview.find('span').text();
        const code = $('code');
        const replace = $('<code contenteditable="true"></code>');
        $.when(
            code.replaceWith(replace)
        ).done(function() {
            replace.text(text)
                   .css(main.codeStyle);
        });
    } else {
        let edited = $('.level:last').find('.change > .row_item');
        main.setElementData(edited, function(elm) {
            main.name = elm.text();
        },{content: 'hoge'});
        // common.togglemode('change', 'edit');
        // console.log(main.add);
        var dataSet = main.getElementData();
        // console.log(sample);
        common.postRequest(dataSet, function(response){
            console.log(response);
        });

    }
});

/* keypress
-------------------------------------------------------*/

common.document.on('keydown', 'input:visible', function(e) {
    if (e.keyCode === 13) {
        main.workdir.find('.open').trigger('click');
    } else {
        if ($(this).hasClass('error')) $(this).removeClass('error');
    }
});

common.document.keydown(function(e) {
    if (main.isview && e.keyCode === 69) {
        $edit.trigger('click');
    }
})
