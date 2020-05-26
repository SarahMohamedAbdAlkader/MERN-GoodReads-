const express = require("express");
const Router = express.Router();
const ShelveModel = require("../models/shelve")
const { separateToken} = require('../middlewares/users')
//ana ghaiart w 7ateit token
Router.post('/:token', async (req, res) => {

    const token= JSON.parse(req.params.token);
    console.log(token);
    
    const separtedInfo = separateToken(token);    
    const userId=separtedInfo.id;  //aho l id lel 3aizo
   
    const {bookId, state } = req.body;
    
    try {
        const shelveDetails = await ShelveModel.updateOne({ book: bookId, user: userId }, { state: state }, { upsert: true, new: true });
        res.status(200).json(shelveDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})

Router.get('/', async(req,res)=>{
    try {
        const shelves = await ShelveModel.find({})
        res.json(shelves)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})
module.exports = Router
