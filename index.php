<?php 
	$pageName = "Home";
	include "header.php";
?>

<div id="wrapper">
	<section id="introduction" class="mainSection angledPicture bottomAngle bottomPictureAngle darkBackground">
		<div class="backgroundImage">
			<div class="content">
				<h1>Alison K. Hall</h1>
				<h3>I am a Front-End Web Developer,</h3>
				<h4>with an appreciation of design.</h4>
			</div>
		</div>
	</section>
		<!-- <h2>I am a <span id="js-rotating">Web Designer, Web Developer</span>.</h2>
		<a href="mailto:alison@alisonkhall.com">alison@alisonkhall.com</a> -->

	<section id="what" class="mainSection lightBackground">
		<div class="content">
			<h2>What I Do</h2>
		</div>
	</section>

	<section id="work" class="mainSection angledSection doubleAngle mediumBackground">
		<div class="content">
			<h2>Work</h2>

			<!-- connect and open the DB -->

			<?php include "connectdb.php"; ?>

			
			<!-- retrieve the information -->

			<?php
				$sql = "SELECT * FROM projects WHERE MainVisibility > 0 ORDER BY MainVisibility ASC";
				$result = $conn->query($sql);

				include "project.php";
			?>
		</div>
	</section>

	<section id="about" class="mainSection lightBackground">
		<div class="content">
			<h2>About</h2>
			<p>Hi! I am a Front-End Web Designer and Developer graduating from the three year Web Design & Interactive Media program at Humber College. While I was still in school, I also freelanced on smaller projects and full-time during the summer.</p>
			<p>I love the challenge of creating a solution to specific problems or enhancing a product to be more efficient and easier to use. Web development enables me to do this. While I can do web desgn, I prefer to work with a partner to bring their designs to life.</p>
			<p>During my spare time, I enjoy making personalized jewellery and greeting cards, exploring new features of technology, as well as reading.</p>
			<p>I have experience as a freelancer, working in a large corporation, and in an agency. I prefer to know what the client wants and is looking for before even starting. I am willing to work outside of my comfort zone in order to learn something new.</p>
		</div>
	</section>

	<section id="contact" class="mainSection angledSection topAngle darkBackground">
		<div class="content">
			<h2>Contact</h2>
			<ul class="contact-info">
				<li class="phone"><i class="fa fa-phone"></i><p>Phone: </p><a href="tel:905-599-9030">905-599-9030</a></li>
				<li class="mail"><i class="fa fa-envelope"></i><p>Email: </p><a href="mailto:alison@alisonkhall.com">alison@alisonkhall.com</a></li>
				<li class="linkedin"><i class="fa fa-linkedin"></i><p>LinkedIn: </p><a href="http://ca.linkedin.com/in/alisonhall5">ca.linkedin.com/in/alisonkhall</a></li>
			</ul>
		</div>
	</section>
</div>

<?php
	include "closedb.php";

	include "footer.php";
?>