class EventEmitter {
	constructor() {
		this.events = {};
	};
  
	subscribe(eventName, callback) {
		let e = this.events;
		if (e[eventName]) {
			e[eventName].push(callback);
		} else {
			e[eventName] = [callback];
		}

		return () => {
			e[eventName] = e[eventName].filter(eventFn => callback !== eventFn);
		}
	};
  
	emit(eventName, ...rest) {
		let e = this.events;
		if (e[eventName]) {
			e[eventName].forEach(fn => {
				fn.apply(null, rest);
			})
		}      
	};
}


/*
const ee = new EventEmitter();

var first = ee.subscribe('change', () => {
	console.log('First!');
});

var second = ee.subscribe('change', () => {
	console.log('Second!');
});

first();

ee.emit('change');
*/