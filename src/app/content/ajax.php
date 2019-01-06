<?php
require_once(__DIR__.'/include/initialize.inc.php');

$dir = $_POST['dir'];
$name = $_POST['name'];
$level = $_POST['level'];

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
