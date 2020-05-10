const express = require('express')
const BookModel = require('../models/book')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/books/');
    },
    filename: function (req, file, cb) {
        const fileName =  uuidv4() + " - " + file.originalname.toLowerCase().split(' ').join('-');
        cb(null,fileName)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
/** MiddleWares */



/** APIs */
router.post('/', upload.single('bookImage'), async (req, res) => {
    console.log("Before Add Book To DB");
    const book = new BookModel({
        name: req.body.name,
        bookImage: req.file.filename,
        category: req.body.categoryId,
        author: req.body.authorId
    });
    try {
        const savedBook = await book.save();
        res.json(savedBook);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})

router.get('/', async (req, res) => {
    console.log("Get All Book");
    try {
        const books = await BookModel.find().populate('category').populate('author')
        res.json(books)
    } catch (err) {
        console.log(err);
        res.json(err)
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
        const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, newBookData, { new: true }).populate('category').populate('author')
        res.json(updatedBook)
    } catch (err) {
        res.json({
            code: 'DB_ERROR'
        })
    }
})

module.exports = router
