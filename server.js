const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Config = require('./libraries/config');
const Middleware = require('./libraries/middleware');
const Logger = require('./libraries/logger');
const notesRouter = require('./apps/notes/entry-points/NotesController');

const app = express();
mongoose.set('strictQuery', false);

const connectToMongoDb = async () => {
	try {
		Logger.info('Attempting to connect to MongoDB Database');
		await mongoose.connect(Config.MONGODB_URL);
		Logger.info('[CONNECTED TO MONGODB]');
	} catch (error) {
		Logger.info('[CONNECTION TO MONGODB FAILED]', error.message);
	}
};

connectToMongoDb();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/notes', notesRouter);

app.use(Middleware.unknownEndpoint);
app.use(Middleware.errorHandler);
app.use(Middleware.defaultErrorHandler);

module.exports = app;
