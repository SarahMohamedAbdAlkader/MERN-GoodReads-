import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

import AdminLogin from "./components/Admin/Login/login"
import CategoryTable from "./components/Admin/Category/Table/CategoryTable"
import BookTable from "./components/Admin/Book/Table/BookTable"
import AuthorTable from "./components/Admin/Author/Table/AuthorTable"
import NavBar from "./components/Admin/Navbar/Navbar"


function App() {
  const AdminloggedIn = true;
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/admin"><AdminLogin /></Route>
        <Route exact path="/admin/category">
          {AdminloggedIn ? <CategoryTable/> : <Redirect to="/admin" />}
        </Route>
        <Route exact path="/admin/book">
          {AdminloggedIn ? <BookTable/> : <Redirect to="/admin" />}
        </Route>
        <Route exact path="/admin/author"> 
        {AdminloggedIn ? <AuthorTable /> : <Redirect to="/admin" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
