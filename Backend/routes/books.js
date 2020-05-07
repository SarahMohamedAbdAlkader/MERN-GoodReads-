const express = require('express')
const BookModel = require('../models/book')
const router = express.Router()

router.post('/', async (req, res) => {
    console.log("Add Book To DB");
    const bookData = req.body;
    const book = new BookModel(bookData);
    try {
        const savedBook = await book.save();
        res.json(savedBook);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log("Get A Book");
    try {
        const book = await BookModel.findById({ id }).populate('category').populate('author')
        res.json(book)
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id
    console.log("delete book");
    try {
        const book = await BookModel.deleteOne({ _id: postId })
        res.json(book);
    }
    catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const newBookData = req.body;
    console.log("edit book");
    try {
        const updatedBook = BookModel.findOneAndUpdate({ _id: id }, newBookData, { new: true }).populate('category').populate('author')
        res.json(updatedBook)
    } catch (err) {
        console.log(err);
        res.json({
            code: 'DB_ERROR'
        })
    }
})

module.exports = router
