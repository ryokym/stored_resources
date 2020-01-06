<?php
namespace App\Account;

use Aws\S3\S3ClientInterface;
use Aws\Exception\AwsException;

class UserDataFilter
{
    use \App\Common\ApplicationInit\BucketCheckerTrait;

    protected $request;
    protected $error = '';
    public $account;

    public function __construct($request)
    {
        $this->request = $request;
    }

    /**
    * This class property $error is immutable
    * @return void
    */
    private function setError($error)
    {
        if (empty($this->error)) {
            $this->error = $error;
        }
    }

    /**
    * Search for exactly matching user data then return this data
    * @param  array    $accountList   = array('user' =>  $username, 'pass' => $password);
    * @param  boolean  $requireVerify = Whether hashed by PHP builtin method password_hash()
    * @param  boolean  $onlyUsername  = When the lookup target is only the username
    * @return boolean  Were there or not
    */
    public function lookupAccount(array $accountList, $requireVerify = true, $onlyUsername = false)
    {
        $inputname = $this->request->getUserName();
        if (!$onlyUsername) {
            $inputpass = $this->request->getPassword();
        }
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
                && ($requireVerify) ? password_verify($inputpass, $account['pass']) : $inputpass === $account['pass']) {
                    $this->account = $account;
                    return true;
                }
            }
        }
        return false;
    }

    /**
    * It verifies whether the entered username is already in use
    * @param array The argument $accountList is inherited to the internal method
    * @return void
    */
    public function checkRegistedName(array $accountList)
    {
        $isfind = $this->lookupAccount($accountList, false, true);
        if ($isfind) {
            $this->setError('input user name is already in use');
        }
    }

    /**
    * Check if all input values ​​are filled
    * @return boolean
    */
    public function isfillAll($required = [])
    {
        $props = [];

        if (!empty($required)) {
            $props = $this->request->getValues($required);
        } else {
            $props = $this->request->All();
        }

        foreach ($props as $prop) {
            if ($prop === '') {
                $this->setError('Please fill in all the input fields');
            }
        }
        return true;
    }

    /**
    * Verify that the correct value is set to the "Tags" property of S3
    * For security reasons, when registering a user, the user has to access Amazon S3 once using his account.
    * @param object Aws\S3\S3Client
    * @return boolean
    */
    protected function isVerifyTags(S3ClientInterface $S3Client)
    {
        $result = [];
        try {
            $result = $S3Client->getBucketTagging([
                'Bucket' => $this->request->getBucket(),
            ]);
        } catch (AwsException $e) {
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
        return false;
    }

    /**
    * Bucket Existence Confirmation
    * @param string $bucket
    * @param object Aws\S3\S3Client Instance
    * @return boolean
    */
    protected function isAvailableBucket(S3ClientInterface $S3Client, $bucket)
    {
        $result = $this->checkBucket($S3Client, $bucket);
        if ($result) {
            return true;
        } else {
            $this->setError('bucket name is invalid');
            return false;
        }
    }

    protected function isContainDot($bucket)
    {
        return (strpos($bucket, '.') === false) ? false : $this->setError('name contain "." can not be registered');
    }

    /**
    * Set an error if there is an error in the user input value
    * @return void
    */
    protected function invalidEntered()
    {
        $this->setError('username or password is invalid');
    }
}
