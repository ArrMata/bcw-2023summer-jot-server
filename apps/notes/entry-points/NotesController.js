const notesRouter = require('express').Router();
const NotesService = require('../NotesService');

notesRouter.get('', async (req, res, next) => {
	try {
		const notes = await NotesService.getAllNotes();
		return res.json(notes);
	} catch (error) {
		return next(error);
	}
});

// notesRouter.get('/:noteId', async (req, res, next) => {
// 	try {
// 		const { noteId } = req.params;
// 		const foundNote = await Note.findById(noteId);
// 		if (!foundNote) {
// 			return res.status(404).send(`no note found with id: ${noteId}`).end();
// 		}
// 		return res.json(foundNote);
// 	} catch (error) {
// 		return next(error);
// 	}
// });

// notesRouter.delete('/:noteId', async (req, res, next) => {
// 	try {
// 		const { noteId } = req.params;
// 		const foundNote = await Note.findById(noteId);
// 		if (!foundNote) {
// 			return res.status(404).send(`no note found with id: ${noteId}`).end();
// 		}
// 		foundNote.deleteOne();
// 		return res.json(foundNote);
// 	} catch (error) {
// 		return next(error);
// 	}
// });

// notesRouter.post('', async (req, res, next) => {
// 	const { body } = req;

// 	if (body.content === undefined) {
// 		return res.status(400).json({ error: 'content missing' });
// 	}

// 	try {
// 		const note = new Note({
// 			content: body.content,
// 			title: body.title,
// 			color: body.color,
// 		});
// 		await note.save();
// 		return res.json(note);
// 	} catch (error) {
// 		return next(error);
// 	}
// });

// notesRouter.put('/:noteId', async (req, res, next) => {
// 	try {
// 		const { body } = req;
// 		const noteData = {
// 			content: body.content,
// 		};
// 		const foundNote = (
// 			await Note.findByIdAndUpdate(req.params.noteId, noteData, { new: true, runValidators: true })
// 		);
// 		return res.json(foundNote);
// 	} catch (error) {
// 		return next(error);
// 	}
// });

module.exports = notesRouter;
