const mongoose = require('mongoose')
const shelveSchema = mongoose.Schema({
    state: { type: String, required: true }, // to be enumerated 
    book: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
})

var ShelveModel = mongoose.model('shelve',shelveSchema)

module.exports = ShelveModel;
