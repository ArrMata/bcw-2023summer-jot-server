const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { Note, connectToMongoDb } = require('./models/Note')

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })
    }

    next(error)
}


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/api/notes', async (req, res, next) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (error) {
        next(error)
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
        next(error)
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
        next(error)
    }
})

app.post('/api/notes', async (req, res, next) => {
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
        next(error)
    }

})

app.put('/api/notes/:noteId', async (req, res, next) => {
    const body = req.body

    try {
        const noteData = {
            content: body.content
        }
        const foundNote = await Note.findByIdAndUpdate(req.params.noteId, noteData, { new: true, runValidators: true })
        return res.json(foundNote)
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

const connectAndListen = async () => {
    await connectToMongoDb()
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

connectAndListen()


