const express = require("express");
// const cors = require("cors");
const router = express.Router();
const BookModel = require("../models/book")
const catModel = require("../models/category");
const { check, validationResult } = require('express-validator');
// router.get("/", async (req, res, next) => {

//   try {
//     if (req.query.name) {
//       const category = await catModel.findOne({ catName: req.query.name })
//       const books = await BookModel.find({ category: category })
//       console.log(books)
//       const BooksAndCategories = {
//         category,
//         books,
//       }
//       res.json(BooksAndCategories);
//     }
//     else {
//       const cats = await catModel.find({});
//       res.json(cats);
//       console.log(cats);
//     }
//   } catch (err) {
//     res.send(error.errmsg);
//   }
// });
router.get( '/',cors(),async (req,res,next)=>{
  try{ const cats= await catModel.find({});
     console.log(cats.length)
     const pageCount = Math.ceil(cats.length / 10);
     let page = parseInt(req.query.page);
     if (!page) { page = 1;}
     if (page > pageCount) {
       page = pageCount
     }
     res.json({
       "dataLength":cats.length,
       "page": page,
       "pageCount": pageCount,
       cats: cats.slice(page * 10 - 10, page * 10)
     });
}
     catch(err){
        res.json({
            code: 'DataBase Error'
        })
    }
    })
router.post("/", [check('catName').not().isEmpty()], async (req, res) => {
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
    res.status(500).send(error.errmsg);
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
    res.status(500).send(error.errmsg);
  }
});

module.exports = router;
