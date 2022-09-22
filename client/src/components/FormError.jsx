import React from "react"
import Alert from "react-bootstrap/Alert"

function FormError(props) {
  return <Alert variant='danger p-1'>{props.children}</Alert>
}

export default FormError
