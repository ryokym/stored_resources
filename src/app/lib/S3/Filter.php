<?php
namespace S3;

class Filter extends \Common\Common
{
    use \BucketChecker;
    use \TokenChecker;

    protected $filteredS3Client = null;
    protected $filteredBucket = null;

    /**
    * Action Upload
    */
    public static function isValidFile($file)
    {
        if ($file['size'] > self::MIN_FILE_SIZE
        && strlen($file['name']) <= self::MAX_LENGTH
        && preg_match(self::EXCLUDED_PATTERN, $file['name']) === 1) {
            return true;
        } else {
            throw new \Exception('ERROR / Uploaded files can not be accepted');
        }
    }

    /**
    * Action Change
    */
    protected function isTolerableLineCount($count)
    {
        if ($count === self::LIMIT_LINE) {
            throw new \Exception('{"result":"ERROR. It can not be displayed because it exceeds '.$count.' rows with the maximum number of lines"}');
        } else {
            return true;
        }
    }

    protected function getDisOpenFileException()
    {
        throw new \Exception('{"result":"ERROR. No such file or directory"}');
    }

    public function isAuthenticatesToken($tokenfpath, $token)
    {
        $contents = $this->getTokenList($tokenfpath);
        $iscomeup = $this->lookupToken($contents, $token);
        return ($iscomeup) ? true : false;
    }

    public function isAvailableBucket($s3Options, $bucketname)
    {
        if (!$bucketname) {
            return false;
        }
        $S3Client = $this->getS3Client($s3Options);
        $this->filteredS3Client = $S3Client;

        $isAvailable = $this->checkBucket($bucketname, $S3Client);

        if ($isAvailable) {
            $this->filteredBucket = $bucketname;
            return true;
        } else {
            return false;
        }
    }
}
