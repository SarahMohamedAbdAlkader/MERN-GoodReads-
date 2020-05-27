import React ,{ useState }from 'react';
import { Form , Button , Row } from 'react-bootstrap'
import axios from 'axios';

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const [cpassword, setcPassword]= useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName]= useState("");
    
  const handleSubmit= (e)=>{
    e.preventDefault();
    if(password != cpassword) alert("Passwords don't match..")
    else {
    axios.post('http://localhost:5000/users/register/2',{firstName,lastName,email,password} )
    .then(res => {
      console.log("da l res",res);
      alert("Welcome! Login to begin your reading journey") 
       
    })
    .catch(function(error){
      alert("This email already exists ")
    })
  }
  setEmail('')
  setPassword('')
  setcPassword('')
  setfirstName('')
  setlastName('')
}
  
  return (<Form   onSubmit={handleSubmit} >
   <h3>Create a free account now!</h3>
    
     <Form.Group as={Row} controlId="validationCustom01">
            <Form.Control  type="text"   style={{  marginLeft : '10px',width:'350px' }}  value={firstName} onChange={e => setfirstName(e.target.value)} placeholder="First Name"/>
    </Form.Group>
     
    <Form.Group  as={Row}  controlId="validationCustom02">
             <Form.Control  type="text"  style={{  marginLeft : '10px',width:'350px' }} value={lastName} onChange={e => setlastName(e.target.value)} placeholder="Last Name"/>
    </Form.Group>
    
    <Form.Group as={Row} controlId="formPlaintextEmail">
           <Form.Control  type="email"  style={{  marginLeft : '10px',width:'350px' }}  value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address"/>   
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
      <Form.Control type="password"   placeholder="Password"  style={{  marginLeft : '10px',width:'350px' }} value={password} onChange={e => setPassword(e.target.value)}/>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
      <Form.Control type="password"   placeholder="Confirm Password"  style={{  marginLeft : '10px',width:'350px' }} className="justify-content-md-center"  value={cpassword} onChange={e => setcPassword(e.target.value)}/>
  </Form.Group>



<Button type="submit" className="btn btn-warning" style={{marginLeft:'130px'}} >Register</Button>
</Form>);
}
export default RegisterForm;
