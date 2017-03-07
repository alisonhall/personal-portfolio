$(document).ready(function() {

	// Creating Bubbles
	var BubbleObject = function(imgSrc){
		var self = this;
		self.image = document.createElement("img");
		self.image.className = "bubble";
		self.image.src = imgSrc;
		self.image.style.position = "absolute";
		self.image.style.bottom = (Math.random() * 2000) + "px";
		self.image.style.left = Math.random() * 90 + "%";
		self.image.style.width = Math.random() * 150 + "px";
		document.getElementById('wrapper').appendChild(self.image);
	};

	for (var i=0; i<20; i++) {
		var bubble1 = new BubbleObject("images/bubble1.png");
		var bubble2 = new BubbleObject("images/bubble2.png");
		var bubble3 = new BubbleObject("images/bubble3.png");
		var bubble4 = new BubbleObject("images/bubble4.png");
		var bubble5 = new BubbleObject("images/bubble5.png");
	};
	
});

