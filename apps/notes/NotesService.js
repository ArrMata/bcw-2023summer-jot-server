const { BadRequest } = require('../../libraries/Errors');
const NotesDb = require('./NotesDb');

class NotesService {
	static async getAllNotes() {
		const notes = await NotesDb.getAllNotes();
		return notes;
	}

	static async getNoteById(noteId) {
		const note = await NotesDb.getNoteById(noteId);
		if (!note) {
			throw new BadRequest('Something went wrong...');
		}
		return note;
	}

	static async deleteNote(noteId) {
		await this.getNoteById(noteId);
		const note = await NotesDb.deleteNote(noteId);
		return note;
	}

	static async createNote(noteData) {
		const createdNote = await NotesDb.createNote(noteData);
		return createdNote;
	}

	static async updateNote(noteId, noteData) {
		const updatedNote = await NotesDb.updateNote(noteId, noteData);
		return updatedNote;
	}
}

module.exports = NotesService;
