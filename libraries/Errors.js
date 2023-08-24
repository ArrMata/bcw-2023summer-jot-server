class BadRequest extends Error {
	constructor(message = 'Bad Request') {
		super();
		this.message = message;
		this.status = 400;
	}
}

class Unauthorized extends Error {
	constructor(message = 'Unauthorized') {
		super();
		this.message = message;
		this.status = 401;
	}
}

class Forbidden extends Error {
	constructor(message = 'Forbidden') {
		super();
		this.message = message;
		this.status = 403;
	}
}

class NotFound extends Error {
	constructor(message = 'Not Found') {
		super();
		this.message = message;
		this.status = 404;
	}
}

class InternalServerError extends Error {
	constructor(message = 'Internal Server Error') {
		super();
		this.message = message;
		this.status = 500;
	}
}

module.exports = {
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	InternalServerError,
};
