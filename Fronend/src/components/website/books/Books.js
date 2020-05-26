import React from "react";
import "./Books.css";
import BeautyStars from "beauty-stars";
//import books from "../../Data.js";
import axios from "axios";
import ReactPaginate from "react-paginate";
const API_URL = "http://localhost:5000";
const options = [
  { id: 1, value: "Read", label: "Read" },
  { id: 2, value: "Reading", label: "Reading" },
  { id: 3, value: "want to read", label: "want to read" },
];

export default class All extends React.Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      books: [],
      postData: [],
      perPage: 10,
      currentPage: 0,
      //selectedPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  receivedData() {
    //data
    axios.get(`http://localhost:5000/books`).then((res) => {
      // console.log(res.data.books);
      const books = res.data.books;
      console.log(res.data);
      console.log(this.state.offset);

      const slice = books.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.postData = slice;
      this.setState({ postData: books });

      this.setState({
        pageCount: Math.ceil(res.data.dataLength / this.state.perPage),
      });
    });
  }
  handlePageClick = (e) => {
    console.log("hi");
    const selectedPage = e.selected;
    this.setState(
      {
        currentPage: selectedPage,
      },
      () => {
        axios.get(`http://localhost:5000/books/?page=` + 2).then((res) => {
          //convert to number
          const books = res.data.books; //??

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
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>{" "}
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
    );
  }

  renderTableData() {
    const { postData } = this.state;
    return postData.map((book, index) => {
      const {
        id,
        bookImage,
        name,
        author,
        totalRatingValue,
        myRating,
        shelve,
      } = book.book; //destructuring
      //console.log(book.book);

      return (
        <tr key={id}>
          <td>
            <img
              src={`${API_URL}/${bookImage}`}
              style={{ width: 15, height: 15 }}
              alt={name}
            />
          </td>
          <td>{name}</td>
          <td>
            {author.firstName} {author.lastName}
          </td>

          <td
            onChange={() => {
              console.log("changed");
            }}
          >
            <BeautyStars size={20} value={totalRatingValue} />
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
                  console.log(item);
                  if (item.id === editeId) {
                    item.myRating = e;
                    // item.rating=item.value;
                  }
                  return item;
                });
              }}
              //key={id}
              value={myRating}
              size={20}
            />
          </td>
          <td>
            <select>
              {options.map((item, id) => {
                return shelve === item.value ? (
                  <option key={item.id} value={item.value} selected>
                    {item.label}
                  </option>
                ) : (
                  <option key={item.id} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    //  let header = Object.keys(this.state.postData[0]);
    //return header.map((key, index) => {
    return (
      <tr>
        <th>cover</th>
        <th>Name</th>
        <th>Author</th>
        <th>Avg Rate</th>
        <th>Rating</th>
        <th>shelve</th>
      </tr>
    );
    //});
  }

  // rate: 0,

  renderRating(index) {
    const { postData } = this.state;

    const newBooks = postData.map((book, id) => {
      if (index === id) {
        return { ...book, totalRatingValue: this.state.rate };
      }
      return book;
    });
    this.setState({
      books: newBooks,
    });
  }
}
