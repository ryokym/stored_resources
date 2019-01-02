<?php
$uploadDir = $_POST['dir'];

$fileName = $_FILES['file']['name'];
move_uploaded_file($_FILES['file']['tmp_name'], $uploadDir.'/'.$fileName);
