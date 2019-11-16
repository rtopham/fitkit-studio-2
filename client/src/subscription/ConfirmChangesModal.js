import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const ConfirmChangesModal=(props)=> {
  
return (
<div className="static-modal">
  <Modal container={props.container} show={props.show} onHide={props.onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{props.message}</Modal.Body>

    <Modal.Footer>
      <Button onClick={props.onHide}>Cancel</Button>
      <Button onClick={props.callBack}>Confirm Changes</Button>
    </Modal.Footer>
  </Modal>
</div>
    )
}

export default ConfirmChangesModal
