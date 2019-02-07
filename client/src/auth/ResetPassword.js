import React, {Component} from 'react'
import {Panel, HelpBlock, Modal, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import {validatePassword, validateConfirmPassword} from '../lib/form-validation'
import {validateToken, changePassword} from './api-auth.js'
import InvalidResetToken from './InvalidResetToken'
import {LinkContainer} from 'react-router-bootstrap'
import "./Signin.css";

class ResetPassword extends Component {
  constructor({match}) {
    super();

  this.state = {

      password: '',
      confirmPassword: '',
      show: false,
      error: '',
      invalidToken:false,
      user:{}
  }

this.match=match
}

componentDidMount=()=>{

  const user = {
    token: this.match.params.token || undefined,
  }

  validateToken(user).then((data) => {

    if (data.error) {
      this.setState({error: data.error,invalidToken: true})

    } else {

      const now = new Date().getTime()
      const timeDifference= (now-data.tokenTimeStamp)/1000/60

      if(timeDifference<60) this.setState({user:data,invalidToken:false})
      else this.setState({invalidToken:true})

    }
  })

}

  validateForm=()=> {
    return (
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
      token: this.match.params.token || undefined,
      password: this.state.password || undefined
    }

    changePassword(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({show: true})
 
      }
    })
  }

  handleClose=()=> {
    this.setState({ show: false });
  }  

  render() {
    if(this.state.invalidToken) return (<InvalidResetToken/>)
    let ErrorPanel=''
    if (this.state.error) ErrorPanel = (<Panel.Footer className="centerthis"><span className="glyphicon glyphicon-exclamation-sign"></span> <span>{this.state.error}</span></Panel.Footer>); else ErrorPanel=null
    return (
      <div className="Signup">
      <Panel>
        <Panel.Heading>Reset Password</Panel.Heading>
      <form onSubmit={this.clickSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl.Static>{this.state.user.email}</FormControl.Static>
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
          Change Password
          </Button>
      </form>
      {ErrorPanel}
      </Panel>
      <Modal show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Password Successfully Changed. Please Sign in.</h4>
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

export default ResetPassword
