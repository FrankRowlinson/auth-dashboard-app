import React from "react"
import Button from "react-bootstrap/Button"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ButtonGroup from "react-bootstrap/ButtonGroup"

function Toolbar(props) {
  const { isChecked, manageAccess } = props

  return (
    <ButtonGroup>
      {/* status codes: 0 - block, 1 - unblock, 2 - delete from db */}
      <Button
        variant='outline-dark'
        onClick={() => manageAccess(isChecked, 0)}
      >
        Block
      </Button>
      <Button
        variant='outline-dark'
        onClick={() => manageAccess(isChecked, 1)}
      >
        <LockOpenIcon />
      </Button>
      <Button variant='danger' onClick={() => manageAccess(isChecked, 2)}>
        <DeleteForeverIcon />
      </Button>
    </ButtonGroup>
  )
}

export default Toolbar
