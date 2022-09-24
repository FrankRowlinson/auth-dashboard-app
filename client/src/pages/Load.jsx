import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

function Load() {
  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center">
      <Spinner animation="grow"></Spinner>
    </Container>
  )
}

export default Load
