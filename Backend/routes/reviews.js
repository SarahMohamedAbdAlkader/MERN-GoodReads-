const express = require('express');
const router = express.Router();
const ReviewModel = require('../models/review');
const { editToken, separateToken } = require('../middlewares/users')

router.post('/:token', async (req, res) => {
    const token = JSON.parse(req.params.token);
    const separtedInfo = separateToken(token);
    const userId = separtedInfo.id;
    const { bookId, userReview } = req.body;
    const review = new ReviewModel({
        text: userReview,
        book: bookId,
        user: userId
    })
    try {
        const savedReview = await review.save()
        res.json(savedReview)
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
})


router.get('/', async (req, res) => {
    console.log("Get All booksReviews");
    try {
        const booksReviews = await ReviewModel.find({})
        res.json(booksReviews)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})


router.get('/:bookId', async (req, res) => {
    const bookId = req.params.bookId
    console.log("Get A Book");
    try {
        const bookReviews = await ReviewModel.find({ book: bookId }).populate('Book').populate('usersModel')

        res.json(bookReviews)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})


router.delete('/:id', async (req, res) => {
    const { userId, bookId } = req.body;
    const id = req.params.id;
    console.log("delete book");
    try {
        const deletedState = await ReviewModel.deleteOne({ _id: id })
        res.json(deletedState);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedReview = await ReviewModel.update({ _id: id }, { $set: { 'text': req.body.text } }, { new: true }).populate('usersModel')
        res.json(updatedReview)
    } catch (err) {
        res.json({
            code: 'DB_ERROR'
        })
    }
})

module.exports = router
