<?php 
    $pageName = "Registration Validation";
    include "part_head.php";
?>

<!-- connect and open the DB -->
<?php include "part_connectdb.php" ?>

<?php
    $v_fname = $_POST['f_fname'];
    $v_lname = $_POST['f_lname'];
    $v_username = $_POST['f_username'];
    $v_password = $_POST['f_password'];
    $v_email = $_POST['f_email'];

    // get the data to check for a duplicate username
    // $duplicateCheck = mysql_query("SELECT * FROM users where (user_username='".$v_username."')") or die ("Retrieving information failed:".mysql_error());
    $sql = "SELECT * FROM users where (user_username='".$v_username."')";
    $duplicateCheck = $conn->query($sql);

    // $num_rows = mysql_num_rows($duplicateCheck);
    if ($num_rows != 0) {
        // if we are here, the registration failed
        $_SESSION["user"]="";
        $_SESSION["msg"]="registration failed";
        // mysql_close($link);

        //header('Location: index.php?msg="Registration failed"');'
        ?>
        <meta http-equiv="refresh" content="0;URL=registration.php?msg='This username already exists. Please choose another.'" />
        <?php


    } else {
        // if we are here, the login succeeded
        $_SESSION["user"]=$v_username;
        $_SESSION["msg"]="";

        // insert a new order for this specific user into the MySQL database table
        $insertOrder = "INSERT INTO orders(order_user) VALUES ('$v_username')";
        // $result1 = mysql_query($insertOrder) or die ("Insert Error:".mysql_error());
        // $sql2 = "SELECT * FROM users where (user_username='".$strlogin."') and (user_password= '".$strPwd."')";
        $result1 = $conn->query($insertOrder);
        $orderId = mysql_insert_id();

        // insert a new user into the MySQL database table
        $sqlinsert = "INSERT INTO users(user_fname, user_lname, user_username, user_password, user_email, order_id) VALUES ('$v_fname', '$v_lname', '$v_username', '$v_password', '$v_email', '$orderId')";

        // insert data into MySQL database table
        // $result2 = mysql_query($sqlinsert) or die ("Insert Error:".mysql_error());
        // $sql = "SELECT * FROM users where (user_username='".$strlogin."') and (user_password= '".$strPwd."')";
        $result2 = $conn->query($sqlinsert);

        print "Record added";

        // mysql_close($link);

        ?>
        <meta http-equiv="refresh" content="0;URL=login.php" />
        <?php
    }

    
?>

<?php include "part_closedb.php" ?>

<a href="login.php">Log in</a>

    </body>
</html>