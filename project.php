<!-- print all project details content -->
<?php

	if ($result->num_rows > 0) {

	    // output data of each row
	    while($row = $result->fetch_assoc()) {

	        $projectId = $row['ID'];
	        $projectName = $row['ProjectName'];
	        $projectDate = $row['ProjectDate'];
	        $projectInfo = $row['ProjectInfo'];
	        $projectType = $row['ProjectType'];
	        $projectTags = $row['ProjectTags'];
	        $projectImg = $row['ProjectImg'];

	        echo '
	        <div class="project '.$projectId.'">
	        		<a href="projectDetails.php/'.$projectId.' rel="projectIntro'.$projectId.'">
	        			<img src="'.$projectImg.'">
	        			<div class="details">
	        				<h2>'.$projectName.'</h2>
	        				<h3>'.$projectInfo.'</h3>
	        				<p>'.$projectDate.'</p>
	        			</div>
	        		</a>
	        </div>';
	    }
	} else {
	    echo "0 results";
	}

?>		