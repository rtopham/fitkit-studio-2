
import React, {Component} from 'react'
import {Panel} from 'react-bootstrap'
import './Users.css';

class UpgradeNotice extends Component {

  render() {
    const jwt = JSON.parse(sessionStorage.getItem('jwt'))
    return (
        <div className="globalCore">
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                Quick Size Plus
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            You currently do not have access to Quick Size Plus. Please upgrade your service level or renew your subscription. <br></br>
            You can manage your subscriptions in <a href={"/user/account/"+jwt.user._id}>My Account</a>.
            </Panel.Body>
          </Panel>
        </div>
        
    )
  }
}


export default UpgradeNotice