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

// users.post('/getUser', async function (request, response){
//     try {
        
//         const {token} = request.body;
//         console.log(token);
            
//         const separtedInfo = separateToken(token);
              
//         const id=separtedInfo.id;
//         console.log(id);
        
//         const user = await usersModel.findById(id).exec();   
//         response.json(id)

//     } catch (err) {
//         response.status(500).json(err);
//     }
// })

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
        let newUser = new usersModel()
        newUser.firstName=firstName;
        newUser.lastName=lastName;
        newUser.email=email;
        newUser.password=password;
        newUser.admin = false;
        if (request.params.admin == '1') newUser.admin = true;

        await newUser.save()
        const token = await usersModel.generateAuthToken()
        //const editedtoken=editToken(newUser,_id,token)
        response.json( token )

    } catch (err) {
        response.status(500).json(err);
    }

});

users.post('/login', async function (request, response) {
    //login a user 
    try {
        const {email,password}= request.body
        
        
        const user = await usersModel.findByCredentials(email, password)
        if (!user) {
            return response.json({error: 'Wrong email or password!'})
        }
        
        
        const token = await user.generateAuthToken()
        
        const editedtoken = editToken(user._id,token)
        

        response.json( editedtoken )
        
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
        
        res.json({"msg":"from the server the user is logged out!"})
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