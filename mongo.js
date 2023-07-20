const mongoose = require("mongoose")
require('dotenv').config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)

const noteSchema = new mongoose.Schema({
    "title": { type: String, required: true },
    "content": { type: String, required: true },
    "color": { type: String },
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    title: "Dalinar Kholin",
    content: "An honorable man.",
})

note.save().then(() => {
    console.log('[NOTE SAVED] Closing connection...')
    mongoose.connection.close()
})
