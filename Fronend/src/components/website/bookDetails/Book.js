import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import ReactStars from 'react-rating-stars-component'


const bookId = window.location.pathname.split('/')[2]
const token = sessionStorage.getItem('userToken');
const SERVER_URL = "http://localhost:5000"
function Book() {
  const [data, setData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState({})
  const [author, setAuthor] = useState({})
  const [myRating, setMyRating] = useState({})
  const [userReview, setUserReview] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const bookId = window.location.pathname.split('/')[2]
    const token = sessionStorage.getItem('userToken');
    console.log(fetchData(`${SERVER_URL}/books/` + bookId, setData, setCategory, setAuthor, setReviews))


    axios.get('http://localhost:5000/ratings/' + token + "/" + bookId)
      .then(res => {
        if (res.status === 200) {
        console.log("The user rating " + "ddd", res.data.value); // el rating ya basha
        setMyRating(res.data.value)}
        else {
          setMyRating(0)
        }
      })
    axios.get('http://localhost:5000/shelve/' + token + "/" + bookId)
      .then(res => {
        if (res.status === 200) {
        console.log("The user shelve ", res.data.state);
        setSelectedOption(res.data.state)}
        else {
          setSelectedOption("")
        }

      })

  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userReview);

    axios.post('http://localhost:5000/reviews/' + token, {
      bookId,
      userReview,
    })
      .then(res => {
        console.log(res.data) 
        if (res.status === 200) {
        setReviews([...reviews, res.data])}
        else {
          alert("Please,Login to add Your Review ")
          console.log("no")
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Please,Login to add Your Review ")
      })

  }
  const ratingChanged = (value) => {

    let bookId = window.location.pathname.split('/')[2];
    axios.post('http://localhost:5000/ratings/' + sessionStorage.getItem('userToken'), { bookId, value })
      .then(res => {
        console.log("The user rating " + res.data); // el rating ya basha

      })

  }
  const shelveOption = (e) => {
    console.log(e.target.value);

    axios.post('http://localhost:5000/shelve/' + sessionStorage.getItem('userToken'), { bookId: window.location.pathname.split('/')[2], state: e.target.value })
      .then(res => {
        console.log("The user shelve " + res.data);
        setSelectedOption(res.data)
      })

  }




  return (
    <React.Fragment>
      <div class="mb-3 m-3" >
        <div class="row no-gutters">
          <div class="col-md-2 ">
            <img src={`${SERVER_URL}/${data.bookImage}`} class="card-img" alt="..." style={{ height: 200, width: 220 }} />
            <div class="mt-2">

              <select name="options" id="options" onChange={shelveOption} value={selectedOption} >
                <option value="want to read" >Want To Read</option>
                <option value="currently reading">Currently Reading</option>
                <option value="read">Read</option>

              </select>
            </div>
            <div class="mt-2 column">
              <p class="card-text"><small class="text-muted">my Rating</small></p>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'}
                value={myRating} />
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title text-dark">{data.name}</h5>
              <p class=" text-dark ">By:  <Link class="text-info" to={"/authorDetails/" + author._id}>{author.firstName} {author.lastName} </Link> </p>
              <p class=" text-dark"> Category: <Link class="text-info" to={"/categories/" + category._id}>{category.catName} </Link> </p>
              <div class="row">
                <ReactStars
                  count={5}
                  value={data.totalRatingValue / data.totalRatingCount}
                  size={24}
                  edit={false}
                  color2={'#ffd700'} />
                <p class="mt-2  ml-3">{data.totalRatingValue / data.totalRatingCount} - {data.totalRatingCount}  ratings</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Reviews</h5>
          {
            reviews.map((review, index) =>

              <div key={index} >

                <p class=" font-italic ">{review.text}</p>

              </div>

            )}
        </div>
        <form class="form-inline col-4 my-2 my-lg-0 m-auto" onSubmit={handleSubmit}>
          <input class="form-control mr-sm-2" placeholder="Your Review" aria-label="Review" value={userReview} onChange={e => setUserReview(e.target.value)}></input>
          <button class="btn btn-warning  m-auto my-2 my-sm-0" type="submit">Add Review</button>
        </form>
      </div>

    </React.Fragment>
  );
}
async function fetchData(url, setData, setCategory, setAuthor, setReviews) {
  let response = await fetch(url)
  let data = await response.json();
  console.log("books-data", data);

  setData(data.book);
  setCategory(data.book.category)
  setAuthor(data.book.author)
  setReviews(data.bookReviews)
  console.log(data.bookReviews)

  const avgRating = (data.book.totalRatingValue / data.book.totalRatingCount)
  console.log("The Average: " + avgRating);
}
export default Book;
