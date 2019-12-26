import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const DeleteBikeModal=(props)=>{
  
return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Bike</Modal.Title>
    </Modal.Header>
    <Modal.Body>Delete {props.bike.make} {props.bike.model ||'Unspecified Bike'}? This action cannont be undone.
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>

    )

  }

export default DeleteBikeModal
