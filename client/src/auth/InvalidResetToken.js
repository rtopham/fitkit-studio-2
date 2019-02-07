import React, {Component} from 'react'
import {Panel} from "react-bootstrap"
import {Link} from 'react-router-dom'
import "./Signin.css";

class InvalidResetToken extends Component {
 render() {

  return (

      <div className="Signin">
      <Panel>
        <Panel.Heading>Invalid or Expired Token</Panel.Heading>
        <Panel.Body>
          <p>
          Your password reset link is invalid or it has expired.
          </p>
          <p>
          Please submit a new request: <Link to="/password-reset-request">Request Reset Link.</Link>
          </p>

      </Panel.Body>
      </Panel>
                                  
      
</div>
    )
  }
}

export default InvalidResetToken
