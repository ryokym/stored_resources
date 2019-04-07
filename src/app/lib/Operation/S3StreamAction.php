<?php
namespace Operation;

use Common\Stream;
use Common\Common;
use Operation\S3Stream;

class S3StreamAction extends S3OptionFormatter
{
    private $S3Client;
    private $bucketname;
    private $stream;

    public function __construct($request, $S3Client, $bucketname)
    {
        parent::__construct($request);
        $this->S3Client = $S3Client;
        $this->bucketname = $bucketname;
        S3Stream::S3StreamStart($S3Client);
    }

    public function execute($actionType)
    {
        return $this->$actionType();
    }

    public function change()
    {
        if (!parent::isRootDir()) {
            $path = parent::prependDS($this->request->getDirname());
            $this->request->setDirName($path);
        }
        $s3Path = parent::getS3PathName($this->bucketname);
        $response = [];
        if (is_dir($s3Path)) {
            $response = [
                'isFile' => false,
                'result' => scandir($s3Path),
            ];
        } else {
            $stream = new S3Stream($s3Path, 'r');
            $file = $stream->fread([$this, 'requestObjectNotfound']);
            $result = $stream->getLines($file, Common::LIMIT_LINE, [$this, 'getResponseLimitedLine']);
            $response = [
                'isFile' => true,
                'result' => $result,
            ];
        }
        $response = json_encode($response);
        echo $response;
    }

    public function remove()
    {
        $prefix = (parent::isRootDir()) ? $this->request->getName() : parent::getPathName();
        $results = $this->S3Client->listObjects([
            'Bucket' => $this->bucketname,
            'Prefix' => $prefix
        ]);
        foreach ($results['Contents'] as $result) {
            $this->S3Client->deleteObject([
                'Bucket' => $this->bucketname,
                'Key' => $result['Key']
            ]);
        }
    }

    public function makedir()
    {
        $key = (parent::isRootDir()) ? $this->request->getName() : parent::getPathName();
        // 最後に/付けないとファイルになる
        $pathName = parent::appendDS($key);
        // streamWrapperではBucketは作れる(mkdir()で)がDirectoryは作れない
        // mkdir(S3_PROTOCOL.$currentDirName.$newDirName);
        $this->S3Client->putObject([
            'Bucket' => $this->bucketname,
            'Key'    => $pathName,
        ]);
    }

    public function upload()
    {
        $dirName = parent::appendDS($this->request->getDirname());
        $uploaded = S3Stream::getUploadedFile($this->request->getFilename(), [$this, 'checkUploadedfileformat']);
        $filename = $uploaded['name'];
        $pathName = $dirName.$filename;
        $this->S3Client->putObject([
            'Bucket' => $this->bucketname,
            'Key'    => $pathName,
            'Body'   => fopen($uploaded['tmp_name'], 'r')
        ]);
        echo $filename;
    }

}
