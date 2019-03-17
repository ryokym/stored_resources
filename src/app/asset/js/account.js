/**
* account js
*
* account obujects
-------------------------------------------------------*/

window.account = {}

account = {
    userName   : '',
    password   : '',
    bucket     : '',
    forward    : '/',
    toAjax     : 'login/execute.php',
    successMsg : 'Account creation succeeded',
}

common.mode   = 'signIn';
common.toAjax = common.basePath + account.toAjax;

/* jQuery objects
-------------------------------------------------------*/

const submitBtn   = $('#submit input');
const switch_txt  = $('.switch_txt');
const switch_bk   = $('.switch_bk');
const inputBucket = $('input[name="bucket"]');
const toggleSign  = function() {
    if (common.ismode('signIn')) {
        submitBtn.val('Enter');
        switch_txt.text('SIGN UP');
        inputBucket.hide();
    } else {
        submitBtn.val('Create Account');
        switch_txt.text('SIGN IN');
        inputBucket.show();
    }
}
/* methods
-------------------------------------------------------*/

common.document.on('click', '#switcher', function() {
    common.swapAttParams.call($('.switch_bk'),'sign_up_bk', 'sign_in_bk', (function() {
        (common.ismode('signIn'))? common.setmode('signUp'): common.setmode('signIn');
    }));
    common.swapAttParams.call($('.switch_txt'),'sign_up_txt', 'sign_in_txt', toggleSign);
});

submitBtn.click(function() {
    account.userName = $('input[name ="userName"]').val();
    account.password = $('input[name ="password"]').val();
    account.bucket   = $('input[name ="bucket"]').val();

    const afterSignAction = function(response) {
        if (response === 'enter') {
            location.href = account.forward;
        } else if (response === 'create') {
            alert(account.successMsg);
            location.href = account.forward;
        } else {
            alert(response);
        }
    }

    common.postRequest({
        requestData : {
            actionType : common.mode,
            userName   : account.userName,
            password   : account.password,
            bucket     : account.bucket,
        }
    }, afterSignAction);
});
