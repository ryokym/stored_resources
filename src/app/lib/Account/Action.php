<?php
namespace Account;
use Common\Common;
use Account\JsonDTO;
use Account\Filter;

class Action extends Filter {

    private $JsonDTO;

    public function __construct(JsonDTO $JsonDTO, array $credentialOptions) {
        parent::__construct($credentialOptions);
        $this->JsonDTO = $JsonDTO;
    }

    public function execute($actionType) {
        return $this->$actionType();
    }

    public function signIn() {
        $input['user'] = $this->JsonDTO->getUserName();
        $input['pass'] = $this->JsonDTO->getPassword();
        $udfp = $this->USER_DATA_FILE_PATH;
        $tlfp = $this->TOKEN_LIST_FILE_PASS;
        $errorMsg = 'Error! username or password is invalid';
        if (parent::isWriteAndReadable($udfp, $tlfp)) {
            $userDataList = file_get_contents($udfp);
            $tokenList = file_get_contents($tlfp);
            $userDataLists = json_decode($userDataList, true);
            foreach ($userDataLists as $key => $account) {
                if ($account['user'] === $input['user'] && password_verify($input['pass'], $account['pass'])) {
                    $newToken = bin2hex(random_bytes(mt_rand(25, 32)));
                    $newUserDataList = str_replace($account['token'], $newToken, $userDataList);
                    if (parent::isResisted($tokenList, $account['token'], false)) {
                        $newTokenList = str_replace($account['token'], $newToken, $tokenList);
                    } else {
                        $newTokenList = $tokenList.$newToken.',';
                    }
                    file_put_contents($tlfp, $newTokenList);
                    file_put_contents($udfp, $newUserDataList);
                    $_SESSION['token'] = $newToken;
                    $_SESSION['bucket'] = $account['bucket'];
                    $errorMsg = false;
                }
            }
        }
        if ($errorMsg) echo $errorMsg;
        else echo 'enter';
    }

    public function signUp() {
        $errorMsg = 'input user name is already in use';
        $input['user'] = $this->JsonDTO->getUserName();
        $input['pass'] = $this->JsonDTO->getPassword();
        $input['bucket'] = $this->JsonDTO->getBucket();
        $udfp = $this->USER_DATA_FILE_PATH;
        $tlfp = $this->TOKEN_LIST_FILE_PASS;
        if (parent::isWriteAndReadable($udfp, $tlfp)) {
            $userDataList = file_get_contents($udfp);
            $tokenList = file_get_contents($tlfp);
            $userDataLists = json_decode($userDataList, true);
            $exist = false;
            if (!empty($userDataLists)) {
                foreach ($userDataLists as $key => $account) {
                    if ($account['user'] === $input['user']) $exist = true;
                }
            }
            if (!$exist) {
                $newToken = bin2hex(random_bytes(mt_rand(25, 32)));
                $input['pass'] = password_hash($input['pass'], PASSWORD_DEFAULT);
                $input['token'] =  $newToken;
                $userDataLists[] =  $input;
                $newTokenList = $tokenList.$newToken.',';
                file_put_contents($udfp, json_encode($userDataLists));
                file_put_contents($tlfp, $newTokenList);
                $_SESSION['token'] = $newToken;
                $_SESSION['bucket'] = $input['bucket'];
                $errorMsg = false;
            }
        }
        if ($errorMsg) echo $errorMsg;
        else echo 'create';
    }

    public static function logout() {
        session_destroy();
        header('Location:./');
    }

}
