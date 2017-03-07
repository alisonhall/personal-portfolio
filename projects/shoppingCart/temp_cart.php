<?php 
    $pageName = "Shopping Cart";
    include "part_head.php";
    include "part_header.php";
?>

<main>

    <!-- connect and open the DB -->
    <?php include "part_connectdb.php" ?>

    <?php include "part_sidebar.php" ?>

    <!-- retrieve the information -->
    <?php
        $orderId = $_SESSION["order"];

        // $orders = mysql_query("SELECT * FROM order_details where (orderD_order_id='".$orderId."')") or die ("Retrieving information failed:".mysql_error());
        $sql = "SELECT * FROM order_details where (orderD_order_id='".$orderId."')";
        $orders = $conn->query($sql);
        // $num_rows = mysql_num_rows($orders);
    ?>

    <div class="content">
        <h2>Items in Cart</h2>
        <table class="cartTable">
            
            <!-- print shopping cart table contents -->
            <?php 
                if($num_rows == 0){
                    echo "You have nothing in your cart.";
                } else {
                    echo '<tr>
                        <td>Product Name</td>
                        <td>Product Quantity</td>
                        <td>Product Price</td>
                    </tr>';

                    while($row = $orders->fetch_assoc()){
                        // $prod = mysql_query("SELECT * FROM products where (prod_id='".$row['orderD_prod_id']."')") or die ("Retrieving information failed:".mysql_error());
                        $sql2 = "SELECT * FROM products where (prod_id='".$row['orderD_prod_id']."')";
                        $prod = $conn->query($sql2);
                        while($row2 = $prod->fetch_assoc()){
                            echo '<tr>
                                    <td><a href="itemDetails.php?item='.$row['orderD_prod_id'].'">'.$row2['prod_name'].'</a></td>
                                    <td>'.$row['orderD_quantity'].'</td>
                                    <td>$'.$row2['prod_price'].'</td>
                                </tr>';
                        }
                        
                    }
                }
            ?>

        </table>
        
        <!-- shopping cart total -->
        <h3>Order Total: $<?php 
            // $total = mysql_query("SELECT * FROM orders where (order_id='".$orderId."')") or die ("Retrieving information failed:".mysql_error());
            $sql3 = "SELECT * FROM orders where (order_id='".$orderId."')";
            $total = $conn->query($sql3);
            while($totalNum = $total->fetch_assoc()){
                echo $totalNum['order_total'];
            }

         ?></h3>

         <?php include "part_closedb.php" ?>
    </div>
</main>

<?php include "part_footer.php" ?>