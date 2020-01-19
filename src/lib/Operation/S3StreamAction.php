<?php

namespace App\Operation;

use Aws\S3\S3ClientInterface;
use App\Common\Common;
use App\DataTransferInterface;

class S3StreamAction extends S3OptionFormatter
{
    private $S3Client;
    private $bucketname;
    private $stream;

    public function __construct(DataTransferInterface $request, S3ClientInterface $S3Client, $bucketname)
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

    public function initiate()
    {
        $response = S3Stream::getRootdirItems($this->bucketname);
        echo json_encode($response);
        exit;
    }

    public function change()
    {
        if (!parent::isRootDir()) {
            $path = parent::prependDS($this->request->getPath());
            $this->request->setPath($path);
        }
        $s3Path = parent::getS3PathName($this->bucketname);
        $response = [];
        if (is_dir($s3Path)) {
            $response = [
                'isFile' => false,
                'result' => scandir($s3Path)
            ];
        } else {
            $stream = new S3Stream($s3Path, 'r');
            $file = $stream->fread([$this, 'requestObjectNotfound']);
            $result = $stream->getLines($file, Common::MAX_READ_LINE, [$this, 'getResponseLimitedLine']);
            $response = [
                'isFile' => true,
                'result' => $result,
            ];
        }
        $response = json_encode($response);
        echo $response;
        exit;
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
        exit;
    }

    public function makedir()
    {
        $key = (parent::isRootDir()) ? $this->request->getName() : parent::getPathName();
        $pathName = parent::appendDS($key);
        $this->S3Client->putObject([
            'Bucket' => $this->bucketname,
            'Key'    => $pathName,
        ]);
        exit;
    }

    public function upload()
    {
        $dirName = parent::appendDS($this->request->getPath());
        $uploaded = S3Stream::getUploadedFile($this->request->getFilename(), [$this, 'checkUploadedfileformat']);
        $filename = $uploaded['name'];
        $pathName = $dirName . $filename;
        $this->S3Client->putObject([
            'Bucket' => $this->bucketname,
            'Key'    => $pathName,
            'Body'   => fopen($uploaded['tmp_name'], 'r')
        ]);
        echo $filename;
        exit;
    }

    public function edit()
    {
        if (!parent::isRootDir()) {
            $path = parent::prependDS($this->request->getPath());
            $this->request->setPath($path);
        }
        $s3Path = parent::getS3PathName($this->bucketname);
        $stream = new S3Stream($s3Path, 'w');
        $contents = $stream->fread([$this, 'requestObjectNotfound']);
        fwrite($contents, $this->request->getContent());
        echo $this->request->getContent();
    }

    public function move()
    {
        if (!parent::isRootDir()) {
            $path = parent::prependDS($this->request->getPath());
            $this->request->setPath($path);
        }
        $clipedname = $this->request->getCliped();
        $filename = pathinfo($clipedname)['basename'];
        $moveto = $this->getS3PathName($this->bucketname) . $this->prependDS($filename);
        $movefrom = $this->getS3PathName($this->bucketname, $clipedname);
        rename($movefrom, $moveto);
        echo $filename;
        exit;
    }
}
