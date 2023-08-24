const notesRouter = require('express').Router();
const NotesService = require('../NotesService');

notesRouter.get('', async (req, res, next) => {
	try {
		const notes = await NotesService.getAllNotes();
		return res.send(notes);
	} catch (error) {
		return next(error);
	}
});

notesRouter.get('/:noteId', async (req, res, next) => {
	try {
		const { noteId } = req.params;
		const foundNote = await NotesService.getNoteById(noteId);
		return res.send(foundNote);
	} catch (error) {
		return next(error);
	}
});

notesRouter.delete('/:noteId', async (req, res, next) => {
	try {
		const { noteId } = req.params;
		const deletedNote = await NotesService.deleteNote(noteId);
		return res.send(deletedNote);
	} catch (error) {
		return next(error);
	}
});

notesRouter.post('', async (req, res, next) => {
	try {
		const { body } = req;
		const createdNote = await NotesService.createNote(body);
		return res.json(createdNote);
	} catch (error) {
		return next(error);
	}
});

notesRouter.put('/:noteId', async (req, res, next) => {
	try {
		const { body } = req;
		const updatedNote = await NotesService.updateNote(req.params.noteId, body);
		return res.json(updatedNote);
	} catch (error) {
		return next(error);
	}
});

module.exports = notesRouter;
