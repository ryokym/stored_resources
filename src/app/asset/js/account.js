var submitBtn = $('#submit input');
var switch_txt = $('.switch_txt');
var switch_bk = $('.switch_bk');

$(function() {
    common.mode = 'signIn';
    common.toAjax = '/app/content/login/execute.php';
})

var switchAccountMode = function() {
    var inputBucket = $('input[name="bucket"]');
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
    var afterSignAction = function(response) {
        if (response === 'enter') {
            location.href = '/app/content/main/index.php';
        } else if (response === 'create') {
            alert('Account creation succeeded');
            location.href = '/app/content/main/index.php';
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
