const express = require("express");
const Router = express.Router();
const authorReadingModel = require("../models/authorReading")

router.post('/', async (req, res) => {
    const { userId, bookId, state } = req.body;
    try {
        const readingDetails = await authorReadingModel.updateOne({ book: bookId, user: userId }, { state: state }, { upsert: true, new: true });
        res.status(200).json(readingDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})