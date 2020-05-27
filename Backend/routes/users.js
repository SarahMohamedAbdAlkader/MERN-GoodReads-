const express = require('express');
const usersModel = require('../models/user')
const users = express.Router();
const {editToken, separateToken} = require('../middlewares/users')


users.get('/', async function (request, response) {
    //show all users

    try {
        const users = await usersModel.find({})
        response.json(users)

    } catch (err) {
        response.status(500).json(err);
    }
});

users.get('/admin/:token', async function (request, response){
    try{
        const token= JSON.parse(req.params.token);
        const separtedInfo = separateToken(token);   
        const userId = separtedInfo.id;
        const user = await usersModel.findById(userId)
        response.json(user.admin)

    }catch(error){
        response.json(error)
    }
})

users.get('/getUser/:token', async function (request, response){
    try {
       
        
        const token= JSON.parse(request.params.token);
        const separtedInfo = separateToken(token);    
        const id=separtedInfo.id;  //aho l id lel 3aizo
        console.log(id);
        
        const user = await usersModel.findById(id).exec();   
        response.json(id)

    } catch (err) {
        response.status(500).json(err);
    }
})

users.post('/register/:admin', async function (request, response) {
    try {
        const {firstName,lastName,email,password}=request.body;
        
        const tmpUser = await usersModel.find({email})
        if(tmpUser) return response.status(409).json({err:"email already used"})

        let newUser = new usersModel()
        newUser.firstName=firstName;
        newUser.lastName=lastName;
        newUser.email=email;
        newUser.password=password;
        newUser.admin = false;
        if (request.params.admin == '1') newUser.admin = true;

        await newUser.save()
        const token = await newUser.generateAuthToken()
        const editedtoken=editToken(newUser._id,token)
        console.log(editedtoken);
        
        response.status(200).json( editedtoken )

    } catch (err) {
        response.status(500).json(err);
        console.log(err)
    }

});

users.post('/login', async function (request, response) {
    //login a user 
    try {
        const {email,password}= request.body
        console.log(email);
        console.log(password);
        const curUser = await usersModel.findByCredentials(email, password)
        console.log("geh hnaa");
        
        if (!curUser) {
            return response.status(400).json({error: 'Wrong email or password!'})
        }
        const token = await curUser.generateAuthToken()
        console.log(token)
        const editedtoken = editToken(curUser._id,token)
        console.log("khalas l login w bib3at");
        
        if(curUser.admin)response.status(200).json( editedtoken, {"admin":curUser.admin} )
        else response.status(200).json(editedtoken)

    } catch (err) {
        response.status(500).json(err);
    }

});

users.post('/logout', async (req, res) => {
    // Log user out
  
    try {
        const {token}=req.body;
        const separtedInfo = separateToken(token);
              
        const id=separtedInfo.id;
        const curtoken=separtedInfo.token;
              
        const curUser = await usersModel.findById(id).exec();       
        
        curUser.tokens = curUser.tokens.filter(item => item.token != curtoken)
             
        let newUser = new usersModel()
        newUser=curUser
      
        await newUser.save()
        console.log("aho aho aho aho");
        
        res.json({msg:"from the server the user is logged out!"})
    } catch (error) {
        res.status(500).json(error);
    }
});

users.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await usersModel.findByIdAndRemove(id);
      res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});
  
module.exports = users;