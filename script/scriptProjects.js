$(document).ready(function() {

	//  Apply fancybox to single item	
	$("a.singleImage").fancybox();
	
	//  Apply fancybox to multiple items 
	$("a.multipleImages").fancybox({
		'transitionIn'	:	'none',
		'transitionOut'	:	'none',
		'speedIn'		:	600, 
		'speedOut'		:	200, 
		'overlayShow'	:	true
	});
	
});

