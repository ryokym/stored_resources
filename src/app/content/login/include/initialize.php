<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

autoloader(ACCOUNT_CLASSES);

$SESToken = ($_SESSION['token'])?? NULL;

if (filter_input(INPUT_GET, 'action') === 'logout') {
    Account\Action::logout();
} elseif (Account\Filter::isAllowAutoLogin($credentialOptions['TOKEN_LIST_FILE_PASS'], $SESToken)) {
    header('Location:/app/content/main/');
}
