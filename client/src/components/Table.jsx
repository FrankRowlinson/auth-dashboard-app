import { useContext } from "react"

function Table(props) {
  const { users, handleClick, handleSelectAll, isChecked, checkedAll } =
    useContext(props.tableContext)

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>
              <input
                type='checkbox'
                onChange={handleSelectAll}
                checked={checkedAll}
              ></input>
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
                  <input
                    id={`checkbox-${user.id}`}
                    type='checkbox'
                    onChange={handleClick}
                    checked={isChecked.includes(`checkbox-${user.id}`)}
                  ></input>
                </td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.lastLogin}</td>
                <td>{user.status ? `V` : "X"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table
