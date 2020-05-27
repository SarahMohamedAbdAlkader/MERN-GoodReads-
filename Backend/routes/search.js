const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const CategoryModel = require('../models/category');
const BookModel = require('../models/book')

router.get('/book/:name', async (req, res) => {
    console.log(req.params.name);
    const searchName = req.params.name;
    try {
        const result = await BookModel.find({name: { $regex: searchName, $options: 'i'}}).populate('category').populate('author').exec();
        res.json({result}) 
    
    } catch (err) {
        console.log(err);
        res.json("Name is not exist")
    }

}
)
router.get('/category/:name', async (req, res) => {
    console.log(req.params.name);
    const searchName = req.params.name;
    try {
        const result = await CategoryModel.find({catName: { $regex: searchName, $options: 'i'}}).exec();
        res.json({result}) // h5leh yb33t el id w henak ast2abl el id w b3to k2ano url ywdeh llapge btat3 el book with id
    
    } catch (err) {
        console.log(err);
        res.json("Name is not exist")
    }

}
)



module.exports=router;