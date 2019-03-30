<?php
namespace Account;

use Common\Stream;

class Action extends Crypt
{
    public function __construct(Request $request, array $pathset)
    {
        parent::__construct($request, $pathset);
    }

    public function execute($actionType)
    {
        return $this->$actionType();
    }

    public function enter()
    {
        $issucceed = false;
        $stream = new Stream(parent::getPathsetUser(), 'r+');
        $contents = $stream->fread($stream->getSize());
        $iscomeup = parent::lookupAccount($stream->readAsJson($contents));
        if ($iscomeup) {
            $newToken = parent::encryptToken(self::TOKEN_MIN_LENGTH, self::TOKEN_MAX_LENGTH);
            $newContents = str_replace($this->account['token'], $newToken, $contents);
            $stream->foverwrite($newContents);

            /*  Rewrite old tokens into new ones */
            $oldToken = $this->account['token'];
            $stream = new Stream(parent::getPathsetToken(), 'r+');
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
            self::setSession('token', $newToken);
            self::setSession('bucket', parent::decryptOSL(
                $this->account['bucket'],
                ENC_METHOD,
                $this->request->getPassword(),
                $this->account['iv']
            ));
            echo $this->request->getActionType();
        } else {
            echo 'Error! username or password is invalid';
        }
    }

    public function create()
    {
        $issucceed = false;
        $stream = new Stream(parent::getPathsetUser(), 'r+');
        $contents = $stream->fread($stream->getSize());
        $list = $stream->readAsJson($contents);
        parent::checkRegistedName($list);
        echo ($errormsg = $this->error) ? $errormsg : $this->request->getActionType();
    }

    public function verify()
    {
        $issucceed = false;
        if (parent::isfillAll()) {
            $stream = new Stream(parent::getPathsetUser(), 'r+');
            $contents = $stream->fread($stream->getSize());
            $list = $stream->readAsJson($contents);
            $inputs  = $this->request->getPropaties();
            $S3Client = parent::getS3Client(S3_SET_OPTIONS);
            if (parent::isAvailableBucket($inputs['bucket'], $S3Client)
            &&  parent::isVerifyTags($S3Client)) {
                $newData = [
                    'user'  => $inputs['userName'],
                    'pass'  => password_hash($inputs['password'], PASSWORD_DEFAULT),
                    'iv'    => $iv = parent::getIvparam(openssl_cipher_iv_length(ENC_METHOD)),
                    'bucket'=> parent::encryptOSL($inputs['bucket'], ENC_METHOD, $inputs['password'], $iv),
                    'token' => $newToken = parent::encryptToken(self::TOKEN_MIN_LENGTH, self::TOKEN_MAX_LENGTH),
                ];
                $list[] = $newData;
                $stream->foverwrite($list, 'json');

                $stream = new Stream(parent::getPathsetToken(), 'r+');
                $contents = $stream->fread($stream->getSize());
                $stream->fwrite($newToken.',');
                $issucceed = true;

                if ($issucceed) {
                    self::setSession('token', $newToken);
                    self::setSession('bucket', $this->request->getBucket());
                }
            }
        }
        echo ($errormsg = $this->error) ? $errormsg : $this->request->getActionType();
    }

    public static function logout()
    {
        session_destroy();
        header('Location:/app/content/login/');
    }
}
