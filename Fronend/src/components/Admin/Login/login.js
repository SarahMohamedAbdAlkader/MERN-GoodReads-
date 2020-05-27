import React from 'react';
import './login.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';
function AdminLogin({ AdminloggedIn }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return <div id="login">
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form" method="post" onSubmit={(e) => {
                            e.preventDefault();
                            console.log(email);
                            console.log(password);


                            axios.post('http://localhost:5000/users/login', {email,password})
                                .then(res => {
                                    if(res.data.admin){
                                        sessionStorage.setItem('userToken', JSON.stringify(res.data))
                                       return  <Redirect to="/admin/category" />
                                        console.log("stored");
                                    }
                                })
                                .catch(function (error) {
                                    console.log("sorry wrong cred");
                                    
                                    console.log(error);
                                })
                        }}>
                            <h3 class="text-center text-info">Welcome To Admin Panel</h3>
                            <div class="form-group">
                                <label for="username" class="text-info">Email:</label><br />
                                <input type="text" name="email" id="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br />
                                <input type="password" name="password" id="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

const handleLogIn = (e) => {
    // e.preventDefault();
    // console.log("submitted");
    // log

}

export default AdminLogin