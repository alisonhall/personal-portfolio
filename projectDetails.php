<!-- print all project details content -->
<?php 

	if ($result->num_rows > 0) {
		$rowNum = -1;

	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	    	$rowNum += 1;
	    	if($rowNum >= sizeof($gradients)) {
	    		$rowNum = 0;
	    	}

	        $projectId = $row['ID'];
	        $projectName = $row['ProjectName'];
	        $projectDate = $row['ProjectDate'];
	        $projectInfo = $row['ProjectInfo'];
	        $projectType = $row['ProjectType'];
	        $projectTags = $row['ProjectTags'];
	        $projectImg = $row['ProjectImg'];
	        $mainVisibility = $row['MainVisibility'];
	        $subpageVisibility = $row['SubpageVisibility'];
	        $projectDetails = $row['ProjectDetails'];
	        $providedResources = $row['ProvidedResources'];
	        $providedResourcesImg = $row['ProvidedResourcesImg'];
	        $providedResourcesImgArray = explode(",", $providedResourcesImg);
	        $moodboard = $row['Moodboard'];
	        $moodboardImg = $row['MoodboardImg'];
	        $moodboardImgArray = explode(",", $moodboardImg);
	        $siteMap = $row['SiteMap'];
	        $siteMapImg = $row['SiteMapImg'];
	        $siteMapImgArray = explode(",", $siteMapImg);
	        $sketches = $row['Sketches'];
	        $sketchesImg = $row['SketchesImg'];
	        $sketchesImgArray = explode(",", $sketchesImg);
	        $wireframes = $row['Wireframes'];
	        $wireframesImg = $row['WireframesImg'];
	        $wireframesImgArray = explode(",", $wireframesImg);
	        $mockups = $row['Mockups'];
	        $mockupsImg = $row['MockupsImg'];
	        $mockupsImgArray = explode(",", $mockupsImg);
	        $extras = $row['Extras'];
	        $extrasImg = $row['ExtrasImg'];
	        $extrasImgArray = explode(",", $extrasImg);
	        $finalProduct = $row['FinalProduct'];
	        $finalProductImg = $row['FinalProductImg'];
	        $finalProductImgArray = explode(",", $finalProductImg);
	        $codePen = $row['CodePen'];
	        $codePenCode = $row['CodePenCode'];
	        $finalWebsite = $row['FinalWebsite'];
	        $finalWebsiteURL = $row['FinalWebsiteURL'];
	        $furtherWork = $row['FurtherWork'];
	        $furtherWorkURL = $row['FurtherWorkURL'];
	        $furtherWorkImg = $row['FurtherWorkImg'];
	        $set = "set1";

	        $currentGradient = $gradients[$rowNum];

	        echo '
	        <section class="projectContent '.$currentGradient.'">
	        	<!--[if gte IE 9]
	        	<style type="text/css">
	        		.orangeGradient {
	        			filter: none;
	        		}
	        	</style>
	        	<![endif]-->
	        	<section class="introduction clearfix">
	        		<h2>'.$projectName.'</h2>
	        		<h3>'.$projectInfo.'</h3>
	        		<p>'.$projectDate.'</p>
	        		<a href="'.$projectImg.'" class="multipleImages" rel="projectIntro'.$projectId.'">
	        			<img src="'.$projectImg.'">
	        		</a>
	        		<button class="showMore">Show Details</button>
	        	</section>
	        	<section class="accordian">';

	        		if($projectDetails != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' projectDetails clearfix">
	        			<h4>Project Details:</h4>
	        			<p>'.$projectDetails.'</p>
	        			</section>';
	        		}

	        		if($providedResources != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Provided Resources:</h4>
	        			<p>'.$providedResources.'</p>
	        			<aside>';
		        			foreach ($providedResourcesImgArray as $value) {
		        				echo '<a href="'.$value.'" class="multipleImages" rel="providedResources'.$projectId.'">
		        					<img src="'.$value.'">
		        				</a>';
		        			}
	        			echo '</aside>
	        			</section>';
	        		}

	        		if($moodboard != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Moodboard:</h4>
	        			<p>'.$moodboard.'</p>
	        			<aside>';
		        			foreach ($moodboardImgArray as $value) {
		        				echo '<a href="'.$value.'" class="multipleImages" rel="moodboard'.$projectId.'">
		        					<img src="'.$value.'">
		        				</a>';
		        			}
	        			echo '</aside>
	        			</section>';
	        		}

	        		if($siteMap != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Site Map:</h4>
	        			<p>'.$siteMap.'</p>
	        			<aside>';
		        			foreach ($siteMapImgArray as $value) {
		        				echo '<a href="'.$value.'" class="multipleImages" rel="siteMap'.$projectId.'">
		        					<img src="'.$value.'">
		        				</a>';
		        			}
	        			echo '</aside>
	        			</section>';
	        		}

	        		if($sketches != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Sketches:</h4>
	        			<p>'.$sketches.'</p>
	        			<aside>';
		        			foreach ($sketchesImgArray as $value) {
		        				echo '<a href="'.$value.'" class="multipleImages" rel="sketches'.$projectId.'">
		        					<img src="'.$value.'">
		        				</a>';
		        			}
	        			echo '</aside>
	        			</section>';
	        		}

	        		if($wireframes != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Wireframes:</h4>
	        			<p>'.$wireframes.'</p>
	        			<aside>';
		        			foreach ($wireframesImgArray as $value) {
		        				echo '<a href="'.$value.'" class="multipleImages" rel="wireframes'.$projectId.'">
		        					<img src="'.$value.'">
		        				</a>';
		        			}
	        			echo '</aside>
	        			</section>';
	        		}

	        		if($mockups != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Mockups:</h4>
	        			<p>'.$mockups.'</p>
	        			<aside>';
		        			foreach ($mockupsImgArray as $value) {
		        				echo '<a href="'.$value.'" class="multipleImages" rel="mockups'.$projectId.'">
		        					<img src="'.$value.'">
		        				</a>';
		        			}
	        			echo '</aside>
	        			</section>';
	        		}

	        		if($extras != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Extras:</h4>
	        			<p>'.$extras.'</p>
	        			<aside>';
		        			foreach ($extrasImgArray as $value) {
		        				echo '<a href="'.$value.'" class="multipleImages" rel="extras'.$projectId.'">
		        					<img src="'.$value.'">
		        				</a>';
		        			}
	        			echo '</aside>
	        			</section>';
	        		}

	        		if($finalProduct != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Final Product:</h4>
	        			<p>'.$finalProduct.'</p>
	        			<aside>';
		        			foreach ($finalProductImgArray as $value) {
		        				echo '<a href="'.$value.'" class="multipleImages" rel="finalProduct'.$projectId.'">
		        					<img src="'.$value.'">
		        				</a>';
		        			}
	        			echo '</aside>
	        			</section>';
	        		}

	        		if($codePen != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' codePen clearfix">
	        			<h4>CodePen:</h4>
	        			<p>'.$codePen.'</p>
	        			<aside>
	        				'.$codePenCode.'
	        			</aside>
	        			</section>';
	        		}

	        		if($finalWebsite != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Final Website:</h4>
	        			<p>'.$finalWebsite.'</p>
	        			<aside>
	        				<a href="'.$finalWebsiteURL.'">
	        					<img src="'.$projectImg.'">
	        				</a>
	        			</aside>
	        			</section>';
	        		}

	        		if($furtherWork != null) {
	        			if($set == "set1") {
	        				$set = "set2";
	        			} else {
	        				$set = "set1";
	        			}
	        			echo '<section class="'.$set.' clearfix">
	        			<h4>Further Work:</h4>
	        			<p>'.$furtherWork.'</p>
	        			<aside>
	        				<a href="'.$furtherWorkURL.'">
	        					<img src="'.$furtherWorkImg.'">
	        				</a>
	        			</aside>
	        			</section>';
	        		}

	        		if($set == "set1") {
	        			$set = "set2";
	        		} else {
	        			$set = "set1";
	        		}
	        		echo '<section class="'.$set.' clearfix">
	        		<button class="showLess">Hide Details</button>
	        		</section>
	        	</section>
	        </section>';
	    }
	} else {
	    echo "0 results";
	}

?>		

</section>