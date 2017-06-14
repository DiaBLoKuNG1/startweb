<?php

$mail = new PHPMailer;

$mail->isSMTP();
$mail->Host = "mail.oasishuahinvilla.com";
$mail->SMTPAuth = true;
$mail->Username = 'no-reply@oasishuahinvilla.com';
$mail->Password = 'JVNCy3EUTL';
$mail->SMTPAutoTLS = false;
$mail->setFrom('no-reply@oasishuahinvilla.com');
$mail->CharSet = 'UTF-8';

$to = array('info@area59.in.th', 'social@soidea.co', 'diablokung1@gmail.com') ;