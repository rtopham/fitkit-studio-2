import React, {Component} from 'react'
import {Modal,Form, Panel, Button,FormGroup, OverlayTrigger, Tooltip, ControlLabel, FormControl} from "react-bootstrap"
import DeleteUser from './DeleteUser'
import {update} from './api-user.js'
import auth from '../auth/auth-helper.js'
import "./Users.css"
import {recordLogAction} from '../admin/api-admin'
import {validateInputLength, validatePassword, validateConfirmPassword, validateEmail} from './../lib/form-validation'

class EditProfile extends Component {

state = {
      show:false,
      expand:false,
      error: ''
    }


clickUpdateProfile = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: this.props.user.name,
      email: this.props.user.email,
      password: this.props.password
    }
    update({
      userId: this.props.user._id
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.props.updateProfileState()
        this.setState({show: true})
        const logData={userId:this.props.user._id,action: "User "+user.name+" changed his or her profile."}
        recordLogAction(logData)
 
      }
    })
  }


  validateForm() {
    return (
      validateInputLength(this.props.user.name,2)==='success'&&
      validateEmail(this.props.user.email)==='success'&&
      validatePassword(this.props.password)==='success'&&
      validateConfirmPassword(this.props.password,this.props.confirmPassword)==='success'
    );
  }  

  handleClose = () => {
    this.setState({ show: false, expand:false });

  }  

  toggleExpand =() =>{
    this.setState({expand:!this.state.expand})
  }

  render() {
    const tootip=(
      <Tooltip id="password-tooltip">
      <strong>Enter your existing password or a new password and confirm to save changes.</strong>
      </Tooltip>
    )

    return (<div className="modal-container">
      <Panel id="editProfile" onToggle={this.toggleExpand} expanded={this.state.expand}>
      <Panel.Heading><Panel.Title>
        <Panel.Toggle href="#" componentClass="a">
        Profile
        </Panel.Toggle>
        </Panel.Title></Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
        <Form>
                <FormGroup validationState={validateInputLength(this.props.user.name,2)}>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                  value={this.props.user.name}
                  onChange={this.props.handleProfileChange("name")}
                  name="name" autoFocus />
                </FormGroup>
                <FormGroup validationState={validateEmail(this.props.user.email)}>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                  type="email"
                  value={this.props.user.email}
                  onChange={this.props.handleProfileChange("email")}                  
                  name="email" />
                </FormGroup>
                <FormGroup validationState={validatePassword(this.props.password)} >
                  <ControlLabel>Password</ControlLabel>
                  <OverlayTrigger placement="top" overlay={tootip}>
                  <FormControl
                  type="password"
                  value={this.props.password}
                  onChange={this.props.handlePasswordChange("password")}                  
                  name="password" />
                  </OverlayTrigger>
                </FormGroup>
                <FormGroup validationState={validateConfirmPassword(this.props.password,this.props.confirmPassword)} >
                  <ControlLabel>Confirm Password</ControlLabel>
                  <FormControl
                  type="password"
                  value={this.props.confirmPassword}
                  onChange={this.props.handlePasswordChange("confirmPassword")}                  
                  name="confirmPassword" />
                </FormGroup>
    
              </Form>
      </Panel.Body>
      <Panel.Footer>
        <Button color="primary" disabled={!this.validateForm()} onClick={this.clickUpdateProfile} className="">Update Profile</Button>
        <DeleteUser container={this} user={this.props.user} userId={this.props.user._id}/>
        </Panel.Footer>
      </Panel.Collapse>
      </Panel>

      <Modal container={this} show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Profile successfully updated.</h4>
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

export default EditProfile
