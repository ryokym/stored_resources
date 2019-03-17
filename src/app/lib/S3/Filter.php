<?php
namespace S3;

class Filter extends Init {

    public function __construct($bucketname, $s3Object) {
        parent::__construct($bucketname, $s3Object);
    }
    /**
    * Action Upload
    */
    public static function isValidFile($file) {
        if ($file['size'] > \Constants::MIN_FILE_SIZE
        && strlen($file['name']) <= \Constants::MAX_LENGTH
        && preg_match(\Constants::EXCLUDED_PATTERN, $file['name']) === 1)
        {
            return true;
        } else {
            throw new \Exception('ERROR / Uploaded files can not be accepted');
        }
    }

    /**
    * Action Change
    */
    protected function isTolerableLineCount($count) {
        if ($count === \Constants::LIMIT_LINE) {
            throw new \Exception('{"result":"ERROR. It can not be displayed because it exceeds '.$count.' rows with the maximum number of lines"}');
        } else {
            return true;
        }
    }

    protected function getDisOpenFileException() {
        // throw new \Exception('{"result":"ERROR. No such file or directory"}');
    }

}
