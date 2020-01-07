<?php
namespace App\Common\ApplicationInit;

use Aws\S3\S3ClientInterface;
use Aws\Exception\AwsException;

trait BucketCheckerTrait
{
    /*
    * This operation is useful to determine if a bucket exists and you have permission to access it.
    * @param string $bucketname
    * @param object $S3Client Aws\S3\S3Client
    * @param boolean
    * @return boolean
    */
    public function checkBucket(S3ClientInterface $S3Client, string $bucketname, $isTerminate = false)
    {
        try {
            $S3Client->HeadBucket([
                'Bucket' =>$bucketname
            ]);
        } catch (AwsException $e) {
            if ($isTerminate) {
                die('system error occurred. Could not find a valid bucket. please confirm "S3ClientSetting"');
            } else {
                return false;
            }
        }
        return true;
    }
}
