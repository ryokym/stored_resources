/**
* account js
*
* object literal
-------------------------------------------------------*/

window.account = {}
account = {
    sendtxt    : '',
    signtxt    : '',
    duration   : 400,
    forward    : '/',
    toAjax     : 'login/execute.php',
    successMsg : 'Account creation succeeded',
    openmodal  : function() {
        common.setmode('verify');
        $wrapper.hide().promise().done(function() {
            $modal.fadeIn(account.duration).css({'display': 'flex'});
            $menu.slideUp(account.duration);
            $ukey.text(common.ukey());
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
const $switchbk  = $('.switch_bk');
const $tagName   = $('input[name ="userName"]');
const $tagPass   = $('input[name ="password"]');
const $tagBucket = $('input[name ="bucket"]');
const $tagVal    = $('input[name ="bucketval"]');

/* initialize
-------------------------------------------------------*/

common.mode   = 'enter';
common.toAjax = common.basePath + account.toAjax;

/*-----------------------------------------------------*/

common.document.on('click', '#switcher', function() {
    common.swapAttAryParams.call([$switchbk, $switchtxt],
        ['sign_up_bk', 'sign_up_txt'],
        ['sign_in_bk', 'sign_in_txt'],
        function() {
            common.togglemode('enter', 'create');
            common.swapfn.call($send, 'valfn', account.sendtxt, ['enter', 'create']);
            common.swapfn.call($switchtxt, 'txtfn', account.signtxt, ['SIGN IN', 'SIGN UP']);
        }
    )
});

$close.click(function() {
    $menu.slideDown(account.duration);
    $modal.fadeOut(account.duration).promise().done(function() {
        $wrapper.show();
        common.setmode('create');
    });
});

$send.click(function() {
    const afterSignAction = function(response) {
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
    common.postRequest({
        requestData : {
            actionType : common.mode,
            userName   : $tagName.val(),
            password   : $tagPass.val(),
            bucket     : $tagBucket.val(),
            bucketkey  : $ukey.text(),
            bucketval  : $tagVal.val(),
        }
    }, afterSignAction);
});
