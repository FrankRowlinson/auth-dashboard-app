import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import retrieveUsers from '../services/retrieveUsers'

import UserTable from '../components/Table'
import Toolbar from '../components/Toolbar'

const HOST = process.env.REACT_APP_HOST || "http://localhost:3001/"

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

function Dashboard(props) {
  const { users, setUsers, logout } = props
  const [isChecked, setChecked] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
  const [cookie] = useCookies()

  useEffect(() => {
    const fetchData = async () => {
      const response = await retrieveUsers()
      setUsers(response)
    }
    fetchData()
  }, [setUsers])

  useEffect(() => {
    if (checkedAll) {
      setChecked(users.map((user) => user.id))
    } else {
      setChecked([])
    }
  }, [checkedAll, users])

  const handleSelectAll = () => {
    setCheckedAll(!checkedAll)
  }

  const handleClick = (e) => {
    const { id, checked } = e.target
    const userid = +id.split('-')[1]
    setChecked([...isChecked, userid])
    if (!checked) {
      setChecked(isChecked.filter((item) => item !== userid))
    }
  }

  const manageAccess = async (ids, status) => {
    try {await axios.post(
      HOST,
      getData(ids, status),
      getHeaders(cookie)
    )} catch(e) {
      console.log(e)
    }
    const res = await retrieveUsers()
    setUsers(res)
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Col
          md={8}
          className="d-flex justify-content-between border-bottom border-dark py-3"
        >
          <Toolbar manageAccess={manageAccess} isChecked={isChecked} />
          <Button variant="secondary" onClick={logout}>
            logout
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <UserTable
            checkedAll={checkedAll}
            isChecked={isChecked}
            handleSelectAll={handleSelectAll}
            handleClick={handleClick}
            users={users}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
