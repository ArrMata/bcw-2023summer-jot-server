const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
	console.error(error.message);
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	}

	if (error.name === 'ValidationError') {
		return res.status(400).send({ error: error.message });
	}

	return next(error);
};

module.exports = { errorHandler, unknownEndpoint };
