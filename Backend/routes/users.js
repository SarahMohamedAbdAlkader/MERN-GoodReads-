const express = require('express');
const usersModel = require('../models/user')
const users = express.Router();
const multer = require('multer');
const upload = multer({dest : 'uploads/users'});

//you should continue 7owar l sooraa.....
//git ba2a kaman 
//link backend - frontend ya nour 
users.get('/', async function (request, response) {
    //show all users

    try {
        const users = await usersModel.find({})
        response.json(users)

    } catch (err) {
        response.json({
            code: 'database_error'
        })
    }
})

users.post('/register/:admin', async function (request, response) {
   
    
    try {
        const {firstName,lastName,email,password}=request.body;
        let newUser = new usersModel()
        newUser.firstName=firstName;
        newUser.lastName=lastName;
        newUser.email=email;
        newUser.password=password;
        newUser.admin = false;
        if (request.params.admin == '1') newUser.admin = true;

        await newUser.save()
        const token = await usersModel.generateAuthToken()
        response.json( token )

    } catch (err) {
        response.json(err)
    }

})

users.post('/login', async function (request, response) {
    //login a user 
    try {
        const {email,password}= request.body
        console.log(email);
        console.log(password);
        
        
        const user = await usersModel.findByCredentials(email, password)
        if (!user) {
            return response.json({error: 'Wrong email or password!'})
        }
        const token = await user.generateAuthToken()
        response.json( token )
        
    } catch (err) {
        response.json({err})
    }

})
users.post('/logout', async (req, res) => {
    // Log user out
    console.log("ANA fl SERVER "); 
    
    try {
        const {email,token}=req.body;
       
        const curUser = await usersModel.findOne({"email":email }).exec();
        
        curUser.tokens = curUser.tokens.filter(item => item.token != token)
       
        
        let newUser = new usersModel()
        newUser=curUser
      
        await newUser.save()
        console.log("aho aho aho aho");
        
        res.json({"msg":"logged out!"})
    } catch (error) {
        res.json({error:"error ya amaar"})
    }
})

module.exports = users;
