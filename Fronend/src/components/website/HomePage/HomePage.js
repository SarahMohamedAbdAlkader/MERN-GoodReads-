import React  from 'react';
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoadBooks from '../LoadBooks/LoadBooks'
import {Row, Col, Container} from 'react-bootstrap'

function HomePage() {

  return (<div>
        <div style={{marginTop:'20px'}} /* hidden={sessionStorage.getItem('userToken')!=null}*/> <LoginForm/></div>
        <Container>
        <Row className="justify-content-md-center">
            <Col sm={8}>
              <LoadBooks/>
            </Col>
            <Col sm={4}>
              <div /* hidden={sessionStorage.getItem('userToken')!=null}*/><RegisterForm/></div>
            </Col>
          </Row>
          </Container>
  </div>)
}
export default HomePage;