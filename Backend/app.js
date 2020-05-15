const express = require('express')
const mongoos = require('mongoose')
const bookRouter = require('./routes/books')
const categoryRouter = require('./routes/categories')
const authorRouter = require('./routes/authors')
const userRouter= require('./routes/users')
const reviewRouter= require('./routes/reviews')
const ratingRouter= require('./routes/ratings')
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/goodreads"
const app = express();
const cors =  require('cors')

/** MiddleWares */
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded)
app.use((req, res, next) => {
    console.log(`${new Date()} -- ${req.method} -- ${req.url}`);
    next()
})
app.use('/uploads',express.static('uploads'))
/**Routes */
app.use('/books', bookRouter)
app.use('/authors', authorRouter)
app.use('/categories', categoryRouter)
app.use('/users', userRouter)
app.use('/reviews', reviewRouter)
app.use('/ratings', ratingRouter)



/**Started Services */
mongoos.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) return console.log("Mongo DB Connected Succesfully");
    return console.log(err);
})
app.listen(PORT, (err) => {
    if (!err) return console.log(`Server Started at PORT ${PORT}`);
})