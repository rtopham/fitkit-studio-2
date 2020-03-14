
import React from 'react'
import {Panel, Button, Glyphicon} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import config from './../clientconfig/config'
import './Product.css'

const Pricing=()=> {

    return (
        <div className="globalCore">
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                Fit Kit Studio Pricing<LinkContainer to="/"><Button className="pull-right back-link" bsStyle="link" bsSize="xsmall"><Glyphicon glyph="arrow-left"></Glyphicon></Button></LinkContainer>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            <h4>Quick Size</h4>
            <p>Quick Size is free to all registered users of Fit Kit Studio.</p>
            <p>&nbsp;</p>
            <h4>Quick Fit</h4>
            <p>Quick Fit is a subscription service available for an annual fee of {config.annualSubscriptionPrice} All registered users are eligible for a free 60-day trial of Quick Fit. If you
              cancel your subscription prior to the end of the trial period, you will not be charged.
              To subscribe to Quick Fit, first sign up for a free Fit Kit Studio account or login to your existing account if you already have one. You will then be able to
              purchase a subscription by visiting your Account settings page and selecting "Manage Subscriptions."
            </p>
            </Panel.Body>
          </Panel>
         </div>
    )
  }

export default Pricing
