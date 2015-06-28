<?php

    header("Access-Control-Allow-Origin: *");

    if(isset($_GET['act']) && $_GET['act'] == "vcode")
    {
        $vcode = trim($_GET['vcode']);
        $array = array(
            "status" => ($vcode == "1234") ? 1 : 0
        );
        
        if(isset($_GET['callback']))
        {
		  echo $_GET['callback'].'('.json_encode($array).')';  
        } 
        else 
        {        
            echo json_encode($array);            
        }
    } 
    elseif(isset($_GET['act']) && $_GET['act'] == "username")
    {
        $username = trim($_GET['username']);
        $array = array(
            "status" => (in_array($username, ["pandao", "admin", "tester"])) ? 0 : (preg_match("/^[a-zA-Z]\w{4,15}$/", $username)) ? 1 : 0
        );
        
        if(isset($_GET['callback']))
        {
		  echo $_GET['callback'].'('.json_encode($array).')';  
        } 
        else 
        {        
            echo json_encode($array);            
        }
    }
    else
    {
        if(isset($_GET)) print_r($_GET);
        if(isset($_POST)) print_r($_POST);
    }
?>