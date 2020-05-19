import React from "react";
import "./Table.css";
import BeautyStars from "beauty-stars";
import books from "../../Data.js";

const options = [
  { value: "Read", label: "Read" },
  { value: "Reading", label: "Reading" },
  { value: "want to read", label: "want to read" },
];
export default class All extends React.Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      currentPage: 0,
      pageCount: 3,
      currentPageIndex: 1,
      perPage: 9,
      currentPageItems: books.slice(0, 10),
      // rate: 0,
      books: this.books,
    };
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
          <span onClick={this.leftHandler}>&laquo;</span>

          <span onClick={this.rightHandler}>&raquo;</span>
        </div>
      </div>
    );
  }

  rightHandler = () => {
    if (this.state.currentPageIndex < books.length / 10) {
      const sliceY = (this.state.currentPageIndex + 1) * 10;
      const sliceX = sliceY - 10;
      const value = books.slice(sliceX, sliceY);
      console.log(sliceY);
      console.log(sliceX);
      this.setState({
        currentPageItems: value,
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
        currentPageItems: value,
        currentPageIndex: this.state.currentPageIndex - 1,
      });
    }
  };

  handlePageClick = (data) => {
    this.setState({ currentPage: data.selected });
  };

  handleOnClickButton = (goTo) => {
    this.setState({
      currentPage: goTo,
    });
  };
  renderTableData() {
    return this.state.currentPageItems.map((book, index) => {
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
                books.map((item, index) => {
                  // console.log(item);
                  if (item.id == editeId) {
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
                return shelve == item.value ? (
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
}
