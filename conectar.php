<?php
$host="localhost";
$userBase="root";
$passwordBase="";

try {
	$dbh = new PDO('mysql:host=' . $host . ';dbname=electro_base;charset=utf8',$userBase , $passwordBase);
} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}
?>