
import React, {Component} from 'react'
import {Panel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Users.css';

class CancelationNotice extends Component {

  render() {
    const jwt = JSON.parse(sessionStorage.getItem('jwt'))
    return (
        <div className="globalCore">
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                Quick Fit
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            Your subscription to Quick Fit is no longer active. But don't worry, all of your data is saved.<br/> To use Quick Fit again and restore access to your data, please purchase a new subscription. <br></br>
            You can manage your subscriptions in <Link to={"/user/account/"+jwt.user._id}>My Account</Link>.
            </Panel.Body>
          </Panel>
        </div>
        
    )
  }
}


export default CancelationNotice
