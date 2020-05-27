import React,{useState , useEffect} from 'react';
import {Card , Row , Col, DropdownButton, Dropdown} from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
//import img4 from './longest.jpg'
import axios from 'axios';
import {useParams} from "react-router";
import {Redirect} from 'react-router-dom';


function AuthorDetails() {
 
  const params = useParams();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName]= useState("");
  const [authorImg, setImg] = useState("");
  const [arr,setarr]=useState([]);
  const [redirectPage,setRedirectState]= useState(null)
 
  let userRating=0;
  const authorId=params.id;
  const token = sessionStorage.getItem('userToken');
  
  const getAuthorsInfo = ()=>{
   
    axios.get("http://localhost:5000/"+'authors/'+authorId)
    .then(res => {
      setfirstName(res.data.firstName)
      setlastName(res.data.lastName)
      setImg("http://localhost:5000/"+res.data.photo)
      // console.log(res.data.books);  
      // setarr(res.data.books)
      // console.log(url+res.data.photo);
      
  })
  .catch(function (error) {
      console.log(error);
  })
  }
  const getAuthorsBooks = ()=>{
   console.log("athou erwjhkwrk;l");
   
    axios.get("http://localhost:5000/books/author/details/"+authorId+'/?token='+token)
    .then(res =>{
      setarr(res.data)
      console.log(res.data);
      userRating=res.data.rating;
      //setUserRating(res.data.rating)
      //userRating=res.data.rating
      console.log("DII L BOOKS L GAT YA NOUR");
      
      console.log(res.data);
      
    })
    .catch(function (error) {
      console.log(error);
  })
  }
  const handleSelectChange = (e,bookId)=>{
    console.log(token);
    
    if(token != null){
      const value=e.target.value; 
      axios.post("http://localhost:5000/shelves/"+token,{"state":value,bookId})
      .then(res =>{    
        console.log(res.data);   
      })
      .catch(function (error) {
        console.log(error);
     })
    }
    else {
      alert("You need to login first....")
     // return  <Redirect  to="/" />
     setRedirectState('/');
    }
  }
  const handleRatingChange = (e,bookId)=>{
    if(token != null){
      userRating=e;
      axios.post("http://localhost:5000/ratings/"+token,{"value":userRating,bookId})
      .then(res =>{    
        console.log(res.data);   
      })
      .catch(function (error) {
        console.log(error);
    })
  }else{
    alert("You need to login first....")
    //return  <Redirect  to="/" />
    setRedirectState('/')
  }
  }
  useEffect(()=>{ 
    
      getAuthorsInfo()
      getAuthorsBooks()
      
  }, []);
  if(redirectPage)return  <Redirect  to="/" /> 
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
          userRating=item.rating
          return <Card style={{  display : 'inline-block' }} >
          
          <Card.Body>
            <Card.Title>{item.book.name}</Card.Title>
            <Card.Text>
              Average Rating is : 
                  <div class="mt-2">
                    <ReactStars
                      count={5}
                      edit={false}
                      size={18}
                      color1={'grey'}
                      color2={'yellow'} 
                      value= {item.book.totalRatingValue/(item.book.totalRatingCount+1)}
                    />
                  </div>
            {item.book.totalRatingCount} ratings
            </Card.Text>
            {/* <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link> */}
          </Card.Body>
          <Card.Text>
              Rate the book!  
          </Card.Text>
                  
              <div class="mt-2">
              <ReactStars
                count={5}
                edit={true}
                onChange={(e)=>handleRatingChange(e,item.book._id)}
                size={24}
                color1={'grey'}
                color2={'yellow'} 
                value= {userRating}
              />
              
        </div>
        
            
        <select  onChange={(e)=> handleSelectChange(e,item.book._id)} >
        <option value= '' selected = {item.shelve === ''}></option>/>
        <option value= 'Read' selected = {item.shelve === 'Read'}>Read</option>/>
        <option value= 'Want To Read'  selected = {item.shelve === 'Want To Read'}>Want To Read</option>/>
        <option value= 'Currently Reading'  selected = {item.shelve === 'Currently Reading' }>Currently Reading</option>/>
        </select>
      
        </Card>
      })}
  </div>
  
  </div>);
}


export default  (AuthorDetails);
