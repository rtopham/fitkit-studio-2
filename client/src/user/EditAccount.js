import React, {Component} from 'react'
import {ListGroup, ListGroupItem} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect} from 'react-router-dom'
import EditProfile from './../user/EditProfile'
import EditSubscriptions from './EditSubscriptions'
import EditPreferences from './EditPreferences'
//import EditShopStudio from './EditShopStudio'

import "./Users.css"

class EditAccount extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: {name: '', email: '', subscription_status:{service_level:'Quick Size', expiration:null},preferences:{height_units:'Metric',weight_units:'Metric'}},
      originalUser: {name: '', email: '', subscription_status:{},preferences:{height_units:'Metric',weight_units:'Metric'}},
      password: '',
      confirmPassword: '',
      redirectToSignin: false
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
        this.setState({user: data,originalUser: data})
        
      }
    })
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }

  changeSubscription =(e) =>{
    let user = Object.assign({},this.state.user)
    user.subscription_status.service_level=e.target.value
    this.setState({user})
  }

  changeHeightUnits = (e) => {
      let user = Object.assign({},this.state.user)
      user.preferences.height_units=e.target.value
      this.setState({user})
   }

   changeWeightUnits = (e) => {
    let user = Object.assign({},this.state.user)
    user.preferences.weight_units=e.target.value
    this.setState({user})
 }

 handleProfileChange = name => event => {
  const value = event.target.value
  let user = Object.assign({},this.state.user)
  user[name]=value
  this.setState({user})
}

handlePasswordChange = name => event => {
  const value = event.target.value
  this.setState({ [name]: value })
}

updateProfileState =()=>{
  let originalUser = Object.assign({},this.state.user)
  this.setState({originalUser, password:'',confirmPassword:''})
}


  render() {
//  console.log(this.state.user)
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="Profile">
       <div>
        <ListGroup>
          <ListGroupItem header={this.state.originalUser.name}>{this.state.originalUser.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.originalUser.created)).toDateString()}</ListGroupItem>
            <ListGroupItem>{"Current Service Level: " + this.state.originalUser.subscription_status.service_level} </ListGroupItem>
        </ListGroup>
      </div>
      <EditProfile handlePasswordChange={this.handlePasswordChange} handleProfileChange={this.handleProfileChange}
       updateProfileState={this.updateProfileState} user={this.state.user} password={this.state.password} confirmPassword={this.state.confirmPassword}/>
      <EditPreferences changeHeightUnits={this.changeHeightUnits} changeWeightUnits={this.changeWeightUnits} user={this.state.user}/>
{/*      <EditShopStudio changeShopStudio={this.changeShopStudio} user={this.state.user}/>      */}
      <EditSubscriptions changeSubscription={this.changeSubscription} user={this.state.user}/>
      </div>
    )
  }
}


export default EditAccount
