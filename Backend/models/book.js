const mongoos = require('mongoose')

const bookSchema = mongoos.Schema({
    name: {
        type: String,
        required: true
    },
    bookImage: {
        type: String,
    },
    category: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'category'
    },
    author: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'author'
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
    totalRatingCount: {
        type: Number,
        default: 0
    },
    totalRatingValue: {
        type: Number,
        default: 0
    }
})

var BookModel = mongoos.model('book', bookSchema);

module.exports = BookModel;