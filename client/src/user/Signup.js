import React, {Component} from 'react'
import {Panel, HelpBlock, Modal, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import {validateInputLength, validatePassword, validateConfirmPassword, validateEmail} from '../lib/form-validation'
import {create} from './api-user.js'
import {LinkContainer} from 'react-router-bootstrap'
import {recordLogAction} from '../admin/api-admin'
import "./Users.css";

class Signup extends Component {
  constructor(props, context) {
    super(props, context);

  this.state = {
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
      show: false,
      error: ''
  }

  
  this.handleClose = this.handleClose.bind(this);
}

  validateForm() {
    return (
      validateInputLength(this.state.name,2)==='success'&&
      validateEmail(this.state.email)==='success'&&
      validatePassword(this.state.password)==='success'&&
      validateConfirmPassword(this.state.password,this.state.confirmPassword)==='success'
    );
  }  

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  clickSubmit = (e) => {
    e.preventDefault()
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', show: true})
        const logData={userId:data.userId,action: "signed up", description: "New User "+user.name+" signed up."}
        recordLogAction(logData)
      }
    })
  }

  handleClose() {
    this.setState({ show: false });
  }  

  render() {
    let ErrorPanel=''
    if (this.state.error) ErrorPanel = (<Panel.Footer className="centerthis"><span className="glyphicon glyphicon-exclamation-sign"></span> <span>{this.state.error}</span></Panel.Footer>); else ErrorPanel=null
    return (
      <div className="Signup">
      <Panel>
        <Panel.Heading>Sign Up</Panel.Heading>
      <form onSubmit={this.clickSubmit}>
      <FormGroup controlId="name" bsSize="large" validationState={validateInputLength(this.state.name,2)}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large" validationState={validateEmail(this.state.email)}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large" validationState={validatePassword(this.state.password)}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
           {validatePassword(this.state.password)!=='success'&&<HelpBlock>Must contain at least: eight characters, one uppercase letter, one lowercase letter and one number. Special characters are allowed.</HelpBlock>}
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large" validationState={validateConfirmPassword(this.state.password,this.state.confirmPassword)}>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button
          type="submit"
          block
          bsSize="large"
          disabled={!this.validateForm()}>
          Sign Up
          </Button>
      </form>
      {ErrorPanel}
      </Panel>
      <Modal show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>New account successfully created.</h4>
        </Modal.Body>
        <Modal.Footer>
          <LinkContainer to="/signin">
            <Button color="primary" onClick={this.handleClose} autoFocus="autoFocus">
              Sign In
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
      
      </div>
    )
  }
}

export default Signup
