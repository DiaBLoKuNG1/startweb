<?php

require 'phpmailer/PHPMailerAutoload.php';
require 'mail_config.php';

try{
    $servername = "localhost";
    $username = "ljjbroa123_ljjbr";
    $password = "fbuxg";
    $db_name = "ljjbroa123_ljjbr";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $db_name);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // This method needs PHP 5 >= 5.5.0 and MySQL 5.6+
    // mysqli_begin_transaction($conn, MYSQLI_TRANS_START_READ_WRITE);

    $name = $_POST['register_name'];
    $tel = $_POST['register_tel'];
    $email = $_POST['register_email'];
    $event = $_POST['register_event'];
    $current_datetime = date("Y-m-d H:i:s");
    $date = date_create($current_datetime);
    $events = array("MTC", "ATC");

    // Make data to be able to display in Thai.
    $sql = "SET NAMES 'utf8'";
    $conn->query($sql) or die('Error query: ' . mysqli_error());

    $sql = "INSERT INTO register_thac (name, tel, email, event, created_date)
			VALUES ('$name', '$tel', '$email', $event, '$current_datetime')";


    if (!mysqli_query($conn, $sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);

    // Send user information to staff.
    $text = "รายละเอียดผู้ลงทะเบียน\r\n";
    $text .= "ชื่อ: " . $name . "\r\n";
    $text .= "เบอร์ติดต่อ: " . $tel . "\r\n";
    $text .= "Email: " . $email . "\r\n";
    $text .= "Event ที่สนใจ: " . $events[$event - 1] . "\r\n";
    $text .= "เวลา: " . $current_datetime . "\r\n";

    // Send mail

    $mail->addAddress('info@thac.or.th', 'One');
    $mail->addAddress('social@soidea.co', 'Two');
    $mail->Subject = $name . " ลงทะเบียน THAC";
    $mail->Body = $text;
    $mail->send();

    echo "done";

    die();
}catch(Exception $e){
    mysqli_rollback($conn);
}