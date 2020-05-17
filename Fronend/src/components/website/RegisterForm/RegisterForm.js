import React ,{useState}from 'react';
import {Form,Button ,Row} from 'react-bootstrap'
import axios from 'axios';

//confirm password wl email gedid wala la?
function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const [cpassword, setcPassword]= useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName]= useState("");


    
  const handleSubmit= (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/users/register/2',{firstName,lastName,email,password})
    .then(res => {
      localStorage.setItem('userToken',res.data)
      const tmp=localStorage.getItem('userToken');
      console.log(tmp);
      
    })
  }
  
  return (<Form  onSubmit={handleSubmit}>
   <h3>New here? Create a free account!</h3>
    <Form>
     <Form.Group as={Row} controlId="validationCustom01">
            <Form.Control  type="text" required  style={{  marginLeft : '10px' }}  value={firstName} onChange={e => setfirstName(e.target.value)} placeholder="First Name"/>
    </Form.Group>
     
    <Form.Group  as={Row}  controlId="validationCustom02">
             <Form.Control required type="text"   style={{  marginLeft : '10px' }}  value={lastName} onChange={e => setlastName(e.target.value)} placeholder="Last Name"/>
    </Form.Group>
    
    <Form.Group as={Row} controlId="formPlaintextEmail">
           <Form.Control  type="email" style={{  marginLeft : '10px' }}  value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address"/>   
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
      <Form.Control type="password"   placeholder="Password" style={{  marginLeft : '10px' }}  value={password} onChange={e => setPassword(e.target.value)}/>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
      <Form.Control type="password"   placeholder="Confirm Password" className="justify-content-md-center"  value={cpassword} onChange={e => setcPassword(e.target.value)}/>
  </Form.Group>

</Form>

{/* <Form.Group>
    <Form.Check  required label="Agree to terms and conditions" feedback="You must agree before submitting." />
</Form.Group> */}

<Button type="submit"  style={{ marginLeft : '120px'}}>Register</Button>
</Form>);
}
export default RegisterForm;
