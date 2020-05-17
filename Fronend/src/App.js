import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

// import AdminHome from "./screens/Admin"
import Navbar from "./components/Website/Navbar/Navbar"
import HomePage from "./components/Website/HomePage/HomePage"

import Categories from './components/Website/categories/Categories'
import Categorydetails from './components/Website/categories/Categorydetails'
import Books from './components/Website/books/Books'
import Book from './components/Website/bookDetails/Book'
import Authors from './components/Website/Authors/Authors'
import CategoryTable from "./components/Admin/Category/Table/CategoryTable"
import BookTable from "./components/Admin/Book/Table/BookTable"
import AuthorTable from "./components/Admin/Author/Table/AuthorTable"
import AdminLogin from "./components/Admin/Login/login"

function App() {
  const AdminloggedIn = true;
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {/* Admin Pages */}
        <Route exact path="/admin/">
          {AdminloggedIn ? <Redirect to="/admin/category" /> : <AdminLogin />}
        </Route>
        <Route exact path="/admin/category">
          {AdminloggedIn ? <CategoryTable /> : <Redirect to="/admin" />}
        </Route>
        <Route exact path="/admin/book">
          {AdminloggedIn ? <BookTable /> : <Redirect to="/admin" />}
        </Route>
        <Route exact path="/admin/author">
          {AdminloggedIn ? <AuthorTable /> : <Redirect to="/admin" />}
        </Route>

        {/* Website Pages */}
        <Route exact path="/"> <HomePage /> </Route>
        <Route exact path="/categories"><Categories /></Route>
        <Route exact path="/categories/:id"><Categorydetails /></Route>
        <Route exact path="/books/"><Books /></Route>
        <Route exact path="/books/:id"><Book /></Route>
        <Route exact path="/authors"><Authors /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
