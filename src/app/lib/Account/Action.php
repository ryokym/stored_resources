<?php
namespace Account;

class Action extends Crypt {

    public function __construct(RequestDTO $RequestDTO, array $pathset) {
        parent::__construct($RequestDTO, $pathset);
    }

    public function execute($actionType) {
        return $this->$actionType();
    }

    public function signIn() {

        $issucceed = false;
        $stream = new \Stream(parent::getPathsetUser(), 'r+');
        $contents = $stream->fread($stream->getSize());
        $iscomeup = parent::lookupAccount($stream->readAsJson($contents));
        if ($iscomeup) {
            $newToken = parent::encryptToken(\Constants::TOKEN_MIN_LENGTH, \Constants::TOKEN_MAX_LENGTH);
            $newContents = str_replace($this->account['token'], $newToken, $contents);
            $stream->foverwrite($newContents);

            /*  Rewrite old tokens into new ones */
            $oldToken = $this->account['token'];
            $stream = new \Stream(parent::getPathsetToken(), 'r+');
            $contents = $stream->fread($stream->getSize());
            $iscomeup = parent::lookupToken($contents, $oldToken);
            if ($iscomeup) {
                $newContents = str_replace($oldToken, $newToken, $contents);
                $stream->foverwrite($newContents);
            } else {
                $stream->fwrite($newToken.',');
            }
            $issucceed = true;
        }

        if ($issucceed) {
            \Common::setSession('token', $newToken);
            \Common::setSession('bucket', parent::decryptOSL(
                $this->account['bucket'],
                ENC_METHOD,
                $this->RequestDTO->getPassword(),
                $this->account['iv']));
                echo 'enter';
        } else {
            echo 'Error! username or password is invalid';
        }
    }

    public function signUp() {

        $issucceed = false;
        if (parent::isfillAll()) {
            $stream = new \Stream(parent::getPathsetUser(), 'r+');
            $contents = $stream->fread($stream->getSize());
            $list = $stream->readAsJson($contents);
            $iscomeup = parent::lookupAccount($list);
            if (!$iscomeup) {
                $inputs  = $this->RequestDTO->getPropaties();
                \S3\Init::checkAvailableBucket(NULL, $inputs['bucket'], S3_SET_OPTIONS);
                $newData = [
                    'user'  => $inputs['userName'],
                    'pass'  => password_hash($inputs['password'], PASSWORD_DEFAULT),
                    'iv'    => $iv = parent::getIvparam(openssl_cipher_iv_length(ENC_METHOD)),
                    'bucket'=> parent::encryptOSL($inputs['bucket'], ENC_METHOD, $inputs['password'], $iv),
                    'token' => $newToken = parent::encryptToken(\Constants::TOKEN_MIN_LENGTH, \Constants::TOKEN_MAX_LENGTH),
                ];
                $list[] = $newData;
                $stream->foverwrite($list, 'json');

                $stream = new \Stream(parent::getPathsetToken(), 'r+');
                $contents = $stream->fread($stream->getSize());
                $stream->fwrite($newToken.',');
                $issucceed = true;
            } else {
                echo 'input user name is already in use';
            }

            if ($issucceed) {
                \Common::setSession('token', $newToken);
                \Common::setSession('bucket', $this->RequestDTO->getBucket());
                echo 'create';
            }
        }
    }

    public static function logout() {
        session_destroy();
        header('Location:/app/content/login/');
    }

}
