import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import {Link} from 'react-router-dom'
 import Select from 'react-select'
 import ReactStars from 'react-rating-stars-component'

const options = [
  { value: 'want to read', label: 'Want To Read' },
  { value: 'read', label: 'Read' },
  { value: 'msh fakra', label: '7aga talata' }
]

const SERVER_URL = "http://localhost:5000"
function Book() {
  const [data, setData] = useState({});
  const [category,setCategory]=useState({})
  const [author,setAuthor]=useState({})
  useEffect(() => {let url=window.location.pathname.split('/')[2]
  console.log(url)
    console.log(fetchData(`${SERVER_URL}/books/`+url, setData,setCategory,setAuthor)
    )
    

}, [])
const ratingChanged = (newRating) => {
  console.log(newRating)
}

 
  return (
<React.Fragment>
<div class="mb-3 m-3" >
  <div class="row no-gutters">
    <div class="col-md-2 ">
      <img src= {`${SERVER_URL}/${data.bookImage}`}class="card-img" alt="..." style={{ height: 200,width: 220}}/>
     <div class="mt-2">
      <Select options={options} />
      </div>
      <div class="mt-2">
      <ReactStars
  count={5}
  onChange={ratingChanged}
  size={24}
  color2={'#ffd700'} />,
      </div>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title text-dark">{data.name}</h5>
        <p class=" text-dark ">By:  <Link class="text-info"  to={"/author/" + author._id}>{author.firstName}{author.lastName} </Link> </p>
        <p class=" text-dark"> Category: <Link class="text-info"  to={"/categories/" +category._id}>{category.catName} </Link> </p>
        <ReactStars
  count={5}
  onChange={ratingChanged}
  size={24}
  color2={'#ffd700'} />,
      
      </div>
    </div>
  </div>
</div>
<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">Reviews</h5>

    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
</React.Fragment>
  );
}
async function fetchData(url, setData,setCategory,setAuthor) {
    let response = await fetch(url)
    let data = await response.json();
    console.log("books-data",data);
    
    setData(data);
    setCategory(data.category)
    setAuthor(data.author)
}
export default Book;