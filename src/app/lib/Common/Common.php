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
        return $_SESSION[$key];
    }

    public static function getDefaultRows($myBucketName)
    {
        $rows[] = scandir(S3_PROTOCOL.$myBucketName);
        $rows = array_values($rows[0]);
        return $rows;
    }
}
