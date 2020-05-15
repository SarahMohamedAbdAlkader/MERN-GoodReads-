import React,{useState , useEffect} from 'react';
import {Card , Row , Col} from 'react-bootstrap'
//import img4 from './longest.jpg'
import axios from 'axios';
import {useParams} from "react-router";

function AuthorDetails() {
 
  const params = useParams();
  
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName]= useState("");
  const [authorImg, setImg] = useState("");
  const [arr,setarr]=useState([]);
  
  //const id = "5ebdc911b9c7bc1385204e14";
  const id=params.id;
  const getAuthorsInfo = ()=>{
    let url="http://localhost:8000/";
  
    axios.get(url+'authors/'+id)
    .then(res => {
      setfirstName(res.data.firstName)
      setlastName(res.data.lastName)
      setImg(url+res.data.photo)
      console.log(res.data.books);
      
      setarr(res.data.books)
      console.log(url+res.data.photo);
      
  })
  .catch(function (error) {
      console.log(error);
  })
  }
  
  useEffect(()=>{ 
    
      getAuthorsInfo()
      
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
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              {item._id}
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      })}
  </div>
  
  </div>);
}


export default  (AuthorDetails);