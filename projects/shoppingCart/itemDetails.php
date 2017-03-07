<?php 
    $pageName = "Item Details";
    include "part_head.php";
    include "part_header.php";
?>

<main>

    <!-- connect and open the DB -->
    <?php include "part_connectdb.php" ?>

    <!-- retrieve the information -->
    <?php
        $strCat = "";
        $strItemId = $_GET['item'];
        $result = mysql_query("SELECT * FROM products where (prod_id='".$strItemId."')") or die ("Retrieving information failed:".mysql_error());
        $resultName = mysql_query("SELECT * FROM products where (prod_id='".$strItemId."')") or die ("Retrieving information failed:".mysql_error());
        $num_rows = mysql_num_rows($result);
        while($name = mysql_fetch_array($resultName)){
            $item_name = $name['prod_name'];
        }
    ?>

    <?php include "part_sidebar.php" ?>

    <div class="content">
        <h2>Details for "<?php echo $item_name ?>"</h2>
        <table class="itemDetailsTable">
            <tr class="itemHeader">
                <td>Product Name</td>
                <td>Product Category</td>
                <td>Product Description</td>
                <td>Product Price</td>
                <td>Product Stock</td>
                <td>Product Image</td>
            </tr>
            
            <!-- print all item details table content -->
            <?php 
                if($num_rows = 0){
                    echo "No products. Come back soon!";
                } else {
                    while($row = mysql_fetch_array($result)){
                        $prodId = $row['prod_id'];
                        $prodName = $row['prod_name'];
                        $prodPrice = $row['prod_price'];
                        $prodStock = $row['prod_stock'];
                        echo '<tr>
                                <td>'.$prodName.'</td>
                                <td><a href="items.php?category='.$row['prod_cat'].'">'.$row['prod_cat'].'</a></td>
                                <td>'.$row['prod_desc'].'</td>
                                <td>$'.$prodPrice.'</td>
                                <td>'.$prodStock.'</td>
                                <td><img src="images/'.$row['prod_image'].'" alt="'.$row['prod_image'].'"/></td>
                            </tr>';
                    }
                }
            ?>

            <?php include "part_closedb.php" ?>

        </table>

        <form action="addToCart.php" method="POST" class="addToCart">
            <input type="hidden" name="f_prod_id" value=<?php echo "$prodId" ?>>
            <input type="hidden" name="f_prod_name" value="<?php echo "$prodName" ?>">
            <input type="hidden" name="f_prod_price" value=<?php echo "$prodPrice" ?>>
            <input type="hidden" name="f_prod_stock" value=<?php echo "$prodStock" ?>>
            Quantity: <input type="text" name="f_quantity" id="f_quantity" value="1">
            <input type="submit" value="Add to Cart" class="button">
        </form>

    </div>
</main>

<?php include "part_footer.php" ?>