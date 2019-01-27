<?php

/**
* ログインチェック
*/
function checkAuthentication() {
    $userName = (isset($_COOKIE[USERNAME]))? $_COOKIE[USERNAME]: NULL;
    $authValue = (isset($_COOKIE[AUTH_VALUE]))? $_COOKIE[AUTH_VALUE]: NULL;
    if ($userName && $authValue) {
        $userLists = file_get_contents(USER_LIST);
        $authLists = file_get_contents(AUTH_LIST);
        if ((in_array($userName, explode(',', trim($userLists))) === true)
         && (in_array($authValue, explode(',', trim($authLists))) === true)) {
            return true;
        }
        return false;
    }
    return false;
}

function _autoloader($arg) {
    foreach ($arg as $dirName => $classes)
    foreach ($classes as $class) {
        spl_autoload_register(function() use($dirName, $class) {
            $includePath = DOC_ROOT.$dirName.$class.'.php';
            if (is_readable($includePath))  {
                require_once($includePath);
            } else {
                echo " ERROR! \n Due to File or Class is not found. \n Please Confirm 'AutoloaderSettings'";
                die;
            }
        });
    }
}


function autoloader(...$args) {
    try {
        $invalid = false;
        /* 常に$argsはarrayにキャストされる */
        foreach($args as $arg) {
            $argRecCount = count($arg, COUNT_RECURSIVE);
            /* 引数の形式チェック, 多次元配列なら$argCountの値は2以上 || 配列の数は1つ*/
            if (($argRecCount < 2) || (count($arg) !== 1)) $invalid = true;
        }
        if ($invalid) {
            throw new Exception(" ERROR! \n Due to Type of Argument is not ' Multidimensional Array'. \n Please Confirm 'AutoloaderSettings'");
        } else {
            array_map('_autoloader',$args);
        }
    } catch(Exception $e) {
        echo $e->getMessage();
        die;
    }
}

function getFilesData($fileName) {
    try {
        $file = $_FILES[$fileName];
        if (
            $file['size'] > 0 &&
            strlen($file['name']) <= 40 &&
            preg_match(EXCLUDED_PATTERN, $file['name']) === 1
        ) {
            return $file;
        } else {
            throw new Exception();
        }
    } catch(Exception $e) {
        die;
    }


}
