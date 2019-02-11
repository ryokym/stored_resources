const submitBtn = $('#submit input');
const switch_txt = $('.switch_txt');
const switch_bk = $('.switch_bk');
const toUrl = '/app/content/main/index.php';
const successMsg = 'Account creation succeeded';

$(function() {
    common.mode = 'signIn';
    common.toAjax = '/app/content/login/execute.php';
})

const switchAccountMode = function() {
    const inputBucket = $('input[name="bucket"]');
    if (submitBtn.hasClass('sign_in_bk')) {
        common.mode = 'signIn';
        submitBtn.val('Enter');
        switch_txt.text('SIGN UP');
        inputBucket.hide();
    } else {
        common.mode = 'signUp';
        submitBtn.val('Create Account');
        switch_txt.text('SIGN IN');
        inputBucket.show();
    }
}

common.document.on('click', '#switcher', function() {
    common.classSwitcher.call($('.switch_bk'),'sign_up_bk', 'sign_in_bk', switchAccountMode);
    common.classSwitcher.call($('.switch_txt'),'sign_up_txt', 'sign_in_txt');
});

submitBtn.click(function() {
    common.userName = $('input[name="userName"]').val();
    common.password = $('input[name="password"]').val();
    common.bucket = $('input[name="bucket"]').val();
    const afterSignAction = function(response) {
        if (response === 'enter') {
            location.href = toUrl;
        } else if (response === 'create') {
            alert(successMsg);
            location.href = toUrl;
        } else {
            alert(response);
        }
    }

    common.postRequest({
        requestData: {
            actionType: common.mode,
            userName: common.userName,
            password: common.password,
            bucket: common.bucket,
        }
    }, afterSignAction);
})
