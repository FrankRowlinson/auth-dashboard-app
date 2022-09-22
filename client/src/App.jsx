import "./App.css"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Load from "./pages/Load"
import authChecker from "./services/authChecker"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react"

function App() {
  const [cookie, , removeCookie] = useCookies()
  const [access, setAccess] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [update, setUpdate] = useState(false)

  const updateTable = () => {
    setTimeout(() => setUpdate(!update), 200)
  }

  useEffect(() => {
    const fetchData = async (cookie) => {
      let response = await authChecker(cookie)
      setAccess(response)
      setLoading(false)
    }
    fetchData(cookie)
  }, [cookie, update])

  const logout = () => {
    removeCookie("authToken", { path: "/" })
  }

  return (
    <div className='App'>
      {isLoading ? (
        <Load />
      ) : access ? (
        <Dashboard logout={logout} updateTable={updateTable} update={update} />
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App
