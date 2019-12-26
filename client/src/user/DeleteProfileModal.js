import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const DeleteProfileModal=(props)=> {
  
return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Account</Modal.Title>
    </Modal.Header>

    <Modal.Body>This will delete your account completely. Any subscriptions you have will be canceled and you will no longer be able to access any previously saved data. Confirm to delete your account. This action cannot be undone.</Modal.Body>

    <Modal.Footer>
      <Button onClick={props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>

    )

  }

export default DeleteProfileModal
