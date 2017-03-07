<!-- Connecting to the MySQL Server
Before you can perform any operation on a database you must connect to the MySQL server -->

<?php
	// mysql_connect is used for opening the database
	// mysql_error is used for catching any error

	//alisonkhall.com
	$servername = "localhost";
	$username = "root";
	$password = "jainajacen";
	$dbname = "catalog";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

?>
