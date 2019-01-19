<?php
/**
* ログアウト処理
*/
function actionLogout() {
    $userName = (isset($_COOKIE[USERNAME]))? $_COOKIE[USERNAME]: NULL;
    $authValue = (isset($_COOKIE[AUTH_VALUE]))? $_COOKIE[AUTH_VALUE]: NULL;
    $existedAuthList = file_get_contents(AUTH_LIST);
    $authList = explode(',', $existedAuthList);
    if ($oldAuthKey = array_search($authValue, $authList)) unset($authList[$oldAuthKey]);
    $file = fopen(AUTH_LIST, "w");
    fwrite($file, implode(',', $authList));
    fclose($file);
    setcookie(USERNAME, '', time()-60, '/');
    setcookie(AUTH_VALUE,'', time()-60, '/');
}

/**
* 初期表示
*/
function getDefaultRows() {
    $rows[] = scandir(S3_PROTOCOL.BUCKET_NAME);
    $rows = array_values($rows[0]);
    return $rows;
}
