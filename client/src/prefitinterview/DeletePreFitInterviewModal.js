import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const DeletePreFitInterviewModal=(props)=> {
  
return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Pre-Fit Interview</Modal.Title>
    </Modal.Header>

    <Modal.Body>Delete Pre-Fit Interview of <b>{props.interview.firstName} {props.interview.lastName}</b> completed <b>{props.interview.created.substring(0,10)}</b>?<br></br> This action cannont be undone.</Modal.Body>

    <Modal.Footer>
      <Button onClick={props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>

    )

  }

export default DeletePreFitInterviewModal
