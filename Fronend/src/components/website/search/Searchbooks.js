import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
import ReactStars from 'react-rating-stars-component'
const SERVER_URL = "http://localhost:5000"
const bookname = window.location.pathname.split('/')[2]
function Searchbooks() {
    const [data, setData] = useState([])
    const [bookId, setbookId] = useState("")
    const params = useParams()
    const bookname = params.name;
    useEffect(() => {

        console.log(fetchData(`${SERVER_URL}/search/book/` + bookname, setData))
    
      }, [])




    return (
        <div >
        <div className="column mb-3 m-3">
        {
            data.map((book, index) =>
<div class="card mb-5">
<div class="row">
              <img src={`${SERVER_URL}/${book.bookImage}`} class="card-img" alt="..." style={{ height: 200, width: 220 }}/>
              <div class="column ml-3">
              <h2 class=" card-title font-italic ">{book.name}</h2>
                <p class=" text-dark ">By:  <Link class="text-info" to={"/authorDetails/" + book.author._id}>{book.author.firstName} {book.author.lastName} </Link> </p>
              <p class=" text-dark"> Category: <Link class="text-info" to={"/categories/" + book.category._id}>{book.category.catName} </Link> </p>
              
                <p> average ratings</p>
              <ReactStars
                  count={5}
                  value={book.totalRatingValue / book.totalRatingCount}
                  size={24}
                  edit={false}
                  color2={'#ffd700'} />
                   <Link to={"/books/" + book._id} ><h2 class=" card-footer font-italic ">Go To Book Details Yalaaaaaa=></h2> </Link>
              
                  </div>

                  </div>
</div>
            )}
            
        </div>
      </div>

    
        )
}
async function fetchData(url, setData) {
    let response = await fetch(url)
    let data = await response.json();
    console.log("books-data", data);
  
    setData(data.result);
  console.log(data.result)
 
  }
  
export default Searchbooks;
