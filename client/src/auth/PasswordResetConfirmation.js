import React, {Component} from 'react'
import {Panel} from "react-bootstrap"
import {Link} from 'react-router-dom'
import "./Signin.css";

class PasswordResetConfirmation extends Component {

  render() {

  return (

      <div className="Signin">
      <Panel>
        <Panel.Heading>Email Sent</Panel.Heading>
        <Panel.Body>
          <p>
          We have sent an email to <strong> {this.props.email} </strong> with further instructions.
          </p>
          <p>
          The email will let you recover your username, so if you know your password, simply sign in again.
          </p>
          <p>
          If you have lost or forgotten your password, you should click the link in the email. This will allow you to choose a new password.
          </p>
          <p>
          The email link must be clicked within one hour.
          </p>

      <p></p>
      If you did not receive the email, please <Link to="">contact us</Link> for assistance.

      </Panel.Body>
      </Panel>
                                 
      
</div>
    )
  }
}

export default PasswordResetConfirmation
