const mongoos = require('mongoose')

const authorSchema = mongos.Schema({
    name: {
        type: String,
        required: true
    }
})

var AuthorModel = mongoose.model('Author', authorSchema);

module.exports = AuthorModel;