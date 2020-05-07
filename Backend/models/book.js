const mongoos = require('mongoose')

const bookSchema = mongos.Schema({
    name: {
        type: String,
        required: true
    },
    photo: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    added: {
        type: Date,
        default: Date.now
    }
})

var BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;