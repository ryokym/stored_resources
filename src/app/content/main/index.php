<?php
require_once(__DIR__.'/include/initialize.php');
require_once(__DIR__.'/layout/base.header.php');
?>
<div class="container">
    <div class="column">
        <div class="level" data-level="1" data-dir=""><?php
        $index = 0;
            foreach (getDefaultRows($myBucketName) as $row): ?>
                <div class="row <?php if ($index === 1) echo 'createNewDirRow'; ?>"><?php
                    if ($index === 0): ?>
                        <img src="/app/asset/img/add.svg" class="open show_txtbox"/>
                        <img src="/app/asset/img/close.svg" class="close"/><?php
                    elseif ($index === 1): ?>
                        <input class="textbox" type="text"/><?php
                    else: ?>
                        <p class="row_item"><?= $row ?></p><?php
                    endif; ?>
                </div><?php
                $index++;
            endforeach; ?>
            <div class="row" style="display: none;"><p class="row_item"></p></div>
        </div>
        <div class="template level" data-level="">
            <div class="row">
                <img src="/app/asset/img/add.svg" class="open show_txtbox"/>
                <img src="/app/asset/img/close.svg" class="close"/>
            </div>
            <div class="row createNewDirRow"><input class="textbox" type="text"/></div>
        </div>
    </div>

    <div class="src">
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
