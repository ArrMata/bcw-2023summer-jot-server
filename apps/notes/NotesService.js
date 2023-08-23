const NotesDb = require('./NotesDb');

class NotesService {
	static async getAllNotes() {
		const notes = NotesDb.getAllNotes();
		return notes;
	}
}

module.exports = NotesService;
