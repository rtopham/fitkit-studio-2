import React, { Component } from 'react'
import auth from '../auth/auth-helper'
import {Panel, Table} from "react-bootstrap"
import {listByUser} from './api-prefitinterview.js'
import {listByUserSearch} from '../cyclist/api-cyclist.js'
import InterviewRow from './InterviewRow'
import './PreFit.css'

class ListInterviews extends Component {
  constructor({match}) {
    super()
this.state={
  interviews:[]
}

this.match = match
  }

componentDidMount = () => {

    this.loadInterviews(this.match.params.userId, this.props.location.search)
      }

reloadInterviews=()=>{
  this.loadInterviews(this.match.params.userId, this.props.location.search)
}

searchInterviews=(lastName)=>{

  const jwt = auth.isAuthenticated()  
      listByUserSearch({
            userId: jwt.user._id,
            search: `?lastNameRegX=${lastName}`
          }, {t: jwt.token}).then((data) => {
            if (data.error) {
              console.log(data.error)
            } else {
               if(data.length>0) this.setState({interviews: data})
             }
          })
  
}
    
loadInterviews = (user, search) => {

  const jwt = auth.isAuthenticated()  
    listByUser({
          userId: user,
          search: search
        }, {t: jwt.token}).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            this.setState({interviews: data})
          }
        })
      }

checkForExistingCustomer=(interview)=>{
  
        return new Promise(resolve=>{
          const jwt = auth.isAuthenticated()  
          listByUserSearch({
                userId: jwt.user._id,
                search: `?lastName=${interview.lastName}&birthDate=${interview.birthDate}`
              }, {t: jwt.token}).then((data) => {
                if (data.error) {
                  console.log(data.error)
                } else {
                  if(data.length>0) resolve(data); else resolve(false)
               }
              })
        })
      }      
      


  render() {

if(this.state.interviews.length===0) return null
    return (
      <div className="interview-panel">
    <Panel className="interview-list modal-container">
      <Panel.Heading>
        <Panel.Title>
          New Pre-Fit Interviews
        </Panel.Title>
      </Panel.Heading>
      
      <Panel.Body>
      <Table striped bordered>
        <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Birth Date</th>
          <th>Completed</th>
          <th>Create</th>
          <th>Add to</th>
          <th>Delete</th>
         </tr>
        </thead>
        <tbody>
      {this.state.interviews.map((item, i) => {
          
      return <InterviewRow userId={this.match.params.userId} interview={item} key={i} reloadInterviews={this.reloadInterviews}/>
                             
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

export default ListInterviews;  