import React from 'react';
import NavBar from "../components/Admin/Navbar/Navbar"
import AdminLogin from "../components/Admin/Login/login"
import CategoryTable from "../components/Admin/Category/Table/CategoryTable"
import BookTable from "../components/Admin/Book/Table/BookTable"
import AuthorTable from "../components/Admin/Author/Table/AuthorTable"
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

function AdminHome() {
    const AdminloggedIn = true;
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/admin/login"><AdminLogin /></Route>
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


export default AdminHome;