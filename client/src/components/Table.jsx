import { useContext } from "react"
import moment from "moment"
import Table from "react-bootstrap/Table"
import InputGroup from "react-bootstrap/InputGroup"
import BlockIcon from "@mui/icons-material/Block"
import CheckIcon from "@mui/icons-material/Check"

function UserTable(props) {
  const { users, handleClick, handleSelectAll, isChecked, checkedAll } =
    useContext(props.tableContext)

  return (
    <>
      <Table responsive hover>
        <thead>
          <tr>
            <td>
              <InputGroup>
                <InputGroup.Checkbox
                  onChange={handleSelectAll}
                  checked={checkedAll}
                ></InputGroup.Checkbox>
              </InputGroup>
            </td>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Registration Time</td>
            <td>Last Login</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => {
            return (
              <tr key={key}>
                <td>
                  <InputGroup>
                    <InputGroup.Checkbox
                      id={`checkbox-${user.id}`}
                      type='checkbox'
                      onChange={handleClick}
                      checked={isChecked.includes(`checkbox-${user.id}`)}
                    ></InputGroup.Checkbox>
                  </InputGroup>
                </td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{moment(user.createdAt).format("llll")}</td>
                <td>
                  {user.lastLogin ? moment(user.lastLogin).fromNow() : "-"}
                </td>
                <td>{user.status ? <CheckIcon /> : <BlockIcon />}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default UserTable
