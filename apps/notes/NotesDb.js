const { Note } = require('../../models/Note');

class NotesDb {
	static async getAllNotes() {
		const notes = await Note.find();
		return notes;
	}

	static async getNoteById(noteId) {
		const note = await Note.findById(noteId);
		return note;
	}

	static async deleteNote(noteId) {
		const note = await Note.findByIdAndDelete(noteId);
		return note;
	}

	static async createNote(noteData) {
		const note = await Note.create(noteData);
		return note;
	}

	static async updateNote(noteId, noteData) {
		const updatedNote = (
			await Note.findByIdAndUpdate(noteId, noteData, { new: true, runValidators: true })
		);
		return updatedNote;
	}
}

module.exports = NotesDb;
