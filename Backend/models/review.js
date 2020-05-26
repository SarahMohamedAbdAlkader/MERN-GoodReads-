const mongoose = require('mongoose')

const reviewSchema =  mongoose.Schema({
    text: { type: String, required: true },

    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "usersModel" }
    // user: { type: String }
})

const ReviewModel = mongoose.model('review', reviewSchema)

module.exports = ReviewModel;