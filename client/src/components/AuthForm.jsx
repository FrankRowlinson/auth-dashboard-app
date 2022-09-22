import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import FormError from "./FormError"
import axios from "axios"
import { useCookies } from "react-cookie"

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
      <Form>
        <label>Username</label>
        <Field id='auth-username' name='username' placeholder='SpiderManXxX' />
        <ErrorMessage name='username' component={FormError} />
        <label>Password</label>
        <Field
          id='auth-password'
          name='password'
          placeholder='super_secure_password'
          type='password'
        />
        <ErrorMessage name='password' component={FormError} />
        <button type='submit'>Sign In!</button>
      </Form>
    </Formik>
  )
}

export default AuthForm
