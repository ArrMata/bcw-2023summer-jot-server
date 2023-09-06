const { NODE_ENV } = require('./Config');

class Logger {
	static info = (...params) => {
		if (NODE_ENV !== 'test') {
			console.log(...params);
		}
	};

	static error = (...params) => {
		if (NODE_ENV !== 'test') {
			console.error(...params);
		}
	};
}

module.exports = Logger;
