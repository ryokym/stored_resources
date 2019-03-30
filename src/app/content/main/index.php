<?php
require_once(__DIR__.'/include/initialize.php');
require_once(__DIR__.'/layout/base.header.php');

use Common\Common;

?>
<div class="container">
    <div id="column">
        <div class="level" data-level="1" data-dir="">
            <div class="row">
                <img src="/app/asset/img/add.svg" class="open enable"/>
                <img src="/app/asset/img/close.svg" class="close"/>
            </div>
            <div class="row createNewDirRow">
                <input class="textbox" type="text"/>
            </div><?php
            foreach (Common::getDefaultRows($bucketname) as $row): ?>
                <div class="row">
                    <p class="row_item"><?= $row ?></p>
                </div><?php
            endforeach; ?>
            <div class="row" style="display: none;"><p class="row_item"></p></div>
        </div>
    </div>

    <div id="display">
        <div id="toggles">
            <div id="upload_area">
                <img id="upload_drop_area" src="/app/asset/img/dragDrop.svg"/>
            </div>
            <pre id="preview">
                <code class="prettyprint"></code>
            </pre>
            <div id="remove_area">
                <div id="remove_drop_area">
                    <img src="/app/asset/img/trush.png"/>
                </div>
            </div>
        </div>
    </div>
</div><?php
require_once(__DIR__.'/layout/base.footer.php');
