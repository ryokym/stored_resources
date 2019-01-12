<?php

/**
* ログインチェック
*/
function checkAuthentication() {
    $userName = (isset($_COOKIE[USERNAME]))? $_COOKIE[USERNAME]: NULL;
    $authValue = (isset($_COOKIE[AUTH_VALUE]))? $_COOKIE[AUTH_VALUE]: NULL;
    if ($userName && $authValue) {
        $userLists = file_get_contents(USER_LIST);
        $authLists = file_get_contents(AUTH_LIST);
        if ((in_array($userName, explode(',', trim($userLists))) === true)
         && (in_array($authValue, explode(',', trim($authLists))) === true)) {
            return true;
        }
        return false;
    }
    return false;
}
