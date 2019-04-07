<?php
namespace Account;

class FileLocationInit
{
    private $pathsetUser;
    private $pathsetToken;

    public function __construct($pathset)
    {
        $this->pathsetUser  = $pathset['user'];
        $this->pathsetToken = $pathset['token'];
    }

    public function getPathsetUser()
    {
        return $this->pathsetUser;
    }

    public function getPathsetToken()
    {
        return $this->pathsetToken;
    }
}
