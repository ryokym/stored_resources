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
        <div id="menu">
            <div id="menu_wrapper">
                <span>Do You Chenge To Mode ? </span><div id="switcher" class="sign_up_txt switch_txt">SIGN UP</div>
            </div>
        </div>
        <div id="container">
            <div id="wrapper">
                <div id="title">
                    <h1><?= APP_NAME ?></h1>
                </div>
                <div id="form">
                    <div id="text">
                        <input type="text" name="userName" placeholder="UserName?">
                        <input type="password" name="password" placeholder="Password?">
                        <input type="text" name="bucket" placeholder="Default BucketName?">
                    </div>
                    <div id="submit">
                        <input class="sign_in_bk switch_bk" type="text" value="Enter" readonly>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="/app/asset/js/common.js"></script>
        <script src="/app/asset/js/account.js"></script>
    </body>
</html>
