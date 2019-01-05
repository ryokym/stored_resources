<?php
require_once(__DIR__.'/include/initialize.inc.php');

$name = $_POST['name'];
$path = $_POST['path'];
$results = array();
$dropedPathName = $path.$name;
$list = array();

if (is_dir($dropedPathName)) {
    function genDestroyList($target) {
        global $list;
        if (is_dir($target)) {
            $list[] = $target;
            foreach(glob($target.'/*') as $targets){
                genDestroyList($targets);
                exec ("rm -rf " .$targets);
            }
        }
        return $list;
    }

    if (strpos($name, APP_NAME) === false) {
        genDestroyList($dropedPathName);
        rmdir($dropedPathName);
    }
} else {
    unlink($dropedPathName);
}

echo json_encode($list);
