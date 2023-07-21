const mongoose = require("mongoose")

mongoose.set('strictQuery', false)
console.log('Attempting to connect to MongoDB Database');

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("[CONNECTED TO MONGODB]")
    } catch (error) {
        console.log("[CONNECTION TO MONGODB FAILED]", error.message)
    }
}

const noteSchema = new mongoose.Schema({
    "title": { type: String, required: true },
    "content": { type: String, required: true },
    "color": { type: String },
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = { Note, connectToMongoDb }