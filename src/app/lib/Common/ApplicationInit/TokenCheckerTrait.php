<?php
namespace Common\ApplicationInit;

use Common\Stream;

trait TokenCheckerTrait
{
    /**
    * lookup TokenList and check if there is a token in it
    * @param  string  $contents
    * @param  string  $token
    * @return boolean
    */
    public function lookupToken($contents, $token)
    {
        if (strpos($contents, $token) === false) {
            return false;
        }
        return true;
    }

    private function getTokenList($tokenfpath)
    {
        $stream = new Stream($tokenfpath);
        $stream->read();
        return $stream->contents;
    }

    /**
    * Search for tokens from $ tokenfpath and return the result
    * @param string $tokenfpath
    * @param string $token
    * @return boolean
    */
    public function isAuthenticatesToken($tokenfpath, $token)
    {
        $contents = self::getTokenList($tokenfpath);
        $iscomeup = self::lookupToken($contents, $token);
        return ($iscomeup) ? true : false;
    }
}
