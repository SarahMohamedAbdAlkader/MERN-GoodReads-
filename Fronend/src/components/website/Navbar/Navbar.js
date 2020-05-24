import React from 'react';
import FAVPNG from '../../assests/FAVPNG.png'
import gwordlogo from '../../assests/gwordlogo.png'
import login from '../../assests/login.png'
import user from '../../assests/user.png'
import './Navbar.css'
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom'
import Categories from '../categories/Categories'
import Categorydetails from '../categories/Categorydetails'
import Books from '../books/Books'
import Book from '../bookDetails/Book'
import Authors from '../Authors/Authors'
function Navbar() {
  return (<React.Fragment>
    <nav class=" navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between ">
      <img class="navbar-brand img" src={FAVPNG} alt="goodreads" />
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item active m-auto" >

            <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>

          </li>
          <li class="nav-item m-auto">
            <Link class="nav-link" to="/categories">Categories</Link>

          </li>

          <li class="nav-item m-auto">
            <Link class="nav-link" to="/books">Books</Link>
          </li>
          <li class="nav-item m-auto">
            <Link class="nav-link" to="/authors">Authors</Link>
          </li>


          <li class="col-3 ">
            <img class="img2" src={gwordlogo} />
          </li>
        </ul>
        <form class="form-inline col-4 my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div class="col-2  ">
          <div class="row">
          <Link><img class=" img mr-3" src={user} /></Link>
          
          <Link> <img class="img" src={login} /></Link>
          </div>
        </div>
      </div>
    </nav>
  </React.Fragment>
  );
}

export default Navbar;
