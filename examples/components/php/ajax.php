<?php
    header("Content-Type:text/html; charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    
    sleep(2);

    echo "ajax返回的内容 " . date("Y-m-d H:i:s");

    echo "<pre>";
    print_r($_GET);
    print_r($_POST);
    echo "</pre>";