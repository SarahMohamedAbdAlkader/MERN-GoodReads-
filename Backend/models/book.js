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
    }
})

var BookModel = mongoos.model('Book', bookSchema);

module.exports = BookModel;