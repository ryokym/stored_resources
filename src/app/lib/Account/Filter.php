<?php
namespace Account;

use Aws\Exception\AwsException;

class Filter extends Init {

    use \BucketChecker;
    use \TokenChecker;

    protected $request;
    protected $error = '';
    public $account;

    public function __construct($request, $pathset) {
        parent::__construct($pathset);
        $this->request = $request;
    }

    private function setError($error) {
        if (empty($this->error)) $this->error = $error;
    }

    /**
    * Search for exactly matching user data then return this data
    * @param  array    $accountList   = array('user' =>  $username, 'pass' => $password);
    * @param  boolean  $requireVerify = Whether hashed by PHP builtin method password_hash()
    * @param  boolean  $onlyUsername  = When the lookup target is only the username
    * @return boolean  Were there or not
    */
    public function lookupAccount(array $accountList, $requireVerify = true, $onlyUsername = false) {
        $inputname = $this->request->getUserName();
        if (!$onlyUsername) $inputpass = $this->request->getPassword();
        foreach ($accountList as $account) {
            // case : only username
            if ($onlyUsername) {
                if ($account['user'] === $inputname) {
                    return true;
                }
            }
            // case : username and password
            else {
                if ($account['user'] === $inputname
                && ($requireVerify)? password_verify($inputpass, $account['pass']): $inputpass === $account['pass']) {
                    $this->account = $account;
                    return true;
                }
            }
        }
        return false;
    }

    public function checkRegistedName($accountList) {
        $isfind = $this->lookupAccount($accountList, false, true);
        if ($isfind) {
            $this->setError('input user name is already in use');
        }
    }

    /**
    * Check if all input values ​​are filled
    * @return boolean
    */
    public function isfillAll() {
        $props = $this->request->getPropaties();
        foreach ($props as $prop) {
            if ($prop === '') {
                $this->setError('Please fill in all the input fields');
            }
        }
        return true;
    }

    protected function isVerifyTags($S3Client) {
        $result = [];
        try {
            $result = $S3Client->getBucketTagging([
                'Bucket' => $this->request->getBucket(),
            ]);
        } catch(AwsException $e) {
        }
        if (!empty($result["TagSet"])) {
            foreach ($result["TagSet"] as $tagset) {
                if (($tagset["Key"]  === $this->request->getBucketkey())
                &&  $tagset["Value"] === $this->request->getBucketval()) {
                    return true;
                }
            }
        }
        $this->setError('Access the S3 bucket and set the value');
    }

    protected function isAvailableBucket($bucket, $S3Client) {
        $result = $this->checkBucket($bucket, $S3Client);
        if ($result) return true;
        else $this->setError('bucket name is invalid');
    }

}
