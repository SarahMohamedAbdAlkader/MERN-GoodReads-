import React from "react";
import "./Table.css";
import BeautyStars from "beauty-stars";
import books from "../../Data.js";
import ReactPaginate from "react-paginate";
import axios from "axios";

const options = [
  { value: "Read", label: "Read" },
  { value: "Reading", label: "Reading" },
  { value: "want to read", label: "want to read" },
];
export default class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //currentPage: 0,
      perPage: 9,
      pageCount: 3,
      currentPageIndex: 1, //currentPage
      currentPageItems: [],
      //currentPageItems: books.slice(0, 10),
      books: this.books, //books []
      //books: [],
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  render() {
    return (
      <div>
        <h1 className="readingProgress">All books</h1>
        <table id="books">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>{" "}
        <div class=" d-flex justify-content-center">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
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

  handleOnClickButton = (goTo) => {
    this.setState({
      currentPage: goTo,
    });
  };
  renderTableData() {
    return this.state.currentPageItems.map((book, index) => {
      const { id, name, author, avgRate, rating, option, shelve } = book; //destructuring
      //const { currentPageItems } = this.state;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{author}</td>

          <td
            onChange={() => {
              console.log("changed");
            }}
          >
            <BeautyStars size={20} value={avgRate} />
          </td>
          <td onClick={(e) => console.log(e.target)}>
            <BeautyStars
              /* value={this.rate} */
              onChange={(e) => {
                this.renderRating(index);
                console.log(book.id);
                const editeId = book.id;
                console.log(editeId);
                books.map((item, index) => {
                  // console.log(item);
                  if (item.id === editeId) {
                    item.rating = e;
                    // item.rating=item.value;
                  }
                  return item;
                });
              }}
              //key={id}
              value={rating}
              size={20}
            />
          </td>
          <td>
            <select>
              <option value=""></option>
              {options.map((item) => {
                return shelve === item.value ? (
                  <option value={item.value} selected>
                    {item.label}
                  </option>
                ) : (
                  <option value={item.value}>{item.label}</option>
                );
              })}
            </select>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.currentPageItems[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  // rate: 0,

  renderRating(index) {
    const newBooks = books.map((book, id) => {
      if (index === id) {
        return { ...book, rating: this.state.rate };
      }
      return book;
    });
    this.setState({
      books: newBooks,
    });
  }

  //Pagination:

  receiveBooks() {
    axios.get(`http://localhost:5000/books`).then((res) => {
      //solve
      const books = res.books.Book;
      console.log(books, "dd", res.books.page);
      const slice = books.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.state.currentPageItems = slice;
      this.setState({ currentPageItems: books });

      this.setState({
        pageCount: Math.ceil(res.books.booksLength / this.state.perPage),
      });
    });
  }
  componentDidMount() {
    this.receiveBooks();
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    this.setState(
      {
        currentPage: selectedPage,
      },
      () => {
        axios
          .get(`http://localhost:5000/books/?page=` + selectedPage + 1)
          .then((res) => {
            //solve
            const books = res.books.Book;
            this.state.currentPageItems = books;
            this.setState({ currentPageItems: books });
          });
      }
    );
  };
}
