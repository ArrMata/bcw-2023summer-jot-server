const Logger = require('./Logger');

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'Malformatted Id' });
	}

	if (error.name === 'ValidationError') {
		return res.status(400).send({ error: error.message });
	}
	return next(error);
};

// eslint-disable-next-line no-unused-vars
const defaultErrorHandler = (error, req, res, next) => {
	const { ...err } = error;

	if (!err.status) {
		err.status = 400;
	}

	if (err.status === 500) {
		Logger.error(err.message);
	}
	return res.status(err.status).send({ error: err.message });
};

module.exports = { errorHandler, unknownEndpoint, defaultErrorHandler };
