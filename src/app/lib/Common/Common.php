<?php
namespace Common;

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
}
