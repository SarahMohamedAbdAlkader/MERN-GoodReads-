import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";

const SERVER_URL = "http://localhost:5000"
function Searchauthors() {
    const [data, setData] = useState([])
    const [authorId, setauthorId] = useState("")
    const params = useParams()
    const authorName = params.name;
    useEffect(() => {

        console.log(fetchData(`${SERVER_URL}/search/author/` + authorName, setData))

    }, [])
    return (
        <div >
        <div className="column mb-3 m-3">
        {
            data.map((author, index) =>
<div class="card mb-5">
<div class="row">
              <img src={`${SERVER_URL}/${author.authorImage}`} class="card-img" alt="..." style={{ height: 200, width: 220 }}/>
              <div class="column ml-3">
              <h2 class=" card-title font-italic ">{author.firstName} {author.lastName}</h2>
                   <Link to={"/authorDetails/" + author._id} ><h2 class=" card-footer font-italic ">Go To Author Details</h2> </Link>
              
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
export default Searchauthors;