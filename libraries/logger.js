class Logger {
	static info = (...params) => {
		console.log(...params);
	};

	static error = (...params) => {
		console.log(...params);
	};
}

module.exports = Logger;
