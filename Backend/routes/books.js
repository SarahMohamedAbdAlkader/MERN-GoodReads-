const express = require('express')
const BookModel = require('../models/book')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()
const ReviewModel = require('../models/review');
const RatingModel = require('../models/rating')
const upload = require('../middlewares/book')
/** MiddleWares */



/** APIs */
router.post('/', upload.single('bookImage'), async (req, res) => {
    console.log("Before Add Book To DB");
    const book = new BookModel({
        name: req.body.name,
        category: req.body.categoryId,
        author: req.body.authorId,
        bookImage: req.file.path
    });
    try {
        const savedBook = await book.save();
        const savedBookDetails = await BookModel.findById({ _id: savedBook._id }).populate('category').populate('author')
        res.json(savedBookDetails);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})

router.get('/all', async (req, res) => {
    console.log("Get All Book");
    try {
        const books = await BookModel.find().populate('category').populate('author')
        res.json(books)
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})
router.get('/', async (req, res) => {
    try {
        console.log("Get All Book");
        const books = await BookModel.find().populate('category').populate('author')
        console.log(books)
        const pageCount = Math.ceil(books.length / 10);
        let page = parseInt(req.query.page);
        if (!page) { page = 1; }
        if (page > pageCount) {
            page = pageCount
        }
        res.json({
            "dataLength": books.length,
            "page": page,
            "pageCount": pageCount,
            books: books.slice(page * 10 - 10, page * 10)
        });
    }
    catch (err) {
        res.json({
            code: 'DataBase Error'
        })
    }
})



router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log("Get A Book");
    try {
        const book = await BookModel.findById({ _id: id }).populate('category').populate('author')
        const bookReviews = await ReviewModel.find({ book: id }).populate('usersModel')
        const bookRatings = await RatingModel.find({ book: id }).populate('userModel')
        const all = {
            book,
            bookReviews,
            bookRatings,
        }
        res.json(all)
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.get('/author/:author', async (req, res) => {
    const authorid = req.params.author
    console.log("Get All Book");
    try {//mongoose.Types.ObjectId(authorid)
        const books = await BookModel.find({ author: authorid }).populate('author')
        console.log(books);

        res.json(books)
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    console.log("delete book");
    try {
        const deletedState = await BookModel.deleteOne({ _id: id })
        res.json(deletedState);
    }
    catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.patch('/:id', upload.single('bookImage'), async (req, res) => {
    const id = req.params.id;
    const newBookData = {
        name: req.body.name,
        category: req.body.categoryId,
        author: req.body.authorId,
        bookImage: req.file ? req.file.path : (await BookModel.findById(id).select('bookImage -_id')).bookImage
    }
    console.log("edit book");
    try {
        const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, newBookData, { new: true }).populate('category').populate('author')
        res.json(updatedBook)
    } catch (err) {
        res.json({
            code: 'DB_ERROR'
        })
    }
})

module.exports = router
