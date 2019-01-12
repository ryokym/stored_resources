<?php
require_once(__DIR__.'/include/initialize.php');


// 初期表示用にルートディレクトリのファイル、ディレクトリをセット
$defaultRows[] = preg_grep($exclusionPattern, scandir(S3_PROTOCOL.BUCKET_NAME));
$defaultRows = array_values($defaultRows[0]);

// -------------------------------------------------------//
// HTML
// -------------------------------------------------------//

include(__DIR__.'/layout/base.header.php');

?>
<div class="container">
    <div class="column">
        <div class="level" data-level="1" data-dir=""><?php
        $index = 0;
            foreach ($defaultRows as $row): ?>
                <div class="row <?php if ($index === 1) echo 'createNewDirRow'; ?>"><?php
                    if ($index === 0): ?>
                        <img src="/app/asset/img/plus10.png" class="plus_icon show_txtbox"/>
                        <img src="/app/asset/img/close.png" class="close"/><?php
                    elseif ($index === 1): ?>
                        <input class="textbox" type="text"/><?php
                    else: ?>
                        <p class="row_item"><?= $row ?></p><?php
                    endif; ?>
                </div><?php
                $index++;
            endforeach; ?>
        </div>
        <div class="template"></div>
    </div>

    <div class="src">
        <div id="toggles">
            <div id="upload_area">
                <img id="upload_drop_area" src="/app/asset/img/dragDrop.svg"/>
            </div>
            <pre id="preview">
                <code class="prettyprint"></code>
            </pre>
        </div>
        <div id="destroy_area">
            <div id="destroy_drop_area">
                <img src="/app/asset/img/trush.png"/>
            </div>
        </div>
    </div>
</div><?php

include(__DIR__.'/layout/base.footer.php');
