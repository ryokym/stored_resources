<?php
namespace Account;

class Action extends Filter {

    private $RequestDTO;

    public function __construct(RequestDTO $RequestDTO, array $credentialOptions) {
        parent::__construct($credentialOptions);
        $this->RequestDTO = $RequestDTO;
    }

    public function execute($actionType) {
        return $this->$actionType();
    }

    public function signIn() {
        $input['user'] = $this->RequestDTO->getUserName();
        $input['pass'] = $this->RequestDTO->getPassword();
        $msg = '';
        $isFound = false;
        $userDataList = file_get_contents($this->USER_DATA_FILE_PATH);
        $tokenList = file_get_contents($this->TOKEN_LIST_FILE_PASS);
        $userDataLists = json_decode($userDataList, true);
        if (is_array($userDataLists)) {
            foreach ($userDataLists as $key => $account) {
                if ($account['user'] === $input['user'] && password_verify($input['pass'], $account['pass'])) {
                    $newToken = bin2hex(random_bytes(mt_rand(\Constants::TOKEN_MIN_LENGTH, \Constants::TOKEN_MAX_LENGTH)));
                    $newUserDataList = str_replace($account['token'], $newToken, $userDataList);
                    if (parent::isResisted($tokenList, $account['token'], false)) {
                        $newTokenList = str_replace($account['token'], $newToken, $tokenList);
                    } else {
                        $newTokenList = $tokenList.$newToken.',';
                    }
                    file_put_contents($this->USER_DATA_FILE_PATH, $newUserDataList);
                    file_put_contents($this->TOKEN_LIST_FILE_PASS, $newTokenList);
                    $_SESSION['token'] = $newToken;
                    $_SESSION['bucket']  = parent::getOslDecryptStirng($account['bucket'], ENC_METHOD, $input['pass'], $account['iv']);
                    $isFound = true;
                }
            }
        }
        if (!$isFound) echo 'Error! username or password is invalid';
        else echo 'enter';
    }

    public function signUp() {
        $msg = '';
        $input['user'] = $this->RequestDTO->getUserName();
        $input['pass'] = $this->RequestDTO->getPassword();
        $input['bucket'] = $this->RequestDTO->getBucket();
        if (parent::isNotEmptyUserInputs($input)) {
            $userDataList = file_get_contents($this->USER_DATA_FILE_PATH);
            $tokenList = file_get_contents($this->TOKEN_LIST_FILE_PASS);
            $userDataLists = json_decode($userDataList, true);
            $used = false;
            if (!empty($userDataLists)) {
                foreach ($userDataLists as $key => $account) {
                    if ($account['user'] === $input['user']) $used = true;
                }
            }
            if (!$used) {
                \S3\Init::checkAvailableBucket(NULL, $input['bucket'], S3_SET_OPTIONS);
                $newToken = bin2hex(random_bytes(mt_rand(\Constants::TOKEN_MIN_LENGTH, \Constants::TOKEN_MAX_LENGTH)));
                $userBucket = $input['bucket'];
                $input['iv'] = parent::getIvParam(openssl_cipher_iv_length(ENC_METHOD));
                $input['bucket'] = parent::getOslEncryptString($input['bucket'], ENC_METHOD, $input['pass'], $input['iv']);
                $input['pass'] = password_hash($input['pass'], PASSWORD_DEFAULT);
                $input['token'] =  $newToken;
                $userDataLists[] =  $input;
                $newTokenList = $tokenList.$newToken.',';
                file_put_contents($this->USER_DATA_FILE_PATH, json_encode($userDataLists));
                file_put_contents($this->TOKEN_LIST_FILE_PASS, $newTokenList);
                $_SESSION['token'] = $newToken;
                $_SESSION['bucket'] = $userBucket;
                $errorMsg = false;
            }
            if ($used) $msg = 'input user name is already in use';
        }
        if ($msg) echo $msg;
        else echo 'create';
    }

    public static function logout() {
        session_destroy();
        header('Location:/app/content/login/');
    }

}
