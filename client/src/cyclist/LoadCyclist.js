import React, { Component } from 'react'
import auth from './../auth/auth-helper'
import {Panel, Table, Button, ButtonToolbar} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {listByUser} from './api-cyclist.js'
import CyclistRow from './CyclistRow'
import './Cyclist.css'

class LoadCyclist extends Component {
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
    
loadCyclists = (user, search) => {
  const jwt = auth.isAuthenticated()  
    listByUser({
          userId: user,
          search: search
        }, {t: jwt.token}).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            console.log(data)
            this.setState({cyclists: data})
    
          }
        })
      }
    

  render() {

    return (
      <div className="globalCore">
    <Panel>
      <Panel.Heading>
        <Panel.Title>Load Cyclist</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
      <Table>
      {this.state.cyclists.map((item, i) => {
          
      return <CyclistRow userId={this.match.params.userId} cyclist={item} key={i} />
                             
          })

        }
        </Table>
      </Panel.Body>
    </Panel>
      </div>
      
    )
  }
}

export default LoadCyclist;  