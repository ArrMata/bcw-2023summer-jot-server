const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const { Note, connectToMongoDb } = require('./models/Note')

let notes = [
    {
        "title": "testing note",
        "content": "Jot down your thoughts!",
        "color": "#c10000",
        "id": 1
    },
    {
        "title": "new note!",
        "content": "Jot down your thoughts!",
        "color": "#2fe0ff",
        "id": 2
    },
    {
        "title": "new note?",
        "content": "Jot down your thoughts!",
        "color": "#f4f4f5",
        "id": 3
    }
]

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/api/notes', async (req, res, next) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        return res.status(500).end()
    }
})

app.get('/api/notes/:noteId', async (req, res, next) => {
    try {
        const noteId = req.params.noteId
        const foundNote = await Note.findById(noteId)
        if (!foundNote)
            return res.status(404).send(`no note found with id: ${noteId}`).end()
        return res.json(foundNote)
    } catch (error) {
        console.log(error.message)
        return res.status(500).end()
    }
})

app.delete('/api/notes/:noteId', async (req, res, next) => {
    try {
        const noteId = req.params.noteId
        const foundNote = await Note.findById(noteId)
        if (!foundNote)
            return res.status(404).send(`no note found with id: ${noteId}`).end()
        foundNote.deleteOne()
        return res.json(foundNote)
    } catch (error) {
        console.log(error.message)
        return res.status(500).end()
    }
})

app.post('/api/notes', async (req, res) => {
    const body = req.body

    if (body.content === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }

    try {
        const note = new Note({
            content: body.content,
            title: body.title,
            color: body.color
        })
        await note.save()
        return res.json(note)
    } catch (error) {
        console.log(error.message)
        return res.status(500).end()
    }

})

app.put('/api/notes/:noteId', async (req, res) => {
    const body = req.body

    try {
        const foundNote = await Note.findById(req.params.noteId)
        if (!foundNote)
            return res.status(404).send(`no note found with id: ${noteId}`).end()

        foundNote.content = body.content || foundNote.content

        await foundNote.save()
        return res.json(foundNote)
    } catch (error) {
        console.log(error.message)
        return res.status(500).end()
    }
})

const connectAndListen = async () => {
    await connectToMongoDb()
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

connectAndListen()


