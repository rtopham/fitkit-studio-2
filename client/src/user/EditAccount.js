import React, {Component} from 'react'
import {ListGroup, ListGroupItem} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect} from 'react-router-dom'
import EditProfile from './../user/EditProfile'
import EditSubscriptions from './EditSubscriptions'

import "./Users.css"

class EditAccount extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: {subscription_status:{}},
      redirectToSignin: false,
      races: [],
      banners:[],
      bannerLinks:[]
    }
    this.match = match
  }
  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
        
      }
    })
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }


  render() {
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="Profile">
       <div>
        <ListGroup>
          <ListGroupItem header={this.state.user.name}>{this.state.user.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.user.created)).toDateString()}</ListGroupItem>
            <ListGroupItem>{"Current Service Level: " + this.state.user.subscription_status.service_level} </ListGroupItem>
        </ListGroup>
      </div>
      <EditProfile match={this.match}/>
      <EditSubscriptions match={this.match} user={this.state.user}/>
      </div>
    )
  }
}


export default EditAccount
