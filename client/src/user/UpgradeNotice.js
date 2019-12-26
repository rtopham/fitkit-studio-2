
import React from 'react'
import {Panel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Users.css';

const UpgradeNotice=()=> {

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
            You currently do not have access to Quick Fit. Please upgrade your service level or renew your subscription. <br></br>
            You can manage your subscriptions in <Link to={"/user/account/"+jwt.user._id}>My Account</Link>.
            </Panel.Body>
          </Panel>
        </div>
        
    )
  }

export default UpgradeNotice
