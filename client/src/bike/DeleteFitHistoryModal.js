import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const DeleteFitHistoryModal=(props)=>{
  
return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Fit History</Modal.Title>
    </Modal.Header>
    <Modal.Body>Delete Fit History for {props.date}? This action cannont be undone.
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>

    )

  }

export default DeleteFitHistoryModal
