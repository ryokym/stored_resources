<?php
namespace App\Common;

class Common extends Constants
{
    public static function setSession($key, $param)
    {
        $_SESSION[$key] = $param;
    }

    public static function getSession($key)
    {
        return ($_SESSION[$key])?? null;
    }

    public static function initSession($key)
    {
        unset($_SESSION[$key]);
    }

    public static function exlog($param)
    {
        $fname = $_SERVER["DOCUMENT_ROOT"]."/log/debug.log";
        $now = new \DateTime();
        $param = mb_convert_encoding($param, 'UTF-8');
        $strings = [
            "[".$now->format('Y-m-d H:i:s')."]",
            var_export($param, true),
            "-------------",
        ];
        $handle = fopen($fname, 'a+');
        $strings = @implode("\n", $strings);
        fwrite($handle, $strings."\n");
        fclose($handle);
    }
}
