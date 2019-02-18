class StatefulEmitter {
	constructor(obj) {
		this.state = {...obj};
		this.funcs = [];
	};

	subscribe(fn) {
		this.funcs.push(fn);
		this.printResult();

		return () => {
			this.funcs = this.funcs.filter(eventFn => fn !== eventFn);
		};
	};

  	setState(data) {
		this.state = (data.constructor === Object) ? {...data} : data(this.state);
  		this.printResult();
	};

	printResult() {
		return this.funcs.forEach(fn => {
			fn.call(null, this.state.counter);
		})
	};

};


/*
var state$ = new StatefulEmitter({counter: 0}) 
state$.subscribe(state => { 
	console.log("currentState:", state) 
}) // `currentState: 0` -- выводится сразу 

var unsubscribeIt = state$.subscribe(state => { 
	console.log("currentState x2:", state*2) 
});

//unsubscribeIt();

state$.setState({counter: 1}) // `currentState: 1` выводится 
state$.setState({counter: 2}) // `currentState: 2` выводится
state$.setState(state => ({counter: state.counter + 1}));
*/
