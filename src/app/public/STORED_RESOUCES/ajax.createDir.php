<?php
$newDirName = $_POST['newDirName'];
$currentDirName = $_POST['currentDirName'];
exec('mkdir -m 777 '.$currentDirName.$newDirName);
