import React from "react"
import Alert from "react-bootstrap/Alert"

function FormError(props) {
  return <Alert variant='danger'>{props.children}</Alert>
}

export default FormError
