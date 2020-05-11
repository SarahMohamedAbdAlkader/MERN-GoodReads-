const express = require("express");
const mongoose = require('mongoose');
const authorModel = require("../models/author");
const authorRouter = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/authors/');
  },
  filename: function (req, file, cb) {
    const fileName = uuidv4() + " - " + file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
authorRouter.get("/", async (req, res, next) => {
  //Dealing with DB:
  authorModel.find({}, (err, authors) => {
    console.log(authors);

    if (!err) return res.json(authors);
    res.status(500).json({
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

authorRouter.post("/", upload.single("authorImage"), (req, res) => {
  const author = new authorModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    authorImage: req.file.path
  });
  //creating a authorModel, and passing it the data to be manipulated later
  author.save((err, author) => {
    if (!err) return res.json(author);
    console.log(err);
    res.json({
      code: "DATABASE_ERROR",
    });
  });
});

authorRouter.patch("/:id", upload.single("authorImage"), async (req, res) => {
  const authorId = req.params.id;
  const authorData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    authorImage: req.file ? req.file.path : (await authorModel.findById(authorId).select('authorImage -_id')).authorImage
  }
  try {
    const updatedAuthor = await authorModel.findOneAndUpdate({ _id: authorId }, authorData, { new: true })
    res.json(updatedAuthor)
  } catch (err) {
    res.status(500).json({
      code: 'DB_ERROR'
    })
  }
});


authorRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await authorModel.findByIdAndRemove(id);
    res.json(result);
  } catch (err) {
    res.status(500).send(error.errmsg);
  }
});

module.exports = authorRouter;
