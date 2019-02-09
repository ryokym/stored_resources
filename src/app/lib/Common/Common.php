<?php

class Common {

    public static function getLines($fName) {
        while (($line = fgets($fName)) !== false) {
            yield $line;
        }
    }

    public static function getDefaultRows($myBucketName) {
        $rows[] = scandir(S3_PROTOCOL.$myBucketName);
        $rows = array_values($rows[0]);
        return $rows;
    }
}
