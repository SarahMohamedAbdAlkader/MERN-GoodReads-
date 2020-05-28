const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const CatModel = require("../models/category");
const BookModel = require('../models/book')
const AuthorModel = require('../models/author')

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
 
        const result=  await CatModel.find({catName:new RegExp(searchName,'i')}).exec(function(err, result) {
         
             res.send({result})
        })
    
    } catch (err) {
        console.log(err);
        res.json("Name is not exist")
    }

}
)
router.get('/author/:name', async (req, res) => {
    console.log(req.params.name);
    const searchName = req.params.name;
    try {
 
        const result=  await AuthorModel.find({firstName:new RegExp(searchName,'i')}).exec(function(err, result) {
         
             res.send({result})
        })
    
    } catch (err) {
        console.log(err);
        res.json("Name is not exist")
    }

}
)



module.exports=router;