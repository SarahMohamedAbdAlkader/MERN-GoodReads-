const express = require('express')
const BookModel = require('../models/book')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
const router = express.Router()
const ReviewModel = require('../models/review');
const RatingModel = require('../models/rating')
const ShelveModel = require('../models/shelve')
const upload = require('../middlewares/book')
const { editToken, separateToken } = require('../middlewares/users')

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
    const userId = "5ecad1bf5be52518f003c3f1";
    // const token= JSON.parse(request.params.token);
    // const separtedInfo = separateToken(token);    
    // const userId=separtedInfo.id;  //aho l id lel 3aizo
<<<<<<< HEAD
    console.log(userId);
=======

>>>>>>> 9d2736cb32e7305bebc9c6884cdab2e6aaa59acd
    try {
        console.log("Get All Book");
        const books = await BookModel.find().populate('category').populate('author')
        // to add rating and shelve of current logged in user 
        for (let index = 0; index < books.length; index++) {
            let myRating = 0, shelve = "";
            await RatingModel.find({ book: books[index]._id, user: mongoose.Types.ObjectId(userId) }, "value", (err, myRating) => {
                myRating = myRating.length > 0 ? myRating[0].value : 0;
            });
            await ShelveModel.find({ book: books[index]._id, user: mongoose.Types.ObjectId(userId) }, "state", (err, shelve) => {
                shelve = shelve.length > 0 ? shelve[0].state : "";
            });
            books[index] = { book: books[index], myRating, shelve }
        }
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
        console.log(err);
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
        const bookReviews = await ReviewModel.find({ book: id }).populate('Book').populate('usersModel')
        const bookRatings = await RatingModel.find({ book: id }).populate('Book').populate('usersModel')
        const shelve = await ShelveModel.find({book: id})
        const all = {
            book,
            bookReviews,
            bookRatings,
            shelve
        }
        console.log("hena ratinmmmmmng",bookRatings)
        res.json(all)
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.get('/author/:author/:token', async (req, res) => {
    console.log("wasal wasal wasal lel server");
    //console.log(req.params);
    
    const authorid = req.params.author;
    const token= JSON.parse(req.params.token);
    console.log("daa l token----> ",authorid);
    const separtedInfo = separateToken(token);    
    const userId=separtedInfo.id;  //aho l id lel 3aizo
    console.log("da l userId ------>",userId);
    
    console.log("Get AUTHOR BOOKS WITH RATINGS AND SHELVE");
    try {//mongoose.Types.ObjectId(authorid)
        const books = await BookModel.find({ author: authorid }).populate('author')
        // to add rating and shelve of current logged in user 
        for (let index = 0; index < books.length; index++) {
            let rating = 0, shelve = "";
            await RatingModel.find({ book: books[index]._id, user:userId  }, "value", (err, myRating) => {
                rating = myRating.length  ? myRating[0].value : -1;
            });
            await ShelveModel.find({ book: books[index]._id, user:mongoose.Types.ObjectId(userId)  }, "state", (err, myshelve) => {
                shelve = myshelve.length ? myshelve[0].state : "";
            });
           
            books[index] = { book: books[index], rating , shelve}
        }
        console.log("l books b salatathaaa");
        
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
