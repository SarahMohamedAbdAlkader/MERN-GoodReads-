import React  from 'react';
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoadBooks from '../LoadBooks/LoadBooks'
import {Row, Col} from 'react-bootstrap'

function HomePage() {

  return (<div>
      <LoginForm/>
      <Row className="justify-content-md-center">
          <Col>
            <LoadBooks/>
          </Col>
          <Col>
            <RegisterForm/>
          </Col>
      </Row>
  </div>)
}
export default HomePage;