import React, { Component } from 'react'
import {Panel, Button, ButtonToolbar} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import './QuickSize.css'

class QuickSizePlus extends Component {
  constructor({match}) {
    super()


this.match = match
  }

  render() {

    return (
      <div className="globalCore">
    <Panel>
      <Panel.Heading>
        <Panel.Title>Quick Size Plus</Panel.Title>
      </Panel.Heading>
      <Panel.Body className="qs-toolbar" >
 <ButtonToolbar>
      <LinkContainer to={"/quicksize-plus/"+this.match.params.userId+"/load"}>
      <Button>Retrieve Cyclist</Button>
      </LinkContainer>
      {' '}
      <LinkContainer to ={"/quicksize-plus/"+this.match.params.userId+"/new"}>
      <Button onClick={this.clickNewCyclist}>New Cyclist</Button>
      </LinkContainer>
</ButtonToolbar>
      </Panel.Body>
    </Panel>
      </div>
      
    )
  }
}

export default QuickSizePlus;  