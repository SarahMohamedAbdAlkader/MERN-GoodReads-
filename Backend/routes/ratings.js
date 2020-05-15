const express = require('express');
const router = express.Router();
const RatingModel = require('../models/rating');
const BookModel = require('../models/book')

router.post('/', async (req, res) => {
    const { userId, bookId, value } = req.body;
    try {
        const rating = await RatingModel.updateOne({ book: bookId, user: userId }, { value: value }, { upsert: true, new: true });
        const ratingDetails = await RatingModel.getRatingDetails(bookId)
        await BookModel.updateOne({ _id: bookId }, ratingDetails, { new: true }).populate('category').populate('author')
        res.status(200).json(rating)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/', async (req, res) => {
    console.log("Get All Ratings");
    try {
        const ratings = await RatingModel.find({})
        res.json(ratings)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})
module.exports = router