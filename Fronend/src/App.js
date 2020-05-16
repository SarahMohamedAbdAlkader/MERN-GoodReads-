import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

import AdminHome from "./screens/Admin"
import Navbar from "./components/Website/Navbar/Navbar"
import HomePage from "./components/Website/HomePage/HomePage"
function App() {
  const AdminloggedIn = true;
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/"> <HomePage /> </Route>
        <Route exact path="/admin"><AdminHome /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
