<?php

if (isset($_POST['submit'])) {
    $firstname = $_POST['first'];
    $lastname = $_POST['last'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $phone = $_POST['phone'];

    $mailTo = "lukaskennedy42@gmail.com";
    $txt = "You have received an email from ".$firstname." ".$lastname.".\n\n".$message
    $headers = "From: ".$email;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: index.php?mailsend");
}