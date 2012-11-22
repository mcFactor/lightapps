

window.addEventListener('load', eventWindowLoaded, false);	

function eventWindowLoaded() {
	canvasApp();
	
}

function canvasSupport () {
 	return Modernizr.canvas;
}

function canvasApp() {
	
	console.log("Colorwheeeeeeel")

	if (!canvasSupport()) {
			 return;
 	} else {
	    var theCanvas = document.getElementById('canvas');
	    var context = theCanvas.getContext('2d');
	    
	    var thePicked = document.getElementById('picked');
	    var pickcontext = thePicked.getContext('2d');
	    
	    var theComplement = document.getElementById('complement');
	    var compcontext = theComplement.getContext('2d');
	}
	
	var mouseX;
	var mouseY;
	var compR;
	var compG;
	var compB;
	
	var tileSheet=new Image();
	tileSheet.addEventListener('load', eventSheetLoaded , false);
	tileSheet.src="http://lightapps/images/apps/app-colorwheel.png";
	
	//var imageData=context.createImageData(32,32);
	
	function eventSheetLoaded() {
		startUp();
		console.log('We’re loaded!')
	}

	function startUp() {
		drawTileSheet();
	}
	
	function drawTileSheet() {
		context.drawImage(tileSheet, 0, 0);
		
	}
	
	function fillpick(red, green, blue){
		redstr = red.toString(16);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}
		greenstr = green.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}
		bluestr = blue.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}
		pickcontext.fillStyle="#" + redstr + greenstr + bluestr;
		pickcontext.fillRect(0,0,350,100);
	}
	
	function fillcomp(red, green, blue){
		compR = red = 255 - red;
		compG = green = 255 - green;
		compB = blue = 255 - blue;
		//console.log(red, green, blue)
		redstr = red.toString(16);
		//console.log(redstr);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}
		//console.log(redstr);
		greenstr = green.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}
		bluestr = blue.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}
		fs = "#" + redstr + greenstr + bluestr;
		//console.log(fs);
		compcontext.fillStyle=fs;
		//console.log(compcontext.fillStyle);
		compcontext.fillRect(0,0,350,100);			
	}	
	
	function onMouseMove(e) {
		mouseX=e.clientX-theCanvas.offsetLeft;
		mouseY=e.clientY-theCanvas.offsetTop;
		//console.log(mouseX, mouseY);
	}
	
	function onMouseClick(e) {
		console.log("click: " + mouseX + "," + mouseY);
		imageData=context.getImageData(mouseX,mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		/*console.log("imageData length: " + imageData.data.length);
		for (i=0; i< imageData.data.length; i++){
			console.log("data: " + imageData.data[i]);
		}*/
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		
		// This is where we'll call ajaxcolor
		redstr = red.toString(16);
		greenstr = green.toString(16);
		bluestr = blue.toString(16);
		ajaxstr = "0x" +  greenstr + redstr + bluestr;
		console.log("ajaxstr: " + ajaxstr);
		fillpick(imageData.data[0], imageData.data[1], imageData.data[2]);
		fillcomp(imageData.data[0], imageData.data[1], imageData.data[2]);
		jQuery.ajax({
			url: '/cgi-bin/ajaxcolor', 
			data: {color: ajaxstr}
		});

	}

	function onCompClick(e) {
		console.log("click: " + mouseX + "," + mouseY);
		imageData=compcontext.getImageData(mouseX,mouseY,1,1);
		var red = (compR >> 1) | 0x80;
		var green = (compG >> 1) | 0x80;
		var blue = (compB >> 1) | 0x80;
		console.log("complement color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		
		// This is where we'll call ajaxcolor
		redstr = red.toString(16);
		greenstr = green.toString(16);
		bluestr = blue.toString(16);
		ajaxstr = "0x" +  greenstr + redstr + bluestr;
		console.log("ajaxstr: " + ajaxstr);
		jQuery.ajax({
			url: '/cgi-bin/ajaxcolor', 
			data: {color: ajaxstr}
		});	
	}
	
	theCanvas.addEventListener("mousemove", onMouseMove, false);
	theCanvas.addEventListener("click", onMouseClick, false);
	theComplement.addEventListener("click", onCompClick, false);
	
}

