<?php
namespace Account;

class Filter extends Init {

    /* Fetch TokenList and check if there is a token in it  */
    public static function isResisted($list, $str, $isPath = true) {
        if ($isPath) $list = file_get_contents($list);

        if (strpos($list, $str) === false) return false;
        else return true;
    }

    public static function isNotEmptyUserInputs($inputs) {
        foreach ($inputs as $input) {
            if (empty($input)) throw new \Exception('Please fill in all the input fields');
        }
        return true;
    }


    /* Validate login permission */
    public static function isAllowAutoLogin($tokenListPath, $SESToken) {
        if (empty($SESToken)) return false;

        if (self::isResisted($tokenListPath, $SESToken)) return true;
        else return false;
    }

    public static function getOslEncryptString($str, $method, $password, $iv) {
        return base64_encode(openssl_encrypt($str, $method, $password, OPENSSL_RAW_DATA, $iv));
    }

    public static function getOslDecryptStirng($encStr, $method, $password, $iv) {
        return openssl_decrypt(base64_decode($encStr), $method, $password, OPENSSL_RAW_DATA, $iv);
    }

    public static function getIvParam($length) {
        $result = '';
        for ($i = 0; $i < $length; $i++) {
            $integer = mt_rand(0, 9);
            $result .= $integer;
        }
        return $result;
    }

}
