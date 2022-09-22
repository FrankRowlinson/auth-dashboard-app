import React, { useState } from "react"
import RegistrationForm from "../components/RegistrationForm"
import AuthForm from "../components/AuthForm"

function Auth() {
  const [loginMessage, setLoginMessage] = useState({})
  const [regMessage, setRegMessage] = useState({})
  return (
    <>
      <AuthForm message={loginMessage} setMessage={setLoginMessage} />
      <RegistrationForm message={regMessage} setMessage={setRegMessage} />
    </>
  )
}

export default Auth
