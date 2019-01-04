<?php
include(__DIR__.'/public/STORED_RESOURCES/include/define.inc.php');
include(__DIR__.'/public/STORED_RESOURCES/include/functions.inc.php');

if (isset($_GET['logout'])) actionLogout();

$userName = (isset($_POST['userName']))? $_POST['userName']: NULL;
$password = (isset($_POST['password']))? $_POST['password']: NULL;

if (getAuthThenSetCookies($userName, $password))
    header('Location:/app/public/STORED_RESOURCES/');

?>
<!DOCTYPE html>
<html lang="ja" dir="ltr">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/app/public/STORED_RESOURCES/css/reset.css"/>
        <link rel="stylesheet" href="/app/public/STORED_RESOURCES/css/login.css"/>
    </head>
    <body>
        <div id="wrapper">
            <div id="title">
                <h1>STORED RESOURCES</h1>
            </div>
            <form action="" method="POST">
                <div id="inputs">
                    <input type="text" name="userName">
                    <input type="password" name="password">
                </div>
                <div id="enter">
                    <input id="btn" type="submit" value="Enter">
                </div>
            </form>
        </div>
    </body>
</html>
