import React , {useState} from 'react';
import {Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';

function LoginForm() {
  
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(email);
  console.log(password);

  axios.post('http://localhost:5000/users/login', {
      email,
      password
    })
    .then(res => {
      sessionStorage.setItem('userToken', JSON.stringify(res.data)) //add the token to the session storage as a string
      console.log("Logged in successfully");
      
      // console.log(res.data);
      // console.log(typeof(res.data) );
      //const tmp = sessionStorage.getItem('userToken');
      // console.log(typeof(tmp) );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      // console.log(tmp);
      // console.log(JSON.parse(tmp) );
      // console.log(typeof(tmp) );
    })
    .catch(function (error) {
      console.log(error);
    })
}
const getUserIdFromToken =()=>{
  
  const token = sessionStorage.getItem('userToken'); //fetch stringified token from session storage
 
  
 axios.get('http://localhost:5000/users/getUser/'+token)//bnb3to fl url fa asibo string 3adi
    .then(res => {
      console.log("The user id is "+res.data); // aho l id aho aho.......
    })

}
const logout = () => {
  console.log("In the logout function...");
  const token = JSON.parse(sessionStorage.getItem('userToken')); //fetch l token and parse it 3ashan hanb3to fl body bta3 l request
  sessionStorage.removeItem('userToken'); 
  const tmp = sessionStorage.getItem('userToken'); //just to check that the token is removed

  axios.post('http://localhost:5000/users/logout', { 
      token
    })
    .then(res => {
     console.log(res.data); 
     
    })
}
  return (<div className="d-flex justify-content-end">
           <Form onSubmit={handleSubmit} >
            <Form.Row>
              
              <Form.Group controlId="formGroupEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                  <Form.Control type="email" placeholder="email"  value={email} onChange={e => setEmail(e.target.value)}/>
              </Form.Group>
        
              <Form.Group controlId="formGroupPassword">
                {/* <Form.Label>Password</Form.Label> */}

                  <Form.Control type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
              </Form.Group>
                  <Col>
                      <Button type="submit" className="d-flex justify-content-center"  >Login</Button>
                  </Col>
            </Form.Row>
         </Form>
       
         <Button onClick={logout} className="d-flex justify-content-center" >Logout</Button>
         </div>);
}
export default LoginForm;
