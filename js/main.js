(function() {
	console.log('parallel or not?');

	// Wow this totally works in Nightly O_O
	var myPA = [1, 2, 3];
	var myPlusPA = myPA.mapPar(val => val + 1);

	var NUM_ITEMS = 900;
	var NUM_ITERATIONS = 300;
	var hugeArray = new Array(NUM_ITEMS);

	for(var i = 0; i < NUM_ITEMS; i++) {
		hugeArray[i] = i;
	}
	

	function benchmark(callback, title) {
		title = title || '';
		var t = window.performance.now();
		for(var i = 0; i < NUM_ITERATIONS; i++) {
			callback();
		}
		var t2 = window.performance.now();

		var elapsed = t2 - t;
		//console.log(title + ' elapsed: ', elapsed);
		document.body.innerHTML += '<br />' + title + ' ' + elapsed;
	}


	function notSoExpensiveFunction(v) {
		return Math.pow( Math.pow( v ) );
	}

	function expensiveFunction(v) {
		var localFibs = [0, 1, 1, 2];

		while(v >= localFibs.length) {
			var lastFibIndex = localFibs.length - 1;
			var nextFib = localFibs[lastFibIndex - 1] + localFibs[lastFibIndex];
			localFibs.push(nextFib);
		}
	
		return localFibs[v];
	}

	/*benchmark(function() {
		hugeArray.mapPar(val => val + 1);
	}, 'parallel map with fat arrow');

	benchmark(function() {
		hugeArray.mapPar(function(v) {
			return v + 1;
		});
	}, 'parallel map with normal callback');
	
	benchmark(function() {
		hugeArray.map(function(v) {
			return v + 1;
		});
	}, 'sequential map');*/

	benchmark(function() {
		hugeArray.mapPar(expensiveFunction);
	}, 'parallel');

	benchmark(function() {
		hugeArray.map(expensiveFunction);
	}, 'sequential');

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

