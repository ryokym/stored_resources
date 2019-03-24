<?php
namespace Common;

class Stream extends \SplFileObject {

    public function readAsJson($contents) {
        if (is_array($result = json_decode($contents, true))) {
            return $result;
        }
    }

    public function foverwrite($contents, $format = NULL) {
        if ($format === 'json') {
            $contents = json_encode($contents);
        }
        $this->_fclear();
        $size = strlen($contents);
        parent::fwrite($contents, $size);
    }

    private function _fclear() {
        parent::ftruncate(0);
        parent::rewind();
    }

}
