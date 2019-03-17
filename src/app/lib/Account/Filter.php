<?php
namespace Account;

class Filter extends Init {

    protected $RequestDTO;
    public $account;

    public function __construct($RequestDTO, $pathset) {
        parent::__construct($pathset);
        $this->RequestDTO = $RequestDTO;
    }

    /**
    * Search for exactly matching user data then return this data
    * @param  array    $accountList   = array('user' =>  $username, 'pass' => $password);
    * @param  boolean  $requireVerify = Whether hashed by PHP builtin method password_hash()
    * @param  boolean  $onlyUsername  = When the lookup target is only the username
    * @return boolean  Were there or not
    */
    public function lookupAccount(array $accountList, $requireVerify = true, $onlyUsername = false) {
        $inputname = $this->RequestDTO->getUserName();
        if (!$onlyUsername) $inputpass = $this->RequestDTO->getPassword();
        foreach ($accountList as $account) {
            // case : only username
            if (($onlyUsername) && ($account['user'] === $inputname)) {
                return true;
            }
            // case : username and password
            if ($account['user'] === $inputname
            && ($requireVerify)? password_verify($inputpass, $account['pass']): $inputpass === $account['pass']) {
                $this->account = $account;
                return true;
            }
        }
        return false;
    }

    /**
    * lookup TokenList and check if there is a token in it
    * @param  string  $contents
    * @param  string  $token
    * @return boolean
    */
    public static function lookupToken($contents, $token) {
        if (strpos($contents, $token) === false) return false;
        return true;
    }

    /**
    * Check if all input values ​​are filled
    * @return boolean
    */
    public function isfillAll() {
        $props = $this->RequestDTO->getPropaties();
        foreach ($props as $prop) {
            if (empty($prop)) throw new \Exception('Please fill in all the input fields');
        }
        return true;
    }

    /* Validate login permission */
    public static function isAllowAutoLogin($tokenListPath, $SESToken) {
        if (empty($SESToken)) return false;

        if (self::isResisted($tokenListPath, $SESToken)) return true;
        else return false;
    }



}
