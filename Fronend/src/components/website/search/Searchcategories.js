import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
import ReactStars from 'react-rating-stars-component'
const SERVER_URL = "http://localhost:5000"
const catName = window.location.pathname.split('/')[2]
function Searchcategories() {
    const [data, setData] = useState([])

    const params = useParams()
    const catName = params.name;
    useEffect(() => {

        console.log(fetchData(`${SERVER_URL}/search/category/` + catName, setData))
    
      }, [])




    return (
        <div >
                       <div class="row  m-5 d-flex justify-content-around text-center">
                {
                data.map((category, index) =>
                <div key={index} class="card bg-info mb-3 p-3 " style={{ width: 300 }}>

      <Link  class=" text-white  font-italic " style={{fontSize:25 }} to={"/categories/" + category._id}>{category.catName}</Link>
      <Link to={"/categories/" + category._id} ><h2 class="bg-light card-footer font-italic ">Go To Category Details Yalaaaaaa=></h2> </Link>
              
    </div>
                 ) }
                </div>
      </div>

    
        )
}
async function fetchData(url, setData) {
    let response = await fetch(url)
    let data = await response.json();
    console.log("data", data);
  
    setData(data.result);
  console.log(data.result)
 
  }
  
export default Searchcategories;
