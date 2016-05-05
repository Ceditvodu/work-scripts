xhr = new XMLHttpRequest();
xhr.open("GET", "spoiler.2.0.3.js", false);
xhr.send();
eval(xhr.responseText);

// creating tab object
	var accordion = new Accordion_Spoiler('accordion','opened',1);




	// create object wich will contrill spoilers with className 'spoiler'
	var spoiler = new Spoiler('spoiler','opened', 1);

	// Animation example for spoilers:
	/*
		setInterval(function(){
			spoiler.toggle();
		},5000)
		setInterval(function(){
			spoiler2.toggle();
		},5000)
	*/

	// Animation example for unique intervale benith actions:
	/*
		setInterval(function(){
			spoiler.toggle(0);
		},5000)
		setInterval(function(){
			spoiler.toggle(1);
		},6000)
		setInterval(function(){
			spoiler2.toggle();
		},7000)
	*/

	// create object wich will contrill spoilers with className 'spoiler1'
	var spoiler2 = new Spoiler('spoiler1','closed', 10, 'content3', 'title2');

	var spoiler3 = new Spoiler('spoiler2','closed', 1,'content4', 'title3', 'title4');