<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <!-- <meta name="description" content=""> -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Create Tables</title>
        <!-- <link rel="stylesheet" href="css/style.css"> -->
        <!-- <link rel="author" href="humans.txt"> -->
    </head>
    <body>
        
        <!-- connect and hope the DB -->
    	<?php include "connectdb.php" ?>
        
		<?php 
			create user table
			mysql_query(
				"CREATE TABLE cards_users (
					user_id INT NOT NULL AUTO_INCREMENT,
					PRIMARY KEY(user_id),
					user_fname VARCHAR(50),
					user_lname VARCHAR(50),
					user_username VARCHAR(50),
					user_password VARCHAR(50),
					user_email VARCHAR(100)
				)") or die(mysql_error());

			echo " User table created";
		?>

		<?php
			//insert category data
			$sqlinsert = "INSERT INTO cards_users (user_fname, user_lname) VALUES ('Alison', 'Hall')";

            // insert data into MySQL database table
            $Result = mysql_query($sqlinsert) or die ("Insert Error:".mysql_error());

            echo " User data inserted \n";
		?>

		<?php 
			// create category table
			mysql_query(
				"CREATE TABLE category (
					cat_id INT NOT NULL AUTO_INCREMENT,
					PRIMARY KEY(cat_id),
					cat_name VARCHAR(50),
					cat_desc VARCHAR(250),
					cat_img VARCHAR(50)
				)") or die(mysql_error());

			echo " Category table created";
		?>

		<?php
			//insert category data
			$sqlinsert = "INSERT INTO category (cat_name, cat_desc, cat_img) VALUES ('Birthday', 'Birthday cards', 'birthday.jpg')";

            // insert data into MySQL database table
            $Result = mysql_query($sqlinsert) or die ("Insert Error:".mysql_error());

            echo " Category data inserted";
		?>
        
        <?php include "closedb.php" ?>

        <!-- <script src="js/main.js"></script> -->
    </body>
</html>
