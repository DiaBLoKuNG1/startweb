<?php

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
    $budget = 1;
    $current_datetime = date("Y-m-d H:i:s");
    $date = date_create($current_datetime);
    $dd = date_format($date, "d");
    $mm = date_format($date, "m");
    $code = 'XS' . $dd . $mm;

    $budgets = array("เงินสดรวมขอสินเชื่อ 10 ล้านลงมา", "สามารถขอสินเชื่อ 10 ล้านขึ้นไป", "ซื้อด้วยเงินสด 10-15 ล้าน", "ซื้อด้วยเงินสด หรือ สินเชื่อ เกิน 15 ล้านขึ้นไป");
    $infos = array("ให้โทรติดต่อกลับด่วน", "ติดต่อกลับภายในอาทิตย์นี้", "สนใจส่งรายละเอียดทาง email");

    // Make data to be able to display in Thai.
    $sql = "SET NAMES 'utf8'";
    $conn->query($sql) or die('Error query: ' . mysqli_error());

    $sql = "INSERT INTO register (name, tel, email, budget, need_info, created_date)
			VALUES ('$name', '$tel', '$email', $budget, $event, '$current_datetime')";

    if (!mysqli_query($conn, $sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);

    echo "done";
    he
    die();
}catch(Exception $e){
    mysqli_rollback($conn);
}