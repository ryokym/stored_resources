<?php
require_once(__DIR__.'/include/initialize.inc.php');

$dir = $_POST['dir'];
$name = $_POST['name'];
$level = $_POST['level'];
$dataLists = [
    'dir' => $dir,
    'name' => $name,
    'level' => $level,
];

$isDir = is_dir(S3_PROTOCOL.$dir.'/'.$name);
if ($isDir) {
    $nextItemLists = preg_grep($exclusionPattern, scandir(S3_PROTOCOL.$dir.'/'.$name));
    $nextItemLists = array_values($nextItemLists);
    $response = json_encode($nextItemLists);
    echo $response;

} else {
    $response = '';
    $fileName = fopen($dir.'/'.$name, 'r', true);
    while (!feof($fileName)) {
        $response .= fgets($fileName);
    }
    fclose($fileName);
    echo htmlspecialchars($response);
}
