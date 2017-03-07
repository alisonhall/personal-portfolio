<!-- Header -->
<header>
	

	<?php 
	    if ($_SESSION["user"]=="" || $_SESSION["user"]=="undefined"){
	    	?>
	    	<div class="logoContainer"><a href="login.php"><img class="logo" src="images/logo.png" alt="With Love"></a></div>
			<?php
	        include "part_navLoggedOut.php";
	    } else if ($pageName == "Sign Out") {
	    	session_destroy();
	    	?>
	    	<meta http-equiv="refresh" content="0;URL=signOut.php" />
	    	<?php
	    } else {
	    	?>
	    	<div class="logoContainer"><a href="catalog.php"><img class="logo" src="images/logo.png" alt="With Love"></a></div>
			<?php
	        include "part_navLoggedIn.php";
	    }
	?>

</header>