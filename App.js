import React, { Component } from 'react';

class EventEmitter extends React.Component {
  constructor(props) {
    super(props);
    this.events = {};
  };

  emit(eventName, ...rest) {
		let e = this.events;
		if (e[eventName]) {
			e[eventName].forEach(fn => {
				fn.apply(null, rest);
			})
		}
	};

  subscribe(eventName, callback) {
    let e = this.events;
		if (e[eventName]) {
			e[eventName].push(callback);
		} else {
			e[eventName] = [callback];
		};

    return () => {
			e[eventName] = e[eventName].filter(eventFn => callback !== eventFn);
		}
  }

  unbind(eventName) {
    let e = this.events;
    e[eventName] = [];   // it's terrible, i know...
  };

  render() {
    return (
      <div>
        <button onClick={() => this.subscribe(('change'), () => {alert("Я Первый!")})}>
          Первый
        </button>
        <button onClick={() => this.subscribe(('change2'), () => {alert("А я - Второй!")})}>
          Второй
        </button>
        <button onClick={() => this.unbind('change')}>
          Отписать Первого
        </button>
        <button onClick={() => this.unbind('change2')}>
          Отписать Второго
        </button>
        <button onClick={() => this.emit('change')}>
          Вызвать Первого
        </button>
        <button onClick={() => this.emit('change2')}>
          Вызвать Второго
        </button>
      </div>
    );
  }
}

export default EventEmitter;
