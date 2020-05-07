const mongoos = require('mongoose')

const categorySchema = mongos.Schema({
    name: {
        type: String,
        required: true
    }
})

var CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;