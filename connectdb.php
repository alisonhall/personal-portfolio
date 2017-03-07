<!-- Connecting to the MySQL Server
Before you can perform any operation on a database you must connect to the MySQL server -->

<?php
	// mysql_connect is used for opening the database
	// mysql_error is used for catching any error
	




	//Localhost
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "portfolio";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

 



	//alisonkhall.com
	// $servername = "localhost";
	// $username = "root";
	// $password = "8c609181f2f16e49c358369b8a701caacc3169932d7dab19";
	// $dbname = "portfolio";

	// // Create connection
	// $conn = new mysqli($servername, $username, $password, $dbname);
	// // Check connection
	// if ($conn->connect_error) {
	//     die("Connection failed: " . $conn->connect_error);
	// }





	// $user = 'root';
	// $password = 'root';
	// $db = 'portfolio';
	// $host = 'localhost';
	// $port = 3306;

	// $link = mysqli_init();
	// $success = mysqli_real_connect(
	//    $link, 
	//    $host, 
	//    $user, 
	//    $password, 
	//    $db,
	//    $port
	// );

	// $link = mysql_connect("localhost", "root", "root");
	// var_dump($link);
	// $db = "portfolio";

	// if (! $link) die("Couldn't connect to MySQL");
	
	// mysql_select_db($db, $link) or die("Select DB Error: ".mysql_error());

?>