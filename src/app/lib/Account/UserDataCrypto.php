<?php
namespace Account;

class UserDataCrypto extends UserDataFilter
{
    public function __construct($request, $pathset)
    {
        parent::__construct($request, $pathset);
    }

    /**
    * get encrypted hexadecimal number
    * @return int
    */
    public function encryptToken($minlen, $maxlen)
    {
        return bin2hex(random_bytes(mt_rand($minlen, $maxlen)));
    }

    /**
    * get encrypted string by OpenSSLApi
    * @return string
    */
    public static function encryptOSL($str, $method, $password, $iv)
    {
        return base64_encode(openssl_encrypt($str, $method, $password, OPENSSL_RAW_DATA, $iv));
    }

    /**
    * decrypt an OpenSSLApi encrypted string
    * @return string
    */
    public static function decryptOSL($encStr, $method, $password, $iv)
    {
        return openssl_decrypt(base64_decode($encStr), $method, $password, OPENSSL_RAW_DATA, $iv);
    }

    public static function getIvparam($length)
    {
        $result = '';
        for ($i = 0; $i < $length; $i++) {
            $integer = mt_rand(0, 9);
            $result .= $integer;
        }
        return $result;
    }
}
