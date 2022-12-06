<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "info@unicoplast.co.uk";
$subject = "Mail From website";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
$headers = "From: noreply@unicoplast.co.uk" . "\r\n" .
"CC: info@unicoplast.co.uk";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:/Contact.html");
?>