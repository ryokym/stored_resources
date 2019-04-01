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
}
