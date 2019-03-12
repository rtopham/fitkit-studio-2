import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

class ConfirmChangesModal extends Component {
  
  render() {

    return (

<div className="static-modal">
  <Modal container={this.props.container} show={this.props.show} onHide={this.props.onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{this.props.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{this.props.message}</Modal.Body>

    <Modal.Footer>
      <Button onClick={this.props.onHide}>Cancel</Button>
      <Button onClick={this.props.callBack}>Confirm Changes</Button>
    </Modal.Footer>
  </Modal>
</div>

    )

  }
}

export default ConfirmChangesModal
