<?php
namespace Common;

trait TokenChecker
{
    /**
    * lookup TokenList and check if there is a token in it
    * @param  string  $contents
    * @param  string  $token
    * @return boolean
    */
    protected static function lookupToken($contents, $token)
    {
        if (strpos($contents, $token) === false) {
            return false;
        }
        return true;
    }

    protected static function getTokenList($tokenfpath)
    {
        $stream = new Stream($tokenfpath);
        $contents = $stream->fread($stream->getSize());
        return $contents;
    }

    /**
    * Search for tokens from $ tokenfpath and return the result
    * @param string $tokenfpath
    * @param string $token
    * @return boolean
    */
    public static function isAuthenticatesToken($tokenfpath, $token)
    {
        $contents = self::getTokenList($tokenfpath);
        $iscomeup = self::lookupToken($contents, $token);
        return ($iscomeup) ? true : false;
    }
}
