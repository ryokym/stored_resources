<?php

function _autoloader($arg) {
    foreach ($arg as $dirName => $classes)
    foreach ($classes as $class) {
        spl_autoload_register(function() use($dirName, $class) {
            $includePath = DOC_ROOT.$dirName.$class.'.php';
            if (is_readable($includePath))  {
                require_once($includePath);
            } else {
                throw new Exception ("system error occurred \nFile or Class is not found. \nPlease confirm 'autoloaderSettings'");
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
            throw new Exception("system error occurred \n Type of argument is not ' multidimensional array'. \nPlease confirm 'autoloaderSettings'");
        } else {
            array_map('_autoloader',$args);
        }
    } catch(Exception $e) {
        echo $e->getMessage();
        die;
    }

}
