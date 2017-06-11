<?php
$dbserver = "localhost";
$databasename = "ljjbroa123_ljjbr";
$dbuser = "ljjbroa123_ljjbr";
$dbpass = "fbuxg";

$connect = mysqli($dbserver, $dbuser, $dbpass, $dbname); // เชือมต่อฐานข้อมูล
if ($connect->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

mysqli_query("set NAMES utf8"); // กำหนดชุดอักขระ

$sql = "SELECT name, tel, email FROM MyGuests";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["name"]. " - Name: " . $row["tel"]. " " . $row["email"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();

?>