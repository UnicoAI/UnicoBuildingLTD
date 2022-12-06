doors=new Array(8)
	var frame = 0;
	var timeout_state = null; 

	//Preloads image into the browser cache ready for use
	function imageLoad() {
		for(i=0; i<=9; i++) {
			doors[i] = new Image();
			//Remember - if the URL/path references a subdirectory to escape the "\" with another "\" e.g. document.smileys.src='images\\smile ...'
			doors[i].src = "images\\Door" + i + ".JPG";
			
			
		}
	}

    function animate() {
		document.animImage.src = doors[frame].src;
		doors[frame].setAttribute("width", "40");
			doors[frame].setAttribute("height", "100");
		frame = (frame + 1);
		if(frame > 7) {
			frame = 0;
		}
		//Recursive call to the animate function ...
		timerId = setTimeout("animate()", document.animateform.speed.value);
	}
	function increasespeed() {
		document.animImage.src = doors[frame].src;
		frame = (frame + 1);
		if(frame > 7) {
			frame = 0;
		}
		//Recursive call to the animate function ...
		clearTimeout(timerId);
			timerId = null;
		animate();
		document.animateform.speed.value=600;
		
	}
	function slowspeed() {
		document.animImage.src = doors[frame].src;
		frame = (frame + 1);
		if(frame > 7) {
			frame = 0;
		}
		//Recursive call to the animate function ...
		clearTimeout(timerId);
			timerId = null;
		animate();
		document.animateform.speed.value=1800;

	}


	function checkButton()
	{
		if (document.animateform.runAnim.value == "Start")
		{
			document.animateform.runAnim.value = "Stop";
			animate();
		}
		else
		{
			document.animateform.runAnim.value = "Start";
			clearTimeout(timerId);
			timerId = null;
		}
	}
	function haltText(){
		if (document.animateform.runAnim.value == "Start")
		{
			timerId = null;
		}
	}
	function next() {
		document.animateform.runAnim.value = "Start";
			clearTimeout(timerId);
			timerId = null;
		document.animImage.src = doors[frame].src;
		frame = (frame + 1);
		if(frame > 7) {
			frame = 0;
		}
		
	}
	function prev() {
		document.animateform.runAnim.value = "Start";
			clearTimeout(timerId);
			timerId = null;
		document.animImage.src = doors[frame].src;
		frame = (frame - 1);
		if(frame < 1) {
			frame = 7;
		}
	}