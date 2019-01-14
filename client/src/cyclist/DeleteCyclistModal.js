import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

class DeleteCyclistModal extends Component {
  
  render() {

    return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Cyclist</Modal.Title>
    </Modal.Header>

    <Modal.Body>Delete Cyclist {this.props.cyclist.cyclistProfile.firstName} {this.props.cyclist.cyclistProfile.lastName}? This action cannont be undone.</Modal.Body>

    <Modal.Footer>
      <Button onClick={this.props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={this.props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>


    )

  }
}

export default DeleteCyclistModal
