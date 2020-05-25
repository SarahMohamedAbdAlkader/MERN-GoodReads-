const mongoose = require('mongoose')
const BookModel = require('../models/book')

const ratingSchema = new mongoose.Schema({
    value: { type: Number, required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "usersModel" }
    // user: { type: String }
})

ratingSchema.statics.getRatingDetails = async (bookId) => {
   const totalRatingCount = await RatingModel.countDocuments({ book: bookId })
   const totalRatingValue = await RatingModel.aggregate([
        { $match: {book: mongoose.Types.ObjectId(bookId)} },
        { $group: { _id: null, total: { $sum: "$value" } }}
    ]);
    const details={totalRatingCount,totalRatingValue:totalRatingValue[0].total}
    return details
}

const RatingModel = mongoose.model('rating', ratingSchema)
module.exports = RatingModel;