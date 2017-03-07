<nav>
	<ul>
		<!-- <li><a href="login.php">Home</a></li> -->
		<li<?php if ($pageName=="Catalog") 
echo " class=\"currentpage\""; ?>><a href="catalog.php">Catalog</a></li>
		<li<?php if ($pageName=="Shopping Cart") 
echo " class=\"currentpage\""; ?>><a href="cart.php">Shopping Cart</a></li>
		<li><a href="signOut.php">Sign Out</a></li>
		<!-- <li>Feedback</li> -->
	</ul>
</nav>