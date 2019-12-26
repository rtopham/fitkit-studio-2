import React from 'react'
import {Button, Modal, Table} from 'react-bootstrap'
import CyclistRow from './CyclistRow'

const DuplicateCyclistWarningModal=(props)=>{
  
return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Potential Duplicate Customer</Modal.Title>
    </Modal.Header>

    <Modal.Body>You previously created the following customers with this same last name and birth date.<br></br>
     Do you want to save <b>{props.cyclistProfile.firstName+' '+props.cyclistProfile.lastName+' ('+props.cyclistProfile.email+')'}</b> as a new cyslist?
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
        {props.duplicateCustomers.map((item, i) => {
          
          return <CyclistRow userId={props.userId} cyclist={item} key={i} container={this} reloadCyclists={props.reloadCyclists}/>
                                 
              })
    
            } 
        </tbody>
        </Table>
    


    </Modal.Body>

    <Modal.Footer>
      <Button onClick={props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={props.handleContinue}>Save New Customer</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>


    )

  }

export default DuplicateCyclistWarningModal
