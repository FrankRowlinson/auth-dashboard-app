import React from "react"
import { useCookies } from "react-cookie"
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik"
import * as Yup from "yup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FormError from "./FormError"
import axios from "axios"

function AuthForm() {
  const [, setCookie] = useCookies()

  const initialValues = {
    username: "",
    password: "",
  }

  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/login", data).then((res) => {
      if (res.data.hasOwnProperty("error")) {
        alert(res.data.error)
        resetForm({
          values: initialValues,
        })
      } else {
        setCookie("authToken", res.data.token, { path: "/" })
      }
    })
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <FormikForm className='w-100 h-100'>
        <Form.Group>
          <Form.Label class='d-block text-start'>Username</Form.Label>
          <Field
            className='form-control'
            id='auth-username'
            name='username'
            placeholder='Your username...'
          />
          <ErrorMessage name='username' component={FormError} />
        </Form.Group>
        <Form.Group>
          <Form.Label class='d-block text-start'>Password</Form.Label>
          <Field
            className='form-control'
            id='auth-password'
            name='password'
            placeholder='Your secret password...'
            type='password'
          />
          <ErrorMessage name='password' component={FormError} />
        </Form.Group>
        <Button className='mt-3' variant='dark' type='submit'>
          Sign In
        </Button>
      </FormikForm>
    </Formik>
  )
}

export default AuthForm
