const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  catName: {
    type: String,
    unique: true,
  },
});

const catModel = mongoose.model("category", categorySchema);
module.exports = catModel;

