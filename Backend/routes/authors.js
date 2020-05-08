const express = require("express");
const authorModel = require("../models/author");
const authorRouter = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //conditionally accept/reject files
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage }, { fileFilter: fileFilter });

authorRouter.get("/", (req, res, next) => {
  //Dealing with DB:
  authorModel.find({}, (err, authors) => {
    if (!err) return res.json(authors);
    res.json({
      code: "DATABASE_ERROR",
    });
  });
});

authorRouter.get("/:id", (req, res) => {
  const authorId = req.params.id;
  authorModel.findById(authorId).exec((err, author) => {
    if (!err) return res.send(author);
    res.json({
      code: "DB_ERROR",
    });
  });
  // res.send(`Showing author with ID = ${authorId}}`);
});

authorRouter.post("/", upload.single("photo"), (req, res) => {
  //  console.log(req.body)
  console.log(req.file);
  //const authorData = req.body; //getting author data from req.body.
  const author = new authorModel({
    _id: new mongoose.Types.ObjectID(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photo: req.file.path,
  }); //creating a authorModel, and passing it the data to be manipulated later

  author.save((err, author) => {
    if (!err) return res.json(author);
    console.log(err);
    res.json({
      code: "DATABASE_ERROR",
    });
  });
});

authorRouter.patch("/:id", (req, res) => {
  authorId = req.params.id;
  const authorDetails = req.body;
  authorModel.findOneAndUpdate(
    { _id: authorId },
    authorDetails,
    { new: true },
    (err, author) => {
      if (!err) return res.json(author);
      res.json({
        code: "DB_ERROR",
      });
    }
  );
  res.send(`Editing author with ID = ${req.params.id}`);
});

authorRouter.delete("/:id", (req, res) => {
  authorId = req.params.id;
  authorModel.findOneAndRemove({ _id: authorId }, (err) => {
    if (!err) return res.json({ state: "deleted" });
    res.json({
      code: "DB_ERROR",
    });
  });
  res.send(`Deleting author with ID = ${req.params.id}`);
});

module.exports = authorRouter;
