<?php 
    $pageName = "Catalog";
    include "part_head.php";
    include "part_header.php";
?>

<main>

    <!-- connect and open the DB -->
    <?php include "part_connectdb.php" ?>

    <!-- retrieve the information -->
    <?php
        $resultCat = mysql_query( "SELECT * FROM categories" ) or die ("Retrieving information failed:".mysql_error());
        $num_rows_cat = mysql_num_rows($resultCat);
        $strCat="";

        $resultItems = mysql_query("SELECT * FROM products") or die ("Retrieving information failed:".mysql_error());
        $num_rows_items = mysql_num_rows($resultItems);
    ?>

    <?php include "part_sidebar.php" ?>

    <div class="content">
        <h2>List of Categories</h2>
        <table class="categoriesTable">
            <tr>
                <td>Category Name</td>
                <td>Category Description</td>
                <td>Category Image</td>
            </tr>
            
            <!-- print categories table content -->
            <?php 
                if($num_rows_cat = 0){
                    echo "No categories.";
                } else {
                    while($row1 = mysql_fetch_array($resultCat)){
                        echo '<tr>
                                <td><a href="items.php?category='.$row1['cat_name'].'">'.$row1['cat_name'].'</a></td>
                                <td>'.$row1['cat_desc'].'</td>
                                <td><a href="items.php?category='.$row1['cat_name'].'"><img src="images/'.$row1['cat_img'].'" alt="'.$row1['cat_img'].'"/></a></td>
                            </tr>';
                    }
                }
            ?>

            <?php include "part_closedb.php" ?>

        </table>

        <h2>All Items</h2>
        <table class="allItemsTable">
            <tr>
                <td>Product Name</td>
                <td>Product Category</td>
                <td>Product Description</td>
                <td>Product Price</td>
                <td>Product Stock</td>
                <td>Product Image</td>
            </tr>
            
            <!-- print all items table content -->
            <?php 
                if($num_rows_items = 0){
                    echo "No products. Come back soon!";
                } else {
                    while($row2 = mysql_fetch_array($resultItems)){
                        echo '<tr>
                                <td><a href="itemDetails.php?item='.$row2['prod_id'].'">'.$row2['prod_name'].'</a></td>
                                <td><a href="items.php?category='.$row2['prod_cat'].'">'.$row2['prod_cat'].'</a></td>
                                <td>'.$row2['prod_desc'].'</td>
                                <td>$'.$row2['prod_price'].'</td>
                                <td>'.$row2['prod_stock'].'</td>
                                <td><a href="itemDetails.php?item='.$row2['prod_id'].'"><img src="images/'.$row2['prod_image'].'" alt="'.$row2['prod_image'].'"/></a></td>
                            </tr>';
                    }
                }
            ?>

            <?php include "part_closedb.php" ?>

        </table>
    </div>
</main>

<?php include "part_footer.php" ?>