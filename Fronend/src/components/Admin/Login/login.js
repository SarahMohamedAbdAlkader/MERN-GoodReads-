import React from 'react';
import './login.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

function AdminLogin({AdminloggedIn}) {
    // return <h1>nav bar{props.name}</h1>
    //  AdminloggedIn = false;
    // if(AdminloggedIn)
    // <Redirect to="/admin" />
    
    return <div id="login">
    {/* {AdminloggedIn ? "" : <Redirect to="/admin" />} */}
    <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
            <div id="login-column" class="col-md-6">
                <div id="login-box" class="col-md-12">
                    <form id="login-form" class="form" action="" method="post">
                        <h3 class="text-center text-info">Welcome To Admin Panel</h3>
                        <div class="form-group">
                            <label for="username" class="text-info">Username:</label><br/>
                            <input type="text" name="username" id="username" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label for="password" class="text-info">Password:</label><br/>
                            <input type="text" name="password" id="password" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <input type="submit" name="submit" class="btn btn-info btn-md" value="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

}

export default AdminLogin