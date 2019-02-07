import React, { Component } from 'react'
import auth from '../auth/auth-helper'
import {Panel, Table} from "react-bootstrap"
import {listByUser} from './api-cyclist.js'
import CyclistRow from './CyclistRow'
import './Cyclist.css'

class ListCyclists extends Component {
  constructor({match}) {
    super()
this.state={
  cyclists:[]
}

this.match = match
  }

componentDidMount = () => {

    this.loadCyclists(this.match.params.userId, this.props.location.search)
      }

reloadCyclists=()=>{
  this.loadCyclists(this.match.params.userId, this.props.location.search)
}
    
loadCyclists = (user, search) => {
  const jwt = auth.isAuthenticated()  
    listByUser({
          userId: user,
          search: search
        }, {t: jwt.token}).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
//            console.log(data)
            this.setState({cyclists: data})
    
          }
        })
      }
    

  render() {
//    const jwt = auth.isAuthenticated()
//    console.log(jwt)
    return (
      <div className="globalCore">
    <Panel className="modal-container">
      <Panel.Heading>
        <Panel.Title>Retrieve Cyclist</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
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
      {this.state.cyclists.map((item, i) => {
          
      return <CyclistRow userId={this.match.params.userId} cyclist={item} key={i} container={this} reloadCyclists={this.reloadCyclists} />
                             
          })

        }
        </tbody>
        </Table>
      </Panel.Body>
    </Panel>
      </div>
      
    )
  }
}

export default ListCyclists;  