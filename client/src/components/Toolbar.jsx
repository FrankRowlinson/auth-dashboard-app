import React from "react"
import { useContext } from "react"

function Toolbar(props) {
  const { checkedIDs, handleBlock, handleUnblock, handleDelete } = useContext(
    props.checkboxContext
  )

  return (
    <div>
      <button onClick={() => handleBlock(checkedIDs)}>Block</button>
      <button onClick={() => handleUnblock(checkedIDs)}>Unblock</button>
      <button onClick={() => handleDelete(checkedIDs)}>Delete</button>
    </div>
  )
}

export default Toolbar
