import React from 'react'
import {Button, Modal, Table} from 'react-bootstrap'
import MatchingCyclistRow from './MatchingCyclistRow'

const MatchingCyclistModal=(props)=> {
  
return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Potential Matching Customers</Modal.Title>
    </Modal.Header>

    <Modal.Body>The following customers have the same last name and birth date.<br></br>
     Do you want to add the pre-fit interview to one of these existing customers?
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
            Add Interview
          </th>
        </tr>
        </thead>
        <tbody>
        {props.duplicateCustomers.map((item, i) => {
         return <MatchingCyclistRow userId={props.userId} cyclist={item} key={i} container={this} handleMatch={props.handleMatch} reloadCyclists={props.reloadCyclists}/>
         
              })
    
            } 
        </tbody>
        </Table>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.handleRequestClose}>Cancel</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>


    )

  }

export default MatchingCyclistModal
