import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import RegistrationForm from "../components/RegistrationForm"
import AuthForm from "../components/AuthForm"

function Auth() {
  const [loginMessage, setLoginMessage] = useState({})
  const [regMessage, setRegMessage] = useState({})
  return (
    <Row className='min-vh-100 justify-content-around align-items-center'>
      <aside className='col-md-4 mb-4 mb-md-0'>
        <Card className='p-4 shadow-lg mt-3 mt-md-0'>
          <Card.Title className='text-center mb-4 mt-1'>Login</Card.Title>
          <AuthForm message={loginMessage} setMessage={setLoginMessage} />
        </Card>
      </aside>
      <aside className='col-md-4'>
        <Card className='shadow-lg p-4'>
          <Card.Title className='text-center mb-4 mt-1'>
            Registration
          </Card.Title>
          <RegistrationForm message={regMessage} setMessage={setRegMessage} />
        </Card>
      </aside>
    </Row>
  )
}

export default Auth
