const mongoose = require('mongoose')

const shelveSchema = new mongoose.Schema({
    state: { type: String, required: true }, // to be enumerated 
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "usersModel" }
    // user: { type: String }
})

const ShelveModel = mongoose.model('shelve',shelveSchema)

module.exports = ShelveModel;