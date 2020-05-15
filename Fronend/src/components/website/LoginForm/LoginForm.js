import React , {useState} from 'react';
import {Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';

function LoginForm() {
const [email, setEmail] = useState("");
const [password, setPassword]= useState("");

const handleSubmit = (e)=>{
  e.preventDefault();
  console.log(email);
  console.log(password);
 
  axios.post('http://localhost:8000/users/login',{email,password})
  .then(res => {
    localStorage.setItem('userToken',res.data)
    const tmp=localStorage.getItem('userToken');
    console.log(tmp);
  })
  .catch(function (error) {
    console.log(error);
})
}
  const  logout = ()=>{
    console.log("ANA FL LOGOUT");
    const token=localStorage.getItem('userToken');
  
    localStorage.removeItem('userToken'); 
    const tmp=localStorage.getItem('userToken');
    console.log(tmp);
    axios.post('http://localhost:8000/users/logout',{token,email})
    .then(res => {
      localStorage.setItem('userToken',res.data)
      const tmp=localStorage.getItem('userToken');
      console.log(tmp);
      
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