$(document).ready(function() {
  $(window).scroll(function(e) {
  		parallax();
  });

  function parallax() {
  		var scrolled = $(window).scrollTop();
  		$('#backgroundImage').css('top', -(scrolled * 0.15) + 'px');
      if (scrolled > 0) {
  				$("header").addClass("smallHeader");
  		} else {
  				$("header").removeClass("smallHeader");
  		}
  }

  // for (var i = 0; i < visibleProjects.length; i++) {
  //   var projectId = visibleProjects[i];
  //   var projectName = data[projectId]['ProjectName'];
  //   var projectInfo = data[projectId]['ProjectInfo'];
  //   var projectImg = data[projectId]['ProjectImg'];
  //
  //   var html = '';
  //   html += '<div class="project ' + projectId + '">';
  //   html += '<a href="project.php?id=' + projectId + '">';
  //   html += '<img class="image" src="' + $projectImg + '">';
  //   html += '<div class="details">';
  //   html += '<h2>' + $projectName + '</h2>';
  //   html += '<h3>' + $projectInfo + '</h3>';
  //   html += '</div>';
  //   html += '</a>';
  //   html += '</div>';
  //
  //   $("#projectThumbnails").append(html);
  // }

	// $("#introduction h1").Morphext({
	//     // The [in] animation type. Refer to Animate.css for a list of available animations.
	//     animation: "bounceIn",
	//     // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
	//     separator: ",",
	//     // The delay between the changing of each phrase in milliseconds.
	//     speed: 2000,
	//     complete: function () {
	//         // Called after the entrance animation is executed.
	//     }
	// });



	//  Apply fancybox to single items
	$("a.singleImage").fancybox();

	//  Apply fancybox to multiple items
	$("a.multipleImages").fancybox({
		'transitionIn'	:	'none',
		'transitionOut'	:	'none',
		'speedIn'		:	600,
		'speedOut'		:	200,
		'overlayShow'	:	true
	});

}); //Closing ready method
