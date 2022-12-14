import React from "react"
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik"
import * as Yup from "yup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FormError from "./FormError"
import FormMessage from "./FormMessage"
import axios from "axios"

const HOST = process.env.REACT_APP_HOST || "http://localhost:3001/"

function RegistrationForm(props) {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  }

  const message = {
    error: {
      text: "Try different username or email",
      status: 1
    },
    success: {
      text: "User has been created",
      status: 0
    }
  }

  const onSubmit = (data) => {
    axios.post(`${HOST}register`, data).then((res) => {
      props.setMessage(res.data.hasOwnProperty("errors") ? message.error : message.success)
    })
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
    email: Yup.string().email().required(),
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values)
          resetForm({ values: initialValues })
        }}
        validationSchema={validationSchema}
      >
        <FormikForm className='w-100 h-100'>
          <FormMessage message={props.message} />
          <Form.Group className='mb-2'>
            <Form.Label className='d-block text-start mb-1'>Username</Form.Label>
            <Field
              className='form-control'
              id='reg-username'
              name='username'
              placeholder='Your username...'
            />
            <ErrorMessage name='username' component={FormError} />
          </Form.Group>
          <Form.Group>
            <Form.Label className='d-block text-start'>Email</Form.Label>
            <Field
              className='form-control'
              id='reg-email'
              name='email'
              placeholder='example@hotmail.com'
            />
            <ErrorMessage name='email' component={FormError} />
          </Form.Group>
          <Form.Group>
            <Form.Label className='d-block text-start'>Password</Form.Label>
            <Field
              className='form-control'
              id='reg-password'
              name='password'
              placeholder='Your secret password...'
              type='password'
            />
            <ErrorMessage name='password' component={FormError} />
          </Form.Group>
          <Button className='mt-3' variant='dark' type='submit'>
            Sign Up
          </Button>
        </FormikForm>
      </Formik>
    </div>
  )
}

export default RegistrationForm
