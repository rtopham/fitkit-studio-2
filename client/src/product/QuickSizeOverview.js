
import React from 'react'
import {Panel, Button, Glyphicon} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import QuickSizeCarousel from './QuickSizeCarousel'

const QuickSizeOverview=()=> {

    return (
        <div className="globalCore">
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                Quick Size Overview<LinkContainer to="/"><Button className="pull-right back-link" bsStyle="link" bsSize="xsmall"><Glyphicon glyph="arrow-left"></Glyphicon></Button></LinkContainer>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            <p>Quick Size is free to all registered users of Fit Kit Studio. Quick Size is an easy to use bike sizing tool that uses proprietary calculations developed by Fit Kit Systems to
              estimate key bike sizing metrics based on cyclist measurements and other attributes. Simply by entering four key measurements and four soft score
              attributes, users can quickly estimate recommended frame size, saddle height, maximum standover height and overall bike length.  </p>
            </Panel.Body>
          </Panel>
          <QuickSizeCarousel/>
        </div>
        
    )
  }

export default QuickSizeOverview
