const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { Note, connectToMongoDb } = require('./models/Note');

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

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.get('/api/notes', async (req, res, next) => {
	try {
		const notes = await Note.find();
		return res.json(notes);
	} catch (error) {
		return next(error);
	}
});

app.get('/api/notes/:noteId', async (req, res, next) => {
	try {
		const { noteId } = req.params;
		const foundNote = await Note.findById(noteId);
		if (!foundNote) {
			return res.status(404).send(`no note found with id: ${noteId}`).end();
		}
		return res.json(foundNote);
	} catch (error) {
		return next(error);
	}
});

app.delete('/api/notes/:noteId', async (req, res, next) => {
	try {
		const { noteId } = req.params;
		const foundNote = await Note.findById(noteId);
		if (!foundNote) {
			return res.status(404).send(`no note found with id: ${noteId}`).end();
		}
		foundNote.deleteOne();
		return res.json(foundNote);
	} catch (error) {
		return next(error);
	}
});

app.post('/api/notes', async (req, res, next) => {
	const { body } = req;

	if (body.content === undefined) {
		return res.status(400).json({ error: 'content missing' });
	}

	try {
		const note = new Note({
			content: body.content,
			title: body.title,
			color: body.color,
		});
		await note.save();
		return res.json(note);
	} catch (error) {
		return next(error);
	}
});

app.put('/api/notes/:noteId', async (req, res, next) => {
	try {
		const { body } = req;
		const noteData = {
			content: body.content,
		};
		const foundNote = (
			await Note.findByIdAndUpdate(req.params.noteId, noteData, { new: true, runValidators: true })
		);
		return res.json(foundNote);
	} catch (error) {
		return next(error);
	}
});

app.use(errorHandler);

const connectAndListen = async () => {
	await connectToMongoDb();
	const { PORT } = process.env;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

connectAndListen();
