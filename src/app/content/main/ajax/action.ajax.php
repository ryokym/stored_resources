<?php
require_once(dirname(__DIR__).'/include/initialize.php');

$action = $_POST['action'];

switch($action) {
    case 'change':
    $name = $_POST['targetName'];
    $dir = $_POST['currentDirName'];
    $level = $_POST['currentLevel'];

    if ($level > 1) $dir = '/'.$dir;

    $isDir = is_dir(S3_PROTOCOL.BUCKET_NAME.$dir.'/'.$name);
    if ($isDir) {
        $nextItemLists = preg_grep($exclusionPattern, scandir(S3_PROTOCOL.BUCKET_NAME.$dir.'/'.$name));
        $nextItemLists = array_values($nextItemLists);
        $response = json_encode($nextItemLists);
        echo $response;

    } else {
        $response = '';
        $fileName = fopen(S3_PROTOCOL.BUCKET_NAME.$dir.'/'.$name, 'r', true);
        while (!feof($fileName)) {
            $response .= fgets($fileName);
        }
        fclose($fileName);
        echo htmlspecialchars($response);
    }
    break;

    case 'remove':
    $name = $_POST['targetName'];
    $path = $_POST['currentDirName'];
    $results = array();
    $dropedPathName = $path.'/'.$name;;
    $list = array();

    $results = $s3->listObjects([
        'Bucket' => BUCKET_NAME,
        'Prefix' => $dropedPathName
    ]);

    foreach ($results['Contents'] as $result) {
        $s3->deleteObject([
            'Bucket' => BUCKET_NAME,
            'Key' => $result['Key']
        ]);
    }
    break;

    case 'makedir':
    $targetName = $_POST['targetName'];
    $currentDirName = $_POST['currentDirName'];
    // streamWrapperではBucketは作れる(mkdir()で)がDirectoryは作れない
    // mkdir(S3_PROTOCOL.$currentDirName.$newDirName);
    $s3->putObject([
        'Bucket' => BUCKET_NAME,
        // 最後に/付けないとファイルになる
        'Key'    => $currentDirName.'/'.$targetName.'/',
    ]);
    break;

    case 'upload':
    $uploadDir = $_POST['currentDirName'];
    $fileName = $_FILES['file']['name'];
    $tmpFile = $_FILES['file']['tmp_name'];

    if (!empty($uploadDir)) $uploadDir.= '/';
    try {
        $s3->putObject(array(
            'Bucket' => BUCKET_NAME,
            'Key'    => $uploadDir.$fileName,
            'Body'   => fopen($tmpFile, 'r')
        ));
    } catch (S3Exception $e) {
        echo $e->getMessage() . PHP_EOL;
    }
    break;
}
