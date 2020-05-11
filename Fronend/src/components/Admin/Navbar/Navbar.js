import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';



function NavBar() {
    return <Navbar bg="dark" variant="dark" className="mb-2">
        <Navbar.Brand Link to="/home">GoodReads</Navbar.Brand>
        <Nav className="mr-auto">
            <NavLink to="/admin/category" className="nav-link" activeClassName="text-danger">Category</NavLink>
            <NavLink to="/admin/book" className="nav-link" activeClassName="text-danger">Book</NavLink>
            <NavLink to="/admin/author" className="nav-link" activeClassName="text-danger">Author</NavLink>
        </Nav>
    </Navbar>
}

export default NavBar


