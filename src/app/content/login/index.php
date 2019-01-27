<?php require_once(__DIR__.'/include/initialize.php'); ?>

<!DOCTYPE html>
<html lang="ja" dir="ltr">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/app/asset/style/css/login.min.css"/>
        <link rel="stylesheet" href="/app/asset/style/css/reset.css"/>
    </head>
    <body>
        <div id="wrapper">
            <div id="title">
                <h1><?= APP_NAME ?></h1>
            </div>
            <form action="" method="POST">
                <div id="text">
                    <input type="text" name="userName">
                    <input type="password" name="password">
                </div>
                <div id="submit">
                    <input type="submit" value="Enter">
                </div>
            </form>
        </div>
    </body>
</html>
