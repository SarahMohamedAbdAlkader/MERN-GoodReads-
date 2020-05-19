import React from "react";
import All from "./reading-component/all/All";
import Current from "./reading-component/currently-reading/Current";
import Read from "./reading-component/read/Read";
import Want from "./reading-component/want-to-read/Want";
import "./layout.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="container">
      <Router>
        <div className="sideBarContainer">
          <ul>
            <ul className="readingProgress">
              <Link to="/all">All Books</Link>
            </ul>
            <ul className="readingProgress">
              <Link to="/current">Currently Reading</Link>
            </ul>
            <ul className="readingProgress">
              <Link to="/Read">Read Books</Link>
            </ul>
            <ul className="readingProgress">
              <Link to="/want">Want to Read</Link>
            </ul>
          </ul>
        </div>
        <div>
          <hr />
        </div>

        <div className="tableContainer">
          <Switch>
            <Route exact path="/">
              <All />
            </Route>
            <Route exact path="/all">
              <All />
            </Route>
            <Route path="/current">
              <Current />
            </Route>
            <Route path="/read">
              <Read />
            </Route>
            <Route path="/want">
              <Want />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
