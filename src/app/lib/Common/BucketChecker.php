<?php
namespace Common;

use \Aws\S3\S3Client;
use Aws\Exception\UnresolvedApiException;

trait BucketChecker
{
    private function checkBucket($bucketname, $S3Client, $isTerminate = false)
    {
        if (!$S3Client->doesBucketExist($bucketname)) {
            if ($isTerminate) {
                die('system error occurred. Could not find a valid bucket. please confirm "S3ClientSetting"');
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    protected function getS3Client($s3Options)
    {
        try {
            $S3Client = new S3Client($s3Options);
            return $S3Client;
        } catch (\InvalidArgumentException $e) {
            die('system error occurred.<br/>'.$e->getMessage().'<br/>please confirm "S3ClientSetting"');
        } catch (UnresolvedApiException $e) {
            die('system error occurred.<br/>'.$e->getMessage().'<br/>please confirm "S3ClientSetting"');
        }
    }
}
