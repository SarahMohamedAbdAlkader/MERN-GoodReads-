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
        ref: 'Category'
    },
    author: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'Author'
    },
    added: {
        type: Date,
        default: Date.now
    }
})

var BookModel = mongoos.model('Book', bookSchema);

module.exports = BookModel;