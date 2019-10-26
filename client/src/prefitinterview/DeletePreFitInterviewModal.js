import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

class DeletePreFitInterviewModal extends Component {
  
  render() {

    return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Pre-Fit Interview</Modal.Title>
    </Modal.Header>

    <Modal.Body>Delete Pre-Fit Interview of <b>{this.props.interview.firstName} {this.props.interview.lastName}</b> completed <b>{this.props.interview.created.substring(0,10)}</b>?<br></br> This action cannont be undone.</Modal.Body>

    <Modal.Footer>
      <Button onClick={this.props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={this.props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>


    )

  }
}

export default DeletePreFitInterviewModal
