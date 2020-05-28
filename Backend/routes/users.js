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
        const userId=separtedInfo.id;  //aho l id lel 3aizo
        console.log(userId);
        
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
            console.log(tmpUser);
            
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
        console.log(editedtoken);
        
        response.status(200).json( editedtoken )

    } catch (err) {
        response.status(500).json(err);
        console.log(err)
    }

});
users.post('/editUser/:token', async function (request, response){
    try{
        console.log("ANAA GEIT FL EDIT");
        
        console.log(request.body);
        const token= JSON.parse(request.params.token);
        const separtedInfo = separateToken(token);    
        const userId=separtedInfo.id;  //aho l id lel 3aizo
        console.log(userId);

        let curUser= await usersModel.findById(userId)
       
        const tmpUser = await usersModel.findOne({"email":request.body.email})
        //console.log("gab l temp",tmpUser);
        //console.log(String(curUser._id))
        //console.log(String(tmpUser._id));
         
        
        if(tmpUser != null && String(curUser._id) != String(tmpUser._id)) {
           // console.log(tmpUser);
            return response.status(409).json({err:"email already used"})
        }
       // console.log("ba3d l if",curUser);
        
        // let newUser = new usersModel()
        // console.log("da l new user", newUser);
        
        curUser.firstName=request.body.firstName
        curUser.lastName=request.body.lastName
        curUser.email=request.body.email
        
        //console.log("type of passsword",request.body.password.length);
        if(request.body.password.length){
            curUser.password = await bcrypt.hash( request.body.password, 8);
         }
      
        console.log("2abl l save", curUser);
        
       const tmp= await usersModel.findByIdAndUpdate(userId,curUser)
        console.log("ba3d l save" , tmp);
        
        return response.status(200).json({"firstName": curUser.firstName, "lastName": curUser.lastName , "email":curUser.email})
    }catch(error){
        response.status(500).json(error); 
    }
})

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
        console.log(curUser);
        
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