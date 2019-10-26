import React, {Component} from 'react'
import {Button, Modal, Table} from 'react-bootstrap'
import CyclistRow from './CyclistRow'

class DuplicateCyclistWarningModal extends Component {
  
  render() {

    return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Potential Duplicate Customer</Modal.Title>
    </Modal.Header>

    <Modal.Body>You previously created the following customers with this same last name and birth date.<br></br>
     Do you want to save <b>{this.props.cyclistProfile.firstName+' '+this.props.cyclistProfile.lastName+' ('+this.props.cyclistProfile.email+')'}</b> as a new cyslist?
     <br></br>
     <br></br>

    <Table striped bordered>
        <thead>
        <tr>
          <th>
            Last Name
          </th>
          <th>
            First Name
          </th>
          <th >
            Email
          </th>
          <th>
            Last Updated
          </th>
          <th>

          </th>
        </tr>
        </thead>
        <tbody>
        {this.props.duplicateCustomers.map((item, i) => {
          
          return <CyclistRow userId={this.props.userId} cyclist={item} key={i} container={this} reloadCyclists={this.props.reloadCyclists}/>
                                 
              })
    
            } 
        </tbody>
        </Table>
    


    </Modal.Body>

    <Modal.Footer>
      <Button onClick={this.props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={this.props.handleContinue}>Save New Customer</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>


    )

  }
}

export default DuplicateCyclistWarningModal
