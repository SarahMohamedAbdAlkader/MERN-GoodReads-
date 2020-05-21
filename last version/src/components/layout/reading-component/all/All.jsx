import React from "react";
import "./Table.css";
import BeautyStars from "beauty-stars";
//import books from "../../Data.js";
import axios from "axios";
import ReactPaginate from "react-paginate";
const options = [
  { value: "Read", label: "Read" },
  { value: "Reading", label: "Reading" },
  { value: "want to read", label: "want to read" },
];

export default class All extends React.Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      books: [],
      postData: [],
      perPage: 10,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  receivedData() {
    //data
    axios.get(`http://localhost:5000/books`).then((res) => {
      const books = res.books.cats;
      console.log(books, "dd", res.books.page);
      const slice = books.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.postData = slice;
      this.setState({ postData: books });

      this.setState({
        pageCount: Math.ceil(res.books.dataLength / this.state.perPage),
      });
    });
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
            const books = res.books.cats; //??
            this.postData = books;
            this.setState({ postData: books });
          });
      }
    );
  };

  componentDidMount() {
    this.receivedData();
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
        <div className="pagination">
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

  /*   rightHandler = () => {
    if (this.state.currentPageIndex < books.length / 10) {
      const sliceY = (this.state.currentPageIndex + 1) * 10;
      const sliceX = sliceY - 10;
      const value = books.slice(sliceX, sliceY);
      console.log(sliceY);
      console.log(sliceX);
      this.setState({
        books: value,
        currentPageIndex: this.state.currentPageIndex + 1,
      });
    }
  };
  leftHandler = () => {
    if (this.state.currentPageIndex > 1) {
      const sliceY = (this.state.currentPageIndex - 1) * 10;
      const sliceX = sliceY - 10;
      const value = books.slice(sliceX, sliceY);
      console.log(sliceY);
      console.log(sliceX);
      this.setState({
        books: value,
        currentPageIndex: this.state.currentPageIndex - 1,
      });
    }
  }; */

  handlePageClick = (data) => {
    this.setState({ currentPage: data.selected });
  };

  handleOnClickButton = (goTo) => {
    this.setState({
      currentPage: goTo,
    });
  };
  renderTableData() {
    const { postData } = this.state;
    return postData.map((book, index) => {
      const { id, name, author, avgRate, rating, option, shelve } = book; //destructuring

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
                postData.map((item, index) => {
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
    let header = Object.keys(this.state.books[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  // rate: 0,

  renderRating(index) {
    const { postData } = this.state;

    const newBooks = postData.map((book, id) => {
      if (index === id) {
        return { ...book, rating: this.state.rate };
      }
      return book;
    });
    this.setState({
      books: newBooks,
    });
  }
}
