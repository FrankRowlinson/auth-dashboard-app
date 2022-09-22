import { createContext, useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import UserTable from "../components/Table"
import Toolbar from "../components/Toolbar"

const getData = (ids, action) => {
  return {
    userIds: ids,
    action: action,
  }
}
const getHeaders = (cookie) => {
  return {
    headers: {
      authorization: cookie.authToken,
    },
  }
}

const checkboxContext = createContext()
const tableContext = createContext()

function Dashboard(props) {
  const [users, setUsers] = useState([])
  const [isChecked, setChecked] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
  const [checkedIDs, setCheckedIDs] = useState([])
  const [cookie] = useCookies()

  useEffect(() => {
    axios.get("http://192.168.100.101:3001/").then((response) => {
      setUsers([...response.data])
    })
  }, [props.update])

  useEffect(() => {
    if (checkedAll) {
      setChecked(users.map((user) => `checkbox-${user.id}`))
    } else {
      setChecked([])
    }
  }, [checkedAll, users])

  const handleSelectAll = () => {
    setCheckedAll(!checkedAll)
  }

  const handleClick = (e) => {
    const { id, checked } = e.target
    setChecked([...isChecked, id])
    if (!checked) {
      setChecked(isChecked.filter((item) => item !== id))
    }
  }

  useEffect(() => {
    setCheckedIDs(isChecked.map((el) => el.split("-")[1]))
  }, [isChecked])

  const manageAccess = async (ids, status) => {
    await axios
      .post("http://localhost:3001/", getData(ids, status), getHeaders(cookie))
      .then(props.updateTable())
  }

  return (
    <div>
      <Row className='justify-content-center'>
        <Col
          md={8}
          className='d-flex justify-content-between border-bottom border-dark py-3'
        >
          <checkboxContext.Provider
            value={{
              checkedIDs,
              manageAccess,
            }}
          >
            <Toolbar checkboxContext={checkboxContext} />
          </checkboxContext.Provider>
          <Button variant='secondary' onClick={props.logout}>
            logout
          </Button>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={8}>
          <tableContext.Provider
            value={{
              users,
              handleClick,
              handleSelectAll,
              isChecked,
              checkedAll,
            }}
          >
            <UserTable tableContext={tableContext} />
          </tableContext.Provider>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
