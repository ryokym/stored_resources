<?php
/**
* 第一引数の値がユーザーリストに存在し、且つパスワードが正なら、cookieを発行して承認リストへ追加
* @param string $userName ユーザー入力値
* @param string $password ユーザー入力値
* @return bool
*/
function getAuthThenSetCookies($userName, $password) {
    if ((!empty($userName)) && (!empty($password))) {
        $userLists = file_get_contents(USER_LIST);
        if ((in_array($userName, explode(',', trim($userLists))) === true) && ($password === PW)) {
            $newCookieValue = rand();
            $existedAuthList = file_get_contents(AUTH_LIST);
            if (!empty($existedAuthList)) {
                $existedAuthListAry = explode(',', $existedAuthList);
                $existedAuthListAry[] = $newCookieValue;
                $setAuthValue = implode(',', $existedAuthListAry);
            } else {
                $setAuthValue = $newCookieValue;
            }
            $file = fopen(AUTH_LIST, "w");
            fwrite($file, $setAuthValue);
            fclose($file);
            if (setcookie(USERNAME, $userName, time()+WEEKS, "/") &&
            setcookie(AUTH_VALUE, $newCookieValue, time()+WEEKS, "/")) {
                return ture;
            }
        }
    }
    return false;
}

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
