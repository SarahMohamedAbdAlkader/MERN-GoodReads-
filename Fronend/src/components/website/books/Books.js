import React from "react";
import Tables from "./table/Tables";
import "./Books.css";
import ReactPaginate from "react-paginate";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
const SERVER_URL = "http://localhost:5000";
//import ReactPaginate from "react-paginate";
const token = sessionStorage.getItem("userToken");
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelveState: "all",
      books: [],
      postData: [],
      perPage: 10,
      currentPage: 1,
      booksChanges: false,
      offset: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  receivedData() {
    //data
    axios
      .get(`${SERVER_URL}/books/` + token + "/" + this.state.shelveState)
      .then((res) => {
        // console.log("data received at books ==>", res.data.books);
        const books = res.data.books;
        //console.log("Received data assigned: ==> ", books);
        //console.log(this.state.offset);
        const slice = books.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
        this.postData = slice;
        this.setState({ postData: books });
        //console.log("Received data  sliced ==>", this.postData);

        this.setState({
          pageCount: Math.ceil(res.data.dataLength / this.state.perPage),
        });
      });
  }
  componentDidMount() {
    this.receivedData();
  }
  handlePageClick = (e) => {
    console.log("hi");
    const selectedPage = e.selected;
    this.setState(
      {
        currentPage: selectedPage,
      },
      () => {
        axios
          .get(
            `${SERVER_URL}/books/${token}/${this.state.shelveState}/?page=` +
              parseInt(selectedPage)
          )
          .then((res) => {
            const books = res.data.books;

            this.postData = books;
            this.setState({ postData: books });
          });
      }
    );
  };
  render() {
    return (
      <div className='container'>
        <div className='sideBarContainer'>
          <ul onClick={(e) => console.log(e.target)}>
            <ul className='readingProgress'>
              <Link onClick={this.renderAll}>All Books</Link>
            </ul>
            <ul className='readingProgress'>
              <Link onClick={this.renderCurrent}>Currently Reading</Link>
            </ul>
            <ul className='readingProgress'>
              <Link onClick={this.renderRead}>Read Books</Link>
            </ul>
            <ul className='readingProgress'>
              <Link onClick={this.renderWant}>Want to Read</Link>
            </ul>
          </ul>
        </div>
        <div>
          <hr />
        </div>

        <div className='tableContainer'>
          <Tables
            booksChanges={this.state.booksChanges}
            books={this.state.books}
            postData={this.state.postData}
          />
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
  renderAll = (e) => {
    this.setState({ shelveState: "all" });
    console.log(this.state.shelveState);
    this.receivedData();
  };
  renderCurrent = (e) => {
    this.setState({ shelveState: "Currently Reading" });
    console.log(this.state.shelveState);
    this.receivedData();
  };
  renderRead = (e) => {
    this.setState({ shelveState: "Read" });
    console.log(this.state.shelveState);
    this.receivedData();
  };
  renderWant = (e) => {
    this.setState({ shelveState: "Want To Read" });
    console.log(this.state.shelveState);
    this.receivedData();
  };
}
