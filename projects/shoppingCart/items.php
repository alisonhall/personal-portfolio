<?php 
    $pageName = "Items";
    include "part_head.php";
    include "part_header.php";
?>

<main>

    <!-- connect and open the DB -->
    <?php include "part_connectdb.php" ?>

    <!-- retrieve the information -->

    <?php
        $strCat = $_GET['category'];
        // Ideally should be able to catch the case for when the category is "MothersDay" and print out "Mother's Day" instead
        // if ($strCat == "MothersDay") $strCat = "Mother&#39;s Day";
        $result = mysql_query("SELECT * FROM products where (prod_cat='".$strCat."')") or die ("Retrieving information failed:".mysql_error());
        $num_rows = mysql_num_rows($result);
    ?>

    <?php include "part_sidebar.php" ?>

    <div class="content">

        <h2>Items in category "<?php print $strCat ?>"</h2>
        <table class="itemsTable">
            <tr class="tableHeader">
                <td>Product Name</td>
                <td>Product Description</td>
                <td>Product Price</td>
                <td>Product Stock</td>
                <td>Product Image</td>
            </tr>
            
            <!-- print the items in the specific category in the table -->
            <?php 
                if($num_rows = 0){
                    echo "No products. Come back soon!";
                } else {
                    while($row = mysql_fetch_array($result)){
                        echo '<tr>
                                <td><a href="itemDetails.php?item='.$row['prod_id'].'">'.$row['prod_name'].'</a></td>
                                <td>'.$row['prod_desc'].'</td>
                                <td>$'.$row['prod_price'].'</td>
                                <td>'.$row['prod_stock'].'</td>
                                <td><a href="itemDetails.php?item='.$row['prod_id'].'"><img src="images/'.$row['prod_image'].'" alt="'.$row['prod_image'].'"/></a></td>
                            </tr>';
                    }
                }
            ?>

            <?php include "part_closedb.php" ?>

        </table>

    </div>
</main>
<?php include "part_footer.php" ?>