const { Note } = require('../../models/Note');

class NotesDb {
	static async getAllNotes() {
		const notes = Note.find();
		return notes;
	}
}

module.exports = NotesDb;
