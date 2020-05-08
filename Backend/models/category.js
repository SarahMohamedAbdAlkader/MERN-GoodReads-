const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

const categorySchema = new mongoose.Schema({
  // _id: {
  //   type: Number,
  //   required: true,
  // },
  catName: {
    type: String,
    unique: true,
  },
});

// categorySchema.set("toJSON", {
//   transform: function (doc, ret, options) {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   },
// });

// autoIncrement.initialize(mongoose.connection);
// categorySchema.plugin(autoIncrement.plugin, { model: "category", startAt: 1 });
const catModel = mongoose.model("category", categorySchema);
module.exports = catModel;
