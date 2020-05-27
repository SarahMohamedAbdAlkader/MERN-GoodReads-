import React ,{useState, useEffect } from 'react';
import {Card  } from 'react-bootstrap'
import {Link } from 'react-router-dom';
import axios from 'axios';
function Authors() {
    const [arr,setArr] = useState([])

    const getAllAuthors = ()=>{

      let url="http://localhost:5000/";
  
      axios.get(url+'authors/')
      .then(res => {   
        setArr(res.data)
        console.log(res.data);
      })
    }
    
    useEffect(()=>{ 
     getAllAuthors() 
    }, []);
  
    
    return (<div>
        
        {arr.map((item)=>{
            return <Card style={{ width: '18rem' , display : 'inline-block' , marginRight:'10px'}}>
            <Card.Body >
              <Card.Title>{item.firstName}</Card.Title>
              <Card.Img src={"http://localhost:5000/"+item.authorImage} style={{width:'150px', height:'150px'}} />
              <Card.Text>Number of Books: </Card.Text>            
               <Link style={{marginLeft:'20%'}} to={"/authorDetails/"+item._id} >Go To Author Details</Link>
            </Card.Body>
          </Card>
        })}
    </div>);
}
export default Authors;
