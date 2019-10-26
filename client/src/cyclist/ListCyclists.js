import React, { Component } from 'react'
import auth from '../auth/auth-helper'
import {Panel, Table, Glyphicon, Button} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {listByUser, listByUserSearch} from './api-cyclist.js'
import CyclistRow from './CyclistRow'
import SearchBox from './SearchBox'
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

searchCustomers=(lastName)=>{

  const jwt = auth.isAuthenticated()  
      listByUserSearch({
            userId: jwt.user._id,
            search: `?lastNameRegX=${lastName}`
          }, {t: jwt.token}).then((data) => {
            if (data.error) {
              console.log(data.error)
            } else {
              if(data.length>0) this.setState({cyclists: data})
            }
          })
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
            this.setState({cyclists: data})
          }
        })
      }
  

  render() {
  return (
      <div className="globalCore">
    <Panel className="modal-container">
      <Panel.Heading>
        <Panel.Title>
          Retrieve Cyclist<LinkContainer to={"/quickfit/"+this.match.params.userId}><Button className="pull-right" bsStyle="link"><Glyphicon glyph="arrow-left"></Glyphicon></Button></LinkContainer>
        </Panel.Title>
      </Panel.Heading>
      
      <Panel.Body>
      <SearchBox searchCustomers={this.searchCustomers}/>
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