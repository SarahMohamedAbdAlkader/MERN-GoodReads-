import React from 'react';
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoadBooks from '../LoadBooks/LoadBooks'
import {Row, Col, Container} from 'react-bootstrap'

function HomePage() {
  
  return (<div>
      <Row  style={{marginTop:'20px'}}>
        <Col>
        <h3 style={{marginLeft:'150px'}}>Welcome to Book Reads!</h3>
        </Col>
       { sessionStorage.getItem('userToken')==null &&
        <div > <LoginForm/></div>
       }
       </Row>
        <Container>
        <Row className="justify-content-md-center">
            <Col sm={8}>
              <LoadBooks/>
            </Col>
            {  sessionStorage.getItem('userToken')==null &&
            <Col >
              <div className = "d-flex justify-content-end"><RegisterForm/></div>
            </Col>
            }
          </Row>
          </Container>
  </div>)
}
export default HomePage;