const mongoose = require('mongoose')

const authorReadingSchema = new mongoose.Schema({
    state: { type: String, required: true }, // to be enumerated 

    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "usersModel" }
    user: { type: String }
})

const authorReadingModel = mongoose.model('authorReading',authorReadingSchema)

module.exports = authorReadingModel;