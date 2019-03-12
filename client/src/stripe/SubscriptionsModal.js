import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

class SubscriptionsModal extends Component {
  
  render() {

    return (

<div className="static-modal">
  <Modal container={this.props.container} show={this.props.show} onHide={this.props.onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{this.props.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{this.props.message}</Modal.Body>

    <Modal.Footer>
      <Button onClick={this.props.onHide}>Ok</Button>
    </Modal.Footer>
  </Modal>
</div>

    )

  }
}

export default SubscriptionsModal
