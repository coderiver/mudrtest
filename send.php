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
        $header = 'MIME-Version: 1.0' . "\r\n" ;
        $header .= 'Content-type: text/html; charset=UTF-8' . "\r\n" ;
        $header .= 'From: '.$femail . "\r\n";
        $message = "\n".$fname." с адресом ".$femail." написал вам с предложением протестировать проект ".$flink_to_project."\n\n<br><br>«".$fdescription."»";
        // $message .= "\n\n\n\nUseragent:\n=====".$_SERVER["HTTP_USER_AGENT"]."\n=====".$_SERVER["REMOTE_ADDR"];

        mail("hey@wisetest.me", "[WISETEST] Beta", $message, $header);
        // print_r($header);
        // print_r($message);
        echo "Sent success";
    }
?>