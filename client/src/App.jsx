import "./App.css"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Load from "./pages/Load"
import authChecker from "./services/authChecker"

function App() {
  const [cookie, , removeCookie] = useCookies()
  const [access, setAccess] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async (cookie) => {
      let response = await authChecker(cookie)
      setAccess(response)
      setLoading(false)
    }
    fetchData(cookie)
  }, [cookie, users])

  const logout = () => {
    removeCookie("authToken", { path: "/" })
  }

  return (
    <Container className='App  min-vh-100'>
      {isLoading ? (
        <Load />
      ) : access ? (
        <Dashboard users={users} setUsers={setUsers} logout={logout}/>
      ) : (
        <Auth />
      )}
    </Container>
  )
}

export default App
