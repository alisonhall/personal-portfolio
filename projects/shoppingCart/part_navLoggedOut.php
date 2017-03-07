<nav>
	<ul>
		<!-- <li><a href="login.php">Home</a></li> -->
		<li<?php if ($pageName=="Log In") 
echo " class=\"currentpage\""; ?>><a href="login.php">Sign In</a></li>
		<li<?php if ($pageName=="Registration") 
echo " class=\"currentpage\""; ?>><a href="registration.php">Register</a></li>
		<!-- <li>Feedback</li> -->
	</ul>
</nav>