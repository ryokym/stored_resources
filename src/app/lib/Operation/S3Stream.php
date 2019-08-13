<?php
namespace App\Operation;

use App\Common\Common;
use Aws\S3\S3ClientInterface;

class S3Stream
{
    private static $S3Client;
    private $path;
    private $mode;

    public function __construct($path, $mode)
    {
        $this->path = $path;
        $this->mode = $mode;
    }

    public static function S3StreamStart(S3ClientInterface $S3Client)
    {
        self::$S3Client = $S3Client;
        $S3Client->registerStreamWrapper();
    }

    public function fread(callable $error)
    {
        return $this->openfile($this->path, $this->mode, $error);
    }

    /**
    * Calls the function $error if the specified $path is evaluated as false by the PHP built-in method "file_exists"
    * @param string $path
    * @param string $mode e.g. 'r' 'w'
    * @param callable function
    * @return S3StreamWrapper
    */
    private function openfile($path, $mode, callable $error)
    {
        if (file_exists($path)) {
            $contents = fopen($path, $mode, true);
            return $contents;
        } else {
            call_user_func($error($path));
        }
    }

    /**
    * get object list of root directory
    * @param Aws\S3\S3Client $S3Client
    * @param string $bucketname
    * @return array object list
    */
    public static function getRootdirItems(S3ClientInterface $S3Client, $bucketname)
    {
        $S3Client->registerStreamWrapper();
        $rows[] = scandir(Common::S3_PROTOCOL.$bucketname);
        $rows = array_values($rows[0]);
        return $rows;
    }

    private static function readLine($file)
    {
        while (($line = fgets($file)) !== false) {
            yield $line;
        }
    }

    /**
    * Return contents of file as string type
    * Pass the validation method to the callback function and call that if the maximum number of characters allowed is exceeded
    * @param streamFile $file
    * @param int $limit
    * @param callable function
    * @return sanitized string $response
    */
    public static function getLines($file, $limit, callable $error)
    {
        $response = '';
        $lineCnt = 0;
        foreach (self::readLine($file) as $line) {
            if ($limit !== $lineCnt) {
                $response .= $line;
                $lineCnt++;
            } else {
                fclose($file);
                call_user_func($error($lineCnt));
                return false;
            }
        }
        fclose($file);
        return htmlspecialchars($response);
    }

    /**
    * Validate file correctness with callback function $ check
    * @param string $name
    * @param callable function
    * @return array uploadedFile
    */
    public static function getUploadedFile($name, callable $check)
    {
        $files = $_FILES[$name];
        call_user_func($check, $files);
        return $files;
    }
}
