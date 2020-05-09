const express = require("express");
const cors = require("cors");
const router = express.Router();
const BookModel = require("../models/book")
const catModel = require("../models/category");
const { check, validationResult } = require('express-validator');
router.get("/", cors(), async (req, res, next) => {

  try {
    if (req.query.name) {
      const category = await catModel.findOne({ catName: req.query.name })
      const books = await BookModel.find({ category: category })
      console.log(books)
      const BooksAndCategories = {
        category,
        books,
      }
      res.json(BooksAndCategories);
    }
    else {
      const cats = await catModel.find({});
      res.json({
        cats,
      });
      console.log(cats);
    }
  } catch (err) {
    res.send(error.errmsg);
  }
});

router.post("/", [
  check('catName').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const category = new catModel({
      catName: req.body.catName,
    });
    await category.save();

    res.send(category);
  } catch (error) {
    res.send(error.errmsg);
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await catModel.findByIdAndRemove(id);
    res.json(post);
  } catch (err) {
    res.send(error.errmsg);
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await catModel.findById(id)
    const books = await BookModel.find({ category: category })
    console.log(books)
    const BooksAndCategories = {
      category,
      books,
    }
    res.json(BooksAndCategories);
  } catch (err) {
    res.send(error.errmsg);
  }
});
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await catModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (err) {
    res.send(error.errmsg);
  }
});

module.exports = router;
