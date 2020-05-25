import React,{useState , useEffect} from 'react';
import {Card , Row , Col, DropdownButton, Dropdown} from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
//import img4 from './longest.jpg'
import axios from 'axios';
import {useParams} from "react-router";

function AuthorDetails() {
 
  const params = useParams();
  
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName]= useState("");
  const [authorImg, setImg] = useState("");
  const [arr,setarr]=useState([]);
  
  const id=params.id;
  const getAuthorsInfo = ()=>{
    let url="http://localhost:5000/";
  
    axios.get(url+'authors/'+id)
    .then(res => {
      setfirstName(res.data.firstName)
      setlastName(res.data.lastName)
      setImg(url+res.data.photo)
      // console.log(res.data.books);
      
      // setarr(res.data.books)
      // console.log(url+res.data.photo);
      
  })
  .catch(function (error) {
      console.log(error);
  })
  }
  const getAuthorsBooks = ()=>{
    let url="http://localhost:5000/";
    axios.get(url+'books/author/'+id)
    .then(res =>{
      setarr(res.data)
      console.log(res.data);
      
    })
    .catch(function (error) {
      console.log(error);
  })
  }
  
  
  useEffect(()=>{ 
    
      getAuthorsInfo()
      getAuthorsBooks()
      
  }, []);
    
  return (<div>
 
  <Card>
   
  <Card.Title>{firstName}  {lastName}</Card.Title>
    <Card.Body>
      <Row style={{height:'150px'}}>
    
      <Card.Img src={authorImg} style={{width:'150px', height:'150px'}} />
  
      <Col>
      <Card.Text >
        {/* Author id is {params.id}. */}
                  
        Some quick example text to build on the card title and make up the bulk
        of the card's content. Some quick example text to build on the card title
         and make up the bul of the card's content. 
       
      </Card.Text>
      </Col>
      </Row>
    </Card.Body>
  </Card>
  <br />
 
  <div>
      <h3 >Authors Books!</h3>
      {arr.map((item)=>{
          return <Card style={{  display : 'inline-block' }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              Average Rating is : 
                  <div class="mt-2">
                    <ReactStars
                      count={5}
                      edit={false}
                      // onChange={ratingChanged}'#ffd700'
                      size={18}
                      color1={'grey'}
                      color2={'yellow'} 
                      value= {item.totalRatingValue/(item.totalRatingCount+1)}
                    />
                  </div>
            {item.totalRatingCount} ratings
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
          <Card.Text>
              Rate the book!  
              <div class="mt-2">
              <ReactStars
                count={5}
                edit={true}
                // onChange={ratingChanged}'#ffd700'
                size={24}
                color1={'grey'}
                color2={'yellow'} 
                value= {item.totalRatingValue/(item.totalRatingCount+1)}
              />,
        </div>
        <div>
        <DropdownButton id="dropdown-item-button" title="Dropdown button">
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton>
        </div>
              
            </Card.Text>
        </Card>
      })}
  </div>
  
  </div>);
}


export default  (AuthorDetails);
