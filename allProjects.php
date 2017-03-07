<?php 
	$pageName = "All Projects";
	include "header.php";

	$firstGradient = "transparentWhiteGradient";
	$gradients = ["greenBlueGradient", "orangeYellowGradient", "pinkPurpleGradient", "greenYellowGradient", "purpleBlueGradient"];
	$lastGradient = "redPinkGradient";
?>

<div id="wrapper">
<!-- 	<section id="introductionImg" class="clearfix">
		<div id="introductionGradient" class="transparentWhiteGradient clearfix">
			<div id="introduction">
				<h1>Alison K. Hall</h1>
				<h2>I am a <span id="js-rotating">Web Designer, Web Developer</span>.</h2>
				<p>Hi! Welcome to my portfolio website!</p>
				<p>While I am still in school at Humber College, I can freelance on smaller projects. I am also currently looking for summer employment. If you're interested in contacting me, please email me at <a href="mailto:alison@alisonkhall.com">alison@alisonkhall.com</a>.</p>
			</div>
		</div>
	</section> -->
	<section id="content">

	<!-- connect and open the DB -->

	<?php include "connectdb.php"; ?>

	
	<!-- retrieve the information -->

	<?php
		$sql = "SELECT * FROM projects ORDER BY ProjectDate DESC";
		$result = $conn->query($sql);

		include "projectDetails.php";
	?>

	
	<!-- <section id="allProjects" class="redPinkGradient">
		<section>
			<p>See all of my projects <a href="allProjects.php">here</a> .</p>
		</section>
	</section> -->
</div>

<?php
	include "closedb.php";

	include "footer.php";
?>