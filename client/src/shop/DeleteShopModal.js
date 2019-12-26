import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const DeleteShopModal=(props)=> {
  
return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Shop Information</Modal.Title>
    </Modal.Header>

    <Modal.Body>Confirm to delete shop information and revert to default branding.</Modal.Body>

    <Modal.Footer>
      <Button onClick={props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>

    )

  }

export default DeleteShopModal
