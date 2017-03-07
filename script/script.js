$(document).ready(function() {


	$("#js-rotating").Morphext({
	    // The [in] animation type. Refer to Animate.css for a list of available animations.
	    animation: "bounceIn",
	    // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
	    separator: ",",
	    // The delay between the changing of each phrase in milliseconds.
	    speed: 2000,
	    complete: function () {
	        // Called after the entrance animation is executed.
	    }
	});



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


	//When we click "Show More" button
	$('.showMore').on('click',function(){
		var $showMore = $(this).parent().parent().find('section:last-child');
		var $button = $(this);
		//If item has class showing, run slide()
		if($showMore.hasClass('showing')){
			slide();
			
		}
		//Else if length of showing elements > 0
		else if($('.showing').length > 0) {
			//Hide elements
			$('.showing').slideUp();
			//Remove class
			$('.showing').removeClass('showing');
			//Run slide()
			slide();
			
		}
		//Else run slide()
		else {
			slide();
		}

		function slide() {
			//If is showing, hide it
			if($showMore.hasClass('showing')) {
				$showMore.removeClass('showing');
				$showMore.slideUp();
				$button.innerHTML = "Show Details";
			} 
			//Else show it
			else {
				$showMore.slideDown();
				$showMore.addClass('showing');
				$button.innerHTML = "Hide Details";
			}
		}
	});


	//When we click "Show Less" button
	$('.showLess').on('click',function(){
		var $showLess = $(this).parent().parent().parent().find('section:last-child');
		//If item has class showing, run slide()
		if($showLess.hasClass('showing')){
			slide();
		}
		//Else if length of showing elements > 0
		else if($('.showing').length > 0) {
			//Hide elements
			$('.showing').slideUp();
			//Remove class
			$('.showing').removeClass('showing');
			//Run slide()
			slide();
			
		}
		//Else run slide()
		else {
			slide();
		}

		function slide() {
			//If is showing, hide it
			if($showLess.hasClass('showing')) {
				$showLess.removeClass('showing');
				$showLess.slideUp();
				$button.innerHTML = "Show Details";
			} 
			//Else show it
			else {
				$showLess.slideDown();
				$showLess.addClass('showing');
				$button.innerHTML = "Hide Details";
			}
		}
	});


}); //Closing ready method

