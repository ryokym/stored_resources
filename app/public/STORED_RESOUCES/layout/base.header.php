<!DOCTYPE html>
<html lang="ja" dir="ltr">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="./css/reset.css"/>
        <link rel="stylesheet" href="./css/common.css"/>
        <link rel="stylesheet" href="./css/header.css"/>
        <link rel="stylesheet" href="./css/column.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
        <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst"></script>
    </head>
    <body>
    <div class="wrapper">
        <div class="header">
            <div class="header-left">
                    <div class="title"><h1><?= renameProject(PROJECT_NAME) ?></h1></div>
            </div>
            <div class="menu">
                <div class="menu_item"><img id="expand" class="menu_items menu_item_icon" src="img/expand.png"></div>
                <div class="menu_item"><img id="destroy" class="menu_items menu_item_icon" src="img/destroy.png"></div>
                <div class="menu_item"><img id="download" class="menu_items menu_item_icon" src="img/download.png"></div>
                <div class="menu_item"><img id="upload" class="menu_items menu_item_icon" src="img/upload.png"></div>
                <div class="menu_item"><img id="logout" class="menu_items menu_item_icon" src="img/logout.png"></div>

            </div>
      </div>
