const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: false },
  dob: { type: String, required: false },
});
//authorSchema.dob instanceof Date;
//for Data Manipulation: CRUD
const authorModel = mongoose.model("author", authorSchema); //(model chosen name , schema name)

//exporting model:
module.exports = authorModel;
