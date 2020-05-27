import React from 'react';
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoadBooks from '../LoadBooks/LoadBooks'
import {Row, Col, Container} from 'react-bootstrap'

function HomePage() {
  
  return (<div>
       
       { sessionStorage.getItem('userToken')==null &&
        <div style={{marginTop:'20px'}} > <LoginForm/></div>
       }
        <Container>
        <Row className="justify-content-md-center">
            <Col sm={8}>
              <LoadBooks/>
            </Col>
            {  sessionStorage.getItem('userToken')==null &&
            <Col >
              <div><RegisterForm/></div>
            </Col>
            }
          </Row>
          </Container>
  </div>)
}
export default HomePage;