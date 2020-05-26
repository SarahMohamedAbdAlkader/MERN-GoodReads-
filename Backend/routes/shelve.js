const express = require("express");
const router = express.Router();
const { separateToken} = require('../middlewares/users')
const ShelveModel = require("../models/shelve")


router.post('/:token', async (req, res) => {

    const token= JSON.parse(req.params.token);
    console.log(token);
    
    const separtedInfo = separateToken(token);    
    const userId=separtedInfo.id;  //aho l id lel 3aizo
   
    const {bookId, state } = req.body;
    console.log(state);
    
    try {
        const shelveDetails = await ShelveModel.updateOne({ book: bookId, user: userId }, { state: state }, { upsert: true, new: true });
        res.status(200).json(state)
        console.log("da l shelve");
        
        console.log(shelveDetails);
        
        console.log(state)
    } catch (err) {console.log(err)
        res.status(500).json(err);
    }
})


router.get('/:token/:bookID', async (req, res) => {
    console.log("Get User shelve");
    try {     const token= JSON.parse(req.params.token);
        const separtedInfo = separateToken(token);  
        const userId=separtedInfo.id;  
        const bookId= req.params.bookID
        const shelve = await ShelveModel.findOne({user:userId,book:bookId})
        console.log(shelve)
        res.json(shelve)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})
module.exports = router
