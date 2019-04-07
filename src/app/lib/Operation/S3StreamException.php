<?php
namespace Operation;

use Common\Common;

class S3StreamException
{
    /**
    * Verify that the uploaded file has a format that this application allows
    * @param string $file global variable _FILES[$nameAttr]
    */
    public function checkUploadedfileformat($file)
    {
        if ($file['size'] <= Common::MIN_FILE_SIZE
        || strlen($file['name']) > Common::MAX_LENGTH
        || preg_match(Common::EXCLUDED_PATTERN, $file['name']) !== 1) {
            throw new \Exception('ERROR / Uploaded files can not be accepted');
        }
    }

    /**
    * Verify that the number of lines in the read file is the maximum value set by /config/applicationSetting.php
    * @param int $count
    */
    public function getResponseLimitedLine($count)
    {
        throw new \Exception('{"result":"ERROR. It can not be displayed because it exceeds '.$count.' rows with the maximum number of lines"}');
    }

    /**
    * Throw an exception if the requested file or directory does not exist
    */
    public function requestObjectNotfound($objname)
    {
        throw new \Exception('{"result":"ERROR. '.$objname.' is No such file or directory"}');
    }
}
