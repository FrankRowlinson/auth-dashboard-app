import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import FormError from "./FormError"
import FormMessage from "./FormMessage"
import axios from "axios"

function RegistrationForm(props) {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  }

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/register", data).then((res) => {
      console.log(res)
      if (res.data.hasOwnProperty("errors")) {
        props.setMessage({ text: "Try different username of email", status: 1 })
      } else {
        props.setMessage({ text: "Success", status: 0 })
      }
    })
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
    email: Yup.string().email().required(),
  })

  return (
    <div>
      <FormMessage message={props.message} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values)
          resetForm({ values: initialValues })
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Username</label>
          <Field id='reg-username' name='username' placeholder='SpiderManXxX' />
          <ErrorMessage name='username' component={FormError} />
          <label>Email</label>
          <Field
            id='reg-email'
            name='email'
            placeholder='johnyDepp@hotmail.com'
          />
          <ErrorMessage name='email' component={FormError} />
          <label>Password</label>
          <Field
            id='reg-password'
            name='password'
            placeholder='super_secure_password'
            type='password'
          />
          <ErrorMessage name='password' component={FormError} />
          <button type='submit'>Sign Up!</button>
        </Form>
      </Formik>
    </div>
  )
}

export default RegistrationForm
