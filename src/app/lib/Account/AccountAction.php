<?php
namespace Account;

use Common\Stream;
use Common\Common;
use Adapter\S3Adapter;

use Common\ApplicationInit\ApplicationDataValidator;

class AccountAction extends UserDataCrypto
{
    private $validator;

    public function __construct(AccountHTTPRequest $request, ApplicationDataValidator $validator)
    {
        parent::__construct($request);
        $this->validator = $validator;
        $this->validator->checkApplicationStatus(Common::STATUS, true);
    }

    public function execute($actionType)
    {
        return $this->$actionType();
    }

    /* sign in
    ------------------------------------------------------------------------------*/
    public function enter()
    {
        Common::exlog('test');
        if (parent::isfillAll(['username', 'password'])) {
            $issucceed = false;
            $stream = new Stream(Common::UD_FILE, 'r+');
            $stream->read();
            $iscomeup = parent::lookupAccount($stream->convertJson());
            if ($iscomeup) {
                $newToken = parent::encryptToken(Common::TOKEN_MIN_LENGTH, Common::TOKEN_MAX_LENGTH);
                $newContents = str_replace($this->account['token'], $newToken, $stream->contents);
                $stream->foverwrite($newContents);

                /*  Rewrite old tokens into new ones */
                $oldToken = $this->account['token'];
                $stream = new Stream(Common::TL_FILE, 'r+');
                $stream->read();
                $iscomeup = $this->validator->lookupToken($stream->contents, $oldToken);
                if ($iscomeup) {
                    $newContents = str_replace($oldToken, $newToken, $stream->contents);
                    $stream->foverwrite($newContents);
                } else {
                    $stream->fwrite($newToken.',');
                }
                $issucceed = true;
            } else {
                parent::invalidEntered();
            }

            if ($issucceed) {
                Common::setSession('token', $newToken);
                Common::setSession('bucket', parent::decryptOSL(
                    $this->account['bucket'],
                    ENC_METHOD,
                    $this->request->getPassword(),
                    $this->account['iv']
                ));
                session_regenerate_id(true);
            }
            echo ($errormsg = $this->error) ? $errormsg : $this->request->getActionType();
        }
    }

    /* sign up (open dialog)
    ------------------------------------------------------------------------------*/
    public function create()
    {
        if (parent::isfillAll(['username', 'password'])) {
            $stream = new Stream(Common::UD_FILE, 'r+');
            $stream->read();
            $list = $stream->convertJson();
            parent::checkRegistedName($list);
        }
        echo ($errormsg = $this->error) ? $errormsg : $this->request->getActionType();
    }

    /* sign up (account registration)
    ------------------------------------------------------------------------------*/
    public function verify()
    {
        $issucceed = false;
        if (parent::isfillAll()) {
            $stream = new Stream(Common::UD_FILE, 'r+');
            $stream->read();
            $list = $stream->convertJson();
            $inputs  = $this->request->All();
            $S3Client = S3Adapter::getS3Client(S3_SET_OPTIONS);
            if (parent::isAvailableBucket($S3Client, $inputs['bucket'])
            && !parent::isContainDot($inputs['bucket'])
            &&  parent::isVerifyTags($S3Client)
            ) {
                $newData = [
                    'user'  => $inputs['username'],
                    'pass'  => password_hash($inputs['password'], PASSWORD_DEFAULT),
                    'iv'    => $iv = parent::getIvparam(openssl_cipher_iv_length(ENC_METHOD)),
                    'bucket'=> parent::encryptOSL($inputs['bucket'], ENC_METHOD, $inputs['password'], $iv),
                    'token' => $newToken = parent::encryptToken(Common::TOKEN_MIN_LENGTH, Common::TOKEN_MAX_LENGTH),
                ];
                $list[] = $newData;
                $stream->foverwrite($list, 'json');
                $stream = new Stream(Common::TL_FILE, 'r+');
                $stream->read();
                $stream->fwrite($newToken.',');
                $issucceed = true;

                if ($issucceed) {
                    Common::setSession('token', $newToken);
                    Common::setSession('bucket', $this->request->getBucket());
                    $S3Client->putBucketAccelerateConfiguration([
                        'AccelerateConfiguration' => [
                            'Status' => Common::ACLR_SETTING,
                        ],
                        'Bucket' => $this->request->getBucket(),
                    ]);
                }
            }
        }
        echo ($errormsg = $this->error) ? $errormsg : $this->request->getActionType();
    }

    /* logout
    ------------------------------------------------------------------------------*/
    public static function logout()
    {
        $_SESSION = [];
        session_destroy();
    }
}