import { createContext, useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"

import Table from "../components/Table"
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

  const handleBlock = async (ids) => {
    console.log(getData(ids, "block"))
    await axios
      .post("http://localhost:3001/", getData(ids, "block"), getHeaders(cookie))
      .then(props.updateTable())
  }

  const handleUnblock = async (ids) => {
    await axios
      .post("http://localhost:3001/", getData(ids, "unblock"), getHeaders())
      .then(props.updateTable())
  }

  const handleDelete = async (ids) => {
    await axios
      .post("http://localhost:3001/", getData(ids, "delete"), getHeaders())
      .then(() => {
        setCheckedIDs([])
        props.updateTable()
      })
  }

  return (
    <>
      <checkboxContext.Provider
        value={{
          checkedIDs,
          handleBlock,
          handleUnblock,
          handleDelete,
        }}
      >
        <Toolbar checkboxContext={checkboxContext} />
      </checkboxContext.Provider>
      <tableContext.Provider
        value={{
          users,
          handleClick,
          handleSelectAll,
          isChecked,
          checkedAll,
        }}
      >
        <Table tableContext={tableContext} />
      </tableContext.Provider>
      <button onClick={props.logout}>logout</button>
    </>
  )
}

export default Dashboard
