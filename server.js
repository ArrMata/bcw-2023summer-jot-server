const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./libraries/config');
const middleware = require('./libraries/middleware');
const logger = require('./libraries/logger');
const notesRouter = require('./apps/notes/entry-points/NotesController');

const app = express();
mongoose.set('strictQuery', false);

const connectToMongoDb = async () => {
	try {
		logger.info('Attempting to connect to MongoDB Database');
		await mongoose.connect(config.MONGODB_URL);
		logger.info('[CONNECTED TO MONGODB]');
	} catch (error) {
		logger.info('[CONNECTION TO MONGODB FAILED]', error.message);
	}
};

connectToMongoDb();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
