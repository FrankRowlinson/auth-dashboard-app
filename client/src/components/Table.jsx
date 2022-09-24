import moment from "moment"
import Table from "react-bootstrap/Table"
import ToggleButton from "react-bootstrap/ToggleButton"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import BlockIcon from "@mui/icons-material/Block"
import CheckIcon from "@mui/icons-material/Check"

function UserTable(props) {
  const { users, handleClick, handleSelectAll, isChecked, checkedAll } = props

  const checkStatus = id => isChecked.includes(id)
  const checkboxStyle = "dark"

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <td>
            <ButtonGroup>
              <ToggleButton
                id='select-all-checkbox'
                type='checkbox'
                onChange={handleSelectAll}
                checked={checkedAll}
                className='p-2'
                variant={
                  checkedAll ? checkboxStyle : `outline-${checkboxStyle}`
                }
              ></ToggleButton>
            </ButtonGroup>
          </td>
          <td>ID</td>
          <td>Name</td>
          <td>Email</td>
          <td>Registration Date</td>
          <td>Last Login</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <ButtonGroup>
                  <ToggleButton
                    id={`checkbox-${user.id}`}
                    type='checkbox'
                    onChange={handleClick}
                    className='p-2'
                    checked={checkStatus(user.id)}
                    variant={
                      checkStatus(user.id)
                        ? checkboxStyle
                        : `outline-${checkboxStyle}`
                    }
                  ></ToggleButton>
                </ButtonGroup>
              </td>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{moment(user.createdAt).format("L")}</td>
              <td>{user.lastLogin ? moment(user.lastLogin).fromNow() : "-"}</td>
              <td>{user.status ? <CheckIcon /> : <BlockIcon />}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default UserTable
