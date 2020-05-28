const mongoose = require('mongoose')

const reviewSchema =  mongoose.Schema({
    text: { type: String, required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
})

const ReviewModel = mongoose.model('review', reviewSchema)

module.exports = ReviewModel;