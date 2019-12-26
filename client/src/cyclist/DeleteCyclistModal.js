import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const DeleteCyclistModal=(props)=>{
  
    return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Cyclist</Modal.Title>
    </Modal.Header>

    <Modal.Body>Delete Cyclist {props.cyclist.cyclistProfile.firstName} {props.cyclist.cyclistProfile.lastName}? This action cannont be undone.</Modal.Body>

    <Modal.Footer>
      <Button onClick={props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>


    )

  }

export default DeleteCyclistModal
