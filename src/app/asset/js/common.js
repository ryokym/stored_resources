window.common = {}
common = {
    document: $(document),
    targetName: '',
    currentDirName: '',
    currentLevel: '',
    mode: 'upload',
    isPreview: false,
    ajaxDir: '/app/content/main/ajax/',

    coloringTarget: function(thisElm, mode) {
        modeName = (mode === 'upload')? 'upload': 'destroy';
        $('.row').each(function() {
            var someLevel = $(this).parents('.level').attr('data-level');
            if (parseInt(someLevel) >= common.currentLevel) {
                $(this).removeClass(modeName);
            }
        });
        thisElm.addClass(modeName);
    },

    adjustColumn: function() {
        $('.level').each(function(){
            var level = parseInt($(this).attr('data-level'));
            if (level > common.currentLevel) {
                $(this).remove();
            }
        });
    },

    toggleFontColor: function() {
        if (common.mode === 'destroy') {
            var destroy = common.document.find('.destroy');
            destroy.addClass('upload');
            destroy.removeClass('destroy');
        } else {
            var upload = common.document.find('.upload');
            upload.addClass('destroy');
            upload.removeClass('upload');
        }
    },

    addDraggable: function() {
        $('.row_item').draggable({
            disabled: false,
            revert: true,
            revertDuration: 200,
        });
    }



}
