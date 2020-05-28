const express = require('express');
const usersModel = require('../models/user')
const users = express.Router();
const bcrypt = require('bcryptjs')
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
        const userId=separtedInfo.id; 
        const curUser = await usersModel.findById(userId).exec();   
        response.json({"email":curUser.email,"firstName":curUser.firstName, "lastName":curUser.lastName })

    } catch (err) {
        response.status(500).json(err);
    }
})

users.post('/register/:admin', async function (request, response) {
    try {
        const {firstName,lastName,email,password}=request.body;
        
        const tmpUser = await usersModel.find({email})
        
        
        if(tmpUser.length) {
           
            return response.status(409).json({err:"email already used"})
        }

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
        
        response.status(200).json( editedtoken )

    } catch (err) {
        response.status(500).json(err);
        console.log(err)
    }

});
users.post('/editUser/:token', async function (request, response){
    try{
        
        const token= JSON.parse(request.params.token);
        const separtedInfo = separateToken(token);    
        const userId=separtedInfo.id;  
        

        let curUser= await usersModel.findById(userId)
       
        const tmpUser = await usersModel.findOne({"email":request.body.email})
               
        
        if(tmpUser != null && String(curUser._id) != String(tmpUser._id)) {
            return response.status(409).json({err:"email already used"})
        }
      
        curUser.firstName=request.body.firstName
        curUser.lastName=request.body.lastName
        curUser.email=request.body.email
        
        if(request.body.password.length){
            curUser.password = await bcrypt.hash( request.body.password, 8);
         }
      
      
       const tmp= await usersModel.findByIdAndUpdate(userId,curUser)
        console.log("user updated successfully" , tmp);
        
        return response.status(200).json({"firstName": curUser.firstName, "lastName": curUser.lastName , "email":curUser.email})
    }catch(error){
        response.status(500).json(error); 
    }
})

users.post('/login', async function (request, response) {
    //login a user 
    try {
        const {email,password}= request.body
        const curUser = await usersModel.findByCredentials(email, password)
       
        
        if (!curUser) {
            return response.status(400).json({error: 'Wrong email or password!'})
        }
        const token = await curUser.generateAuthToken()
        const editedtoken = editToken(curUser._id,token)
       
        
        if(curUser.admin)response.status(200).json( {editedtoken, "admin":curUser.admin} )
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
        console.log("The user is logged out!");
        
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