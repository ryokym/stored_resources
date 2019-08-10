import $ from 'jquery';
import common from './common.js';

/**
* account js
*
* object literal
-------------------------------------------------------*/

window.account = {}
export default account = {
    duration   : 400,
    forward    : '/',
    toAjax     : 'login/execute.php',
    successMsg : 'Account creation succeeded',
    modeoptions: ['enter', 'create'],
    signtxt    : ['SIGN IN', 'SIGN UP'],
    btncolor   : ['sign_up_bk', 'sign_in_bk'],
    switchtxt  : ['sign_up_txt', 'sign_in_txt'],
    store : {
        sendtxt : '',
        signtxt : '',
    },
    inputnames : [
        'username',
        'password',
        'bucket',
        'bucketkey',
        'bucketval',
    ],
    openmodal  : function() {
        common.setmode('verify');
        $wrapper.hide().promise().done(function() {
            $modal.fadeIn(account.duration).css({'display': 'flex'});
            $menu.slideUp(account.duration);
            const ukey = common.ukey()
            $ukey.text(ukey)
                 .next('input').val(ukey);
        })
    }
}

/* jQuery object
-------------------------------------------------------*/

const $menu      = $('.menu');
const $wrapper   = $('.wrapper');
const $modal     = $('.modal');
const $ukey      = $('#ukey');
const $close     = $('#close');
const $send      = $('#send input');
const $switchtxt = $('.switch_txt');
const $btncolor  = $('.btn_color');

/* initialize
-------------------------------------------------------*/

common.mode   = 'enter';
common.toAjax = common.basePath + account.toAjax;

/*-----------------------------------------------------*/

common.document.on('click', '#switcher', function() {
    common.rotateClass($btncolor, account.btncolor);
    common.rotateClass($switchtxt, account.switchtxt);
    common.rotate(common.mode, account.modeoptions, function(nextmode){common.setmode(nextmode)});
    common.swapValue.call($send, 'val', account.store.sendtxt, account.modeoptions);
    common.swapValue.call($switchtxt, 'text', account.store.signtxt, account.signtxt);
});

$close.click(function() {
    $menu.slideDown(account.duration);
    $modal.fadeOut(account.duration).promise().done(function() {
        $wrapper.show();
        common.setmode('create');
    });
});

$send.click(function() {
    const done = function(response) {
        if (response === 'enter') {
            location.href = account.forward;
        }
        else if (response === 'create') {
            account.openmodal();
        }
        else if (response === 'verify') {
            alert(account.successMsg);
            location.href = account.forward;
        }
        else {
            alert(response);
        }
    }
    const methods = { actionType : common.mode }
    const values = common.getFormElmsValue(account.inputnames);
    const requestData = $.extend({}, methods, values);
    common.postRequest({requestData}, done);
});
