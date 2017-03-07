<?php 
    $pageName = "Adding to Cart";
    include "part_head.php";
    // include "part_header.php";
?>

<!-- connect and open the DB -->
<?php include "part_connectdb.php" ?>

<?php 
    $username = $_SESSION["user"];
    $orderId = $_SESSION["order"];
    $v_prod_id = $_POST['f_prod_id'];
    $v_prod_name = $_POST['f_prod_name'];
    $v_prod_price = $_POST['f_prod_price'];
    $v_prod_stock = $_POST['f_prod_stock'];
    $v_quantity = $_POST['f_quantity'];

    $total = $v_prod_price * $v_quantity;
    
    // check if a quantity is selected
    if (!isset($_POST['f_quantity'])){
        $_SESSION['msg'] = "Please enter a valid quantity";

        ?>
        <meta http-equiv="refresh" content="0;URL=itemDetails.php?item=" + <?php echo $v_prod_id ?> />
        <?php

    } else {
        // if we are here the data is valid and we can insert it into database
    
        // get this user's order number
        $user = mysql_query("SELECT * FROM users where (user_username='".$username."')") or die ("Retrieving information failed:".mysql_error());
        while($rows = mysql_fetch_array($user)){
            $userOrder = $rows['order_id'];
        }

        // get the order details with this specific product id
        $itemExistsCheck = mysql_query("SELECT * FROM order_details where (orderD_order_id='".$userOrder."') and (orderD_prod_id='".$v_prod_id."')") or die ("Retrieving information failed:".mysql_error());
        $num_row_exists = mysql_num_rows($itemExistsCheck);
        if ($num_row_exists > 0) {
            // if we are here, there is already some of this product in the shopping cart, so we are just adding to the quantity

            while($row_exists = mysql_fetch_array($itemExistsCheck)){
                $thisProdOrder = $row_exists['orderD_id'];
                $oldQuantity = $row_exists['orderD_quantity'];
            }

            $newQuantity = $oldQuantity + $v_quantity;

            // update data in MySQL database table
            $updateQuantity = mysql_query("UPDATE order_details SET orderD_quantity='$newQuantity' WHERE (orderD_id='".$thisProdOrder."')") or die ("Retrieving information failed:".mysql_error());

        } else {
            // if we are here, there isn't some of this product in the shopping cart, so we are adding it
            $insertOrderDetails = "INSERT INTO order_details(orderD_order_id, orderD_prod_id, orderD_quantity) VALUES ('$userOrder', '$v_prod_id', '$v_quantity')";

            // insert data into MySQL database table
            $result = mysql_query($insertOrderDetails) or die ("Insert Error:".mysql_error());
        }

        //print "Record added";

        // get the order's total
        $prevTotal = mysql_query("SELECT * FROM orders where (order_id='".$orderId."')") or die ("Retrieving information failed:".mysql_error());
        while($rowsTotal = mysql_fetch_array($prevTotal)){
            $oldTotal = $rowsTotal['order_total'];
        }

        $newTotal = $oldTotal + $total;

        // update the order's total in the MySQL database table
        $updateTotal = mysql_query("UPDATE orders SET order_total='$newTotal' WHERE (order_id='".$orderId."')") or die ("Retrieving information failed:".mysql_error());



        include "part_closedb.php";

        ?>
        <meta http-equiv="refresh" content="0;URL=catalog.php" />
        <?php

    }


 ?>

    </body>
</html>