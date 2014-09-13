(function() {
	console.log('parallel or not?');

	// Wow this totally works in Nightly O_O
	var myPA = [1, 2, 3];
	var myPlusPA = myPA.mapPar(val => val + 1);
	
	console.log(myPlusPA);
	
}).call(this);

