import React from "react"
import { useContext } from "react"
import Button from "react-bootstrap/Button"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

function Toolbar(props) {
  const { checkedIDs, manageAccess } = useContext(props.checkboxContext)

  return (
    <div>
      {/* status codes: 0 - block, 1 - unblock, 2 - delete from db */}
      <Button variant='warning' onClick={() => manageAccess(checkedIDs, 0)}>
        Block
      </Button>
      <Button variant='success' onClick={() => manageAccess(checkedIDs, 1)}>
        <LockOpenIcon />
      </Button>
      <Button variant='danger' onClick={() => manageAccess(checkedIDs, 2)}>
        <DeleteForeverIcon />
      </Button>
    </div>
  )
}

export default Toolbar
