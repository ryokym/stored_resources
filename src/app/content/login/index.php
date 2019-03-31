<?php require_once(__DIR__.'/include/initialize.php');?>

<!DOCTYPE html>
<html lang="ja" dir="ltr">
    <head>
        <meta charset="utf-8"/>
        <meta name="robots" content="none"/>
        <link rel="stylesheet" href="/app/asset/style/css/login.min.css"/>
        <link rel="stylesheet" href="/app/asset/style/css/reset.css"/>
    </head>
    <body>
        <div class="menu">
            <div class="menu_wrapper">
                <span>Do You Chenge To Mode ? </span><div id="switcher" class="sign_up_txt switch_txt">SIGN UP</div>
            </div>
        </div>
        <div class="container">
            <div class="wrapper">
                <div class="title"><h1><?= APP_NAME ?></h1></div>
                <div>
                    <input type="text" name="username" placeholder="yourname?">
                    <input type="password" name="password" placeholder="password?">
                </div>
                <div id="send">
                    <input class="sign_in_bk switch_bk" type="text" value="Enter" readonly>
                </div>
            </div>
            <div class="modal">
                <div><img id="close" src="/app/asset/img/close.svg"/></div>
                <div class="modal_key">
                    <span>Generated Key</span>
                    <div id="ukey"></div>
                </div>
                <div class="modal_info">
                    <span>Direction...</span>
                    <div>
                        <ol>Access 3s bucket from aws management console.</ol>
                        <ol>Then select "Tag" in property settings..</ol>
                        <ol>Set the above key and set arbitrary value.</ol>
                        <ol>Finally, enter the same value in the input field below.</ol>
                    </div>
                </div>
                <div>
                    <input type="text" name="bucket" placeholder="your S3bucketname?">
                    <input type="password" name="bucketval" placeholder="set value">
                </div>
                <div id="send">
                    <input class="sign_in_bk switch_bk" type="text" value="Enter" readonly>
                </div>
            </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="/app/asset/js/common.js"></script>
        <script src="/app/asset/js/account.js"></script>
    </body>
</html>
