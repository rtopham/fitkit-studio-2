import React, {Component} from 'react'
import {Modal, Well, FormGroup, ControlLabel, Radio, Panel, Button} from "react-bootstrap"
import {Redirect} from 'react-router-dom'
import {update} from './api-user'
import auth from '../auth/auth-helper'
import "./Users.css"

class EditSubscriptions extends Component {
state = {
      show:false,
      expand:false,
      error: '',
      redirectToHome:false
    }

clickUpdateSubscription = () => {
    let jwt = auth.isAuthenticated()
    let today = new Date()
    let expiration = today.setDate(today.getDate() + 365)
    expiration = new Date(expiration).toISOString() 
    const user = {
      subscription_status: {service_level:this.props.user.subscription_status.service_level,expiration: expiration}
    }
    update({
      userId: this.props.user._id
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
//        jwt.user.subscription_status=user.subscription_status
//        sessionStorage.setItem('jwt', JSON.stringify(jwt))
        this.setState({show: true})
      }
    })
  }

handleClose = () => {
    this.setState({ show: false, expand:false });
    auth.signout(() => this.setState({redirectToHome:true}))

  }  

toggleExpand =() =>{
    this.setState({expand:!this.state.expand})
  }

  render() {
    if(this.state.redirectToHome)return(<Redirect to="/signin"/>)
    return (<div className="modal-container">
      <Panel id="editProfile" onToggle={this.toggleExpand} expanded={this.state.expand}>
      <Panel.Heading><Panel.Title>
        <Panel.Toggle href="#" componentClass="a">
        Subscriptions
        </Panel.Toggle>
        </Panel.Title></Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
        <Well className="preferencesWell">
     <div className="row">
     <div className="preferencesColumn">
      <FormGroup>
        <ControlLabel>Subscritions Type</ControlLabel>
        <Radio onChange={this.props.changeSubscription} checked={this.props.user.subscription_status.service_level==="Quick Size"} value="Quick Size" name="subscriptionGroup">Quick Size</Radio>
        <Radio onChange={this.props.changeSubscription} checked={this.props.user.subscription_status.service_level==="Quick Size Plus (Monthly)"} value="Quick Size Plus (Monthly)" name="subscriptionGroup">Quick Size Plus (Monthly)</Radio>
        <Radio onChange={this.props.changeSubscription} checked={this.props.user.subscription_status.service_level==="Quick Size Plus (Yearly)"} value="Quick Size Plus (Yearly)" name="subscriptionGroup">Quick Size Plus (Yearly)</Radio>
        </FormGroup>
        </div>
        </div>
        </Well>
              </Panel.Body>

      <Panel.Footer>
        <Button color="primary" disabled={false} onClick={this.clickUpdateSubscription} className="">Update Subscription</Button>
      </Panel.Footer>

      </Panel.Collapse>
      </Panel>

      <Modal container={this} show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>Update Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Preferences successfully updated. You must sign in again for your changes to take effect.</h4>
        </Modal.Body>
        <Modal.Footer>

            <Button bsStyle="primary" onClick={this.handleClose}>
              Ok
            </Button>

        </Modal.Footer>
      </Modal>

  </div>)
  }
}

export default EditSubscriptions
