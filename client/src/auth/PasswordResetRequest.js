import React, {Component} from 'react'
import {Panel, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import {validateEmail} from '../lib/form-validation'
import PasswordResetConfirmation from './PasswordResetConfirmation'
import {Link} from 'react-router-dom'
import {resetRequest} from './api-auth.js'
import {recordLogAction} from './../log/api-log'
import "./Signin.css";

class PasswordResetRequest extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      emailSent: false
  }


validateForm() {
    return (
      validateEmail(this.state.email)==='success' 
    );
  }

  clickSubmit = (e) => {
   e.preventDefault()
    const user = {
      email: this.state.email || undefined,
    }

    resetRequest(user).then((data) => {

      if (data.error) {
        this.setState({error: data.error})
        console.log(data.error)
      } else {
        this.setState({emailSent:true})
        let logData
        if (data.user) 
        logData={userId:data.user._id,action: "password-reset request", description: "User "+data.user.name+" requested a password reset."}
        else logData={action: "password-reset request", description: "Unknown user "+data.email+" requested a password reset."}
        recordLogAction(logData)

      }
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {

    if(this.state.emailSent) return (<PasswordResetConfirmation email={this.state.email}/>)

  return (

      <div className="Signin">
      <Panel>
        <Panel.Heading>Reset Password</Panel.Heading>
        <Panel.Body>
          Enter the email address associated with your Fit Kit Studio account and we will send you a password reset email.
      <form onSubmit={this.clickSubmit}>
        <FormGroup controlId="email" bsSize="large" validationState={validateEmail(this.state.email)}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
         
        <Button
          block
          type="submit"
          bsSize="large"
          disabled={!this.validateForm()}>
          Send Email
          </Button>
      </form>
      <div className="centerthis">
      <Link to="/signin">Cancel</Link>
      </div>
      <p></p>
      If you forgot your email address, <Link to="">contact us</Link> for assistance.

      </Panel.Body>
      </Panel>



                                  
      
</div>
    )
  }
}

export default PasswordResetRequest
