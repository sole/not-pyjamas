(function() {
	console.log('parallel or not?');

	// Wow this totally works in Nightly O_O
	var myPA = [1, 2, 3];
	var myPlusPA = myPA.mapPar(val => val + 1);

	var NUM_ITEMS = 100000;
	var hugeArray = new Array(NUM_ITEMS);

	for(var i = 0; i < NUM_ITEMS; i++) {
		hugeArray[i] = i;
	}
	

	function benchmark(callback, title) {
		title = title || '';
		var t = window.performance.now();
		for(var i = 0; i < 100; i++) {
			callback();
		}
		var t2 = window.performance.now();

		var elapsed = t2 - t;
		console.log(title + ' elapsed: ', elapsed);
	}

	benchmark(function() {
		hugeArray.mapPar(val => val + 1);
	}, 'parallel sum with fat arrow');

	benchmark(function() {
		hugeArray.mapPar(function(v) {
			return v + 1;
		});
	}, 'parallel sum with normal callback');
	
	benchmark(function() {
		hugeArray.map(function(v) {
			return v + 1;
		});
	}, 'sequential map');

	/* // OK this bails out as expected
	var global = 0;
	benchmark(function() {
		hugeArray.mapPar(function(v) {
			global++;
			return v + 1 + global;
		});
	}, 'this should not work');
	*/

	
}).call(this);

