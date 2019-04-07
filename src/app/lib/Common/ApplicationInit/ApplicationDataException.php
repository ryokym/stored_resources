<?php
namespace Common\ApplicationInit;

class ApplicationDataException
{
    protected static function fileLocationException()
    {
        throw new \Exception('system error occurred. one of the UserDataFiles is not found. please confirm "ApplicationSetting"');
    }

    protected static function unreadableFileException()
    {
        throw new \Exception('system error occurred. one of the UserDataFiles is unreadable. please confirm "ApplicationSetting"');
    }

    protected static function unwritableFileException()
    {
        throw new \Exception('system error occurred. one of the UserDataFiles is unwritable. please confirm "ApplicationSetting"');
    }
}
