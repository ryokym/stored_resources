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

    public static function exlog($param)
    {
        $now = date('Y/m/d H:i:s');
        error_log(var_export($now.' : '.$param, true), 3, parent::DEBUG_LOG_PATH);
        error_log("\n", 3, parent::DEBUG_LOG_PATH);
    }

    public static function opcacheClearLog($param)
    {
        $now = date('Y/m/d H:i:s');
        error_log(var_export($now.' : '.$param, true), 3, parent::OPCACHE_LOG_PATH);
        error_log("\n", 3, parent::OPCACHE_LOG_PATH);
    }
}
