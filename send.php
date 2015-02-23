<?php

    function strip_all($str_to_strip) {
        $striped=strip_tags($striped);
        $striped=urldecode($str_to_strip);
        $striped=mysql_escape_string($striped);
        return $striped;
    }

    // print_r($_POST);
    $fname = $_POST["name"];
    $femail = $_POST["email"];
    $flink_to_project = $_POST["link-to-project"];
    $fdescription = $_POST["description"];
    // $femail = "whatever@what.as";


    //yb@uxdepot.ru

    if($fname != "") {
        // $message = "\nName:\n ".$fname;
        // $message .= "\n\nEmail:\n ".$femail;
        // $message .= "\n\nLink to project:\n ".$flink_to_project;
        // $message .= "\n\nDescription:\n ".$fdescription;
        $message = "\n".$fname." с адресом ".$femail." написал вам с предложением протестировать проект ".$flink_to_project."\n\n"."«".$fdescription."»";

        $footer = "\n\n\n\n\nMIME-Version: 1.0"."\r\n" ;
        $footer .= "Content-type: text/html; charset=UTF-8" ."\r\n" ;
        $footer .= "From: Wisetest <info@wisetest.ru>" . "\r\n";
        $footer .= "\nUseragent:\n=====".$_SERVER["HTTP_USER_AGENT"]."\n=====".$_SERVER["REMOTE_ADDR"];
        mail("hey@wisetest.me", "[WISETEST] Beta", $message);
        // print_r($message);
        // print_r($footer);
        echo "Sent success";
    }
?>