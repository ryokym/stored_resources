<?php
namespace Common;

use Aws\S3\S3Client;
use Aws\Exception\AwsException;


trait BucketChecker
{
    /*
    * This operation is useful to determine if a bucket exists and you have permission to access it.
    * @param string $bucketname
    * @param object $S3Client Aws\S3\S3Client
    * @param boolean
    * @return boolean
    */
    private function checkBucket(S3Client $S3Client, string $bucketname, $isTerminate = false)
    {
        try {
            $S3Client->HeadBucket([
                'Bucket' =>$bucketname
            ]);
        } catch(AwsException $e) {
            if ($isTerminate) {
                die('system error occurred. Could not find a valid bucket. please confirm "S3ClientSetting"');
            } else {
                return false;
            }
        }
        return true;

    }

}
