const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	color: { type: String },
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		const adjustedObject = { ...returnedObject };
		adjustedObject.id = adjustedObject._id.toString();
		delete adjustedObject._id;
		delete adjustedObject.__v;
		return adjustedObject;
	},
});

const Note = mongoose.model('Note', noteSchema);

module.exports = { Note };
