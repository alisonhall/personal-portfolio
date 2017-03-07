<?php 
    $pageName = "Log In Validation";
    include "part_head.php";
    // include "part_header.php";
?>

<!-- connect and open the DB -->
<?php include "part_connectdb.php" ?>

<?php 
    
    if (!isset($_POST['f_username'], $_POST['f_password'])){
        // if we are here, the login failed
        $_SESSION['msg'] = "Please enter a valid username and password";

    } else {
        // if we are here the data is valid and we can insert it into database
        $strlogin = filter_var($_POST['f_username'], FILTER_SANITIZE_STRING);
        $strPwd = filter_var($_POST['f_password'], FILTER_SANITIZE_STRING);

        // Retrieve username and password from database according to user's input
        $stmt = mysql_query("SELECT * FROM users where (user_username='".$strlogin."') and (user_password= '".$strPwd."')");

        // Check username and password match
        $num_rows = mysql_num_rows($stmt);

        // Get more user info
        while($row = mysql_fetch_array($stmt)){
                    $fname = $row['user_fname'];
                    $lname = $row['user_lname'];
                    $order = $row['order_id'];
                }

        if ($num_rows != 1) {
            // session data for if the login failed
            $_SESSION["user"]="";
            $_SESSION["msg"]="login failed";
            $_SESSION["fname"] = "";
            $_SESSION["lname"] = "";
            $_SESSION["order"] = "";

            //header('Location: index.php?msg="Login failed"');'
            ?>
            <meta http-equiv="refresh" content="0;URL=login.php?msg='Login failed'" />
            <?php

        } else {
            // session data for if the login succeeded
            $_SESSION["user"]=$strlogin;
            $_SESSION["msg"]="";
            $_SESSION["fname"] = $fname;
            $_SESSION["lname"] = $lname;
            $_SESSION["order"] = $order;

            ?>
            <meta http-equiv="refresh" content="0;URL=catalog.php" />
            <?php
        }

    }

    include "part_closedb.php";

 ?>

    </body>
</html>