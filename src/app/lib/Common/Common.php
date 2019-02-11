<?php

class Common {

    public static function getDefaultRows($myBucketName) {
        $rows[] = scandir(S3_PROTOCOL.$myBucketName);
        $rows = array_values($rows[0]);
        return $rows;
    }
}
