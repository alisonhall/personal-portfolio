<aside>
	<ul>
		<li><h2>Categories</h2></li>
		<?php 
			// $category = mysql_query( "SELECT * FROM categories" ) or die ("Retrieving information failed:".mysql_error());
			$sql = "SELECT * FROM categories";
			$category = $conn->query($sql);
		    // $num_rows = mysql_num_rows($category);

		    if($num_rows = 0){
		        echo "No categories.";
		    } else {
		        while($row = $category->fetch_assoc()){
		        	// Ideally should be able to catch the case for when the category is "MothersDay" and print out "Mother's Day" instead
		        	// if ($row["cat_name"] == "MothersDay"){
		        	// 	$tempCat = 'Mother&#39;s Day';
		        	// else {
		        	// 	$tempCat = $row["cat_name"];
		        	// }

		        	if ($strCat==$row["cat_name"]) {
		        		echo "<li class='currentCategory'><a href='items.php?category=".$row["cat_name"]."'>".$row["cat_name"]."</a></li>";
		        	} else {
		        		echo "<li><a href='items.php?category=".$row["cat_name"]."'>".$row["cat_name"]."</a></li>";
		        	}
		        }
		    }

		?>
	</ul>
</aside>

