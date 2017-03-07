<?php 
    $pageName = "Sitemap";
    include "part_head.php";
    include "part_header.php";
?>

<main>
	<div class="content">
		<h2>Sitemap</h2>
		<ul>
			<li><a href="login.php">Log In</a> --> <a href="loginCheck.php">Log In Validation</a>
				<ul>
					<li>After logging in:
						<ul>
							<li><a href="catalog.php">Catalog: Categories</a></li>
							<li><a href="items.php">Items in Specific Category</a></li>
							<li><a href="itemDetails.php">Specific Item Details</a> --> <a href="addToCart.php">Add to Cart Validation</a></li>
							<li><a href="cart.php">Shopping Cart</a></li>
						</ul>
					</li>
					
					<li>After signing out:
						<ul>
							<li><a href="signOut.php">Sign Out</a></li>
						</ul>
					</li>
					
				</ul>
			</li>
			<li><a href="registration.php">Registration</a> --> <a href="validation">Registration Validation</a></li>
			<li><a href="about.php">About Us</a></li>
			<li><a href="contact.php">Contact Us</a></li>
			<li><a href="sitemap.php">Sitemap</a></li>
		</ul>
	</div>
</main>

<?php include "part_footer.php" ?>