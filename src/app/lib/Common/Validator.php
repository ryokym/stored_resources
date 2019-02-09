<?php

class Validator {

    public static function isValidFile($file) {
        if ($file['size'] > 0
        && strlen($file['name']) <= 40
        && preg_match(EXCLUDED_PATTERN, $file['name']) === 1)
        {
            return true;
        } else {
            return false;
        }
    }


}
