const express = reqire('express')
const mongoos = require('mongoose')
const bookRouter = require('./routes/books')
const categoryRouter = require('./routes/categories')
const athorRouter = require('./routes/authors')
const userRouter = require('./routes/users')
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/goodreads"
const app = express();

/** MiddleWares */
app.use(express.json())
app.use(express.urlencoded)





/**Routes */
app.use('/books', bookRouter)
app.use('/authors', athorRouter)
app.use('/categories', categoryRouter)
app.use('/users', userRouter)



/**Started Services */
mongoos.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) return console.log("Mongo DB Connected Succesfully");
    return console.log(err);
})
app.listen(PORT, (err) => {
    if (!err) return console.log(`Server Started at PORT ${PORT}`);
})