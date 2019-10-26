import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

class DeleteBikeModal extends Component {
  
  render() {

    return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Bike</Modal.Title>
    </Modal.Header>

    <Modal.Body>Delete {this.props.bike.make} {this.props.bike.model}? This action cannont be undone.</Modal.Body>

    <Modal.Footer>
      <Button onClick={this.props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={this.props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>


    )

  }
}

export default DeleteBikeModal
