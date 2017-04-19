$(document).ready(function() {
  var pageWidth = $("#wrapper").width();
  var pageHeight = $("#wrapper").height();

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

  var hexagons = ["1.svg", "2.svg", "3.svg", "4.svg"];
  var circles = ["5.svg", "6.svg", "7.svg", "8.svg"];

  function generateRandomShape() {
    var randomSide = randomIntFromInterval(0, 1);
    var randomType = randomIntFromInterval(0, 2);
    var randomShape = randomIntFromInterval(0, 3);
    var randomSize1 = randomIntFromInterval(10, 50);
    var randomSize2 = randomIntFromInterval(40, 90);
    var randomOpacity = randomIntFromInterval(40, 80)/100;
    var randomX = randomIntFromInterval(0, 10);
    var randomY = randomIntFromInterval(60, pageHeight);

    var html = '';
    html += '<img class="shape" ';
    if(randomType == 0) {
      html += 'src="images/shapes/' + circles[randomShape] + '" ';
    } else {
      html += 'src="images/shapes/' + hexagons[randomShape] + '" ';
    }

    html += 'alt="" ';
    html += 'style="'
    html += 'top: ' + randomY + 'px; ';
    if(randomSide == 0) {
      html += 'left: ' + randomX + '%; ';
    } else {
      html += 'right: ' + randomX + '%; ';
    }
    if(randomType == 0) {
      html += 'width: ' + randomSize1 + 'px; ';
    } else {
      html += 'width: ' + randomSize2 + 'px; ';
    }
    html += 'opacity: ' + randomOpacity + '; ';
    html += '"/>';

    $("#shapes").append(html);
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  for (var i = 0; i < 40; i++) {
    generateRandomShape();
  }

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
