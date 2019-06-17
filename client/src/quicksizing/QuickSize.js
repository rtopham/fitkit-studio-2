import React, { Component } from 'react'
import {Tabs, Tab, Panel, Well} from "react-bootstrap"
import {Link} from 'react-router-dom'
import './QuickSize.css'
import QSBodyMeasurements from './QSBodyMeasurements'
import SoftScores from './SoftScores'
import SizingRecommendations from './SizingRecommendations'
import auth from '../auth/auth-helper'

class QuickSize extends Component {

state={
  cyclistAge:25,
  softScores:{
    age:25,
    flexibility:'Good',
    ridingStyle:'Competitive',
    preconditions:'None'
  },
  bodyMeasurements:{
  inseam: 86,
  footLength: 25,
  torso: 56,
  arm: 56,
  height: 183,
  weight: 68,
  shoulders: 40,
  sitBones: 120
  }

}

changeInseam = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.inseam=value
  this.setState({bodyMeasurements})
}

changeFootLength = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.footLength=value
  this.setState({bodyMeasurements})
}

changeTorso = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.torso=value
  this.setState({bodyMeasurements})
}

changeHeight = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.height=value
  this.setState({bodyMeasurements})
}

changeWeight = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.weight=value
  this.setState({bodyMeasurements})
}

changeShoulders = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.shoulders=value
  this.setState({bodyMeasurements})
}

changeArm = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.arm=value
  this.setState({bodyMeasurements})
}

changeSitBones = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.sitBones=value
  this.setState({bodyMeasurements})
}

changeAge = (e) => {
  let value=parseInt(e.target.value)
//  let softScores = Object.assign({},this.state.softScores)
//  softScores.age=value
  this.setState({cyclistAge:value})
}

changeFlexibility = (e) => {
  let softScores = Object.assign({},this.state.softScores)
  softScores.flexibility=e.target.value
  this.setState({softScores})
}

changeRidingStyle = (e) => {
  let softScores = Object.assign({},this.state.softScores)
  softScores.ridingStyle=e.target.value
  this.setState({softScores})
}

changeConditions = (e) => {
  let softScores = Object.assign({},this.state.softScores)
  softScores.preconditions=e.target.value
  this.setState({softScores})
}


  render() {
 
    return (
      <div className="globalCore">
     <Panel defaultExpanded>
      <Panel.Heading>
        <Panel.Title toggle>Quick Size</Panel.Title>

      </Panel.Heading>
      <Panel.Collapse>
      <Panel.Body className="input-panel">
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Body Measurements">
      <QSBodyMeasurements bodyMeasurements={this.state.bodyMeasurements} changeInseam={this.changeInseam} changeFootLength={this.changeFootLength} changeTorso={this.changeTorso}
      changeArm={this.changeArm} changeHeight={this.changeHeight} changeWeight={this.changeWeight} changeShoulders={this.changeShoulders} changeSitBones={this.changeSitBones}/>
     </Tab>
     <Tab eventKey={2} title="Soft Scores">
    <SoftScores softScores={this.state.softScores} changeAge={this.changeAge} changeFlexibility={this.changeFlexibility}
    changeRidingStyle={this.changeRidingStyle} changeConditions={this.changeConditions}/>
     </Tab>
     <Tab eventKey={3} title="Cyclist Profile">
     <Well>You are using the Quick Size calculator, which is free of charge. <p></p> 
      Use Quick Size Plus for the following additional features:<p></p>
        <ul>
          <li>Additional calculations based on shoulder width and sit bone width</li>
          <li>Cloud storage of sizing data, customer name, contact information, notes and recommendations</li>
          <li>Summary PDF reports for printing or emailing to customers</li>
          <li>Customized bike shop or fitting studio branding</li>
        </ul>
        If you are not currently subscribed to Quick Size Plus, you can manage your subscriptions in <Link to={"/user/account/"+auth.isAuthenticated().user._id}>My Account</Link>.
      </Well>
 
    
     </Tab>
    
     </Tabs>
     </Panel.Body>
</Panel.Collapse>
</Panel>
 
     <SizingRecommendations quickSize={true} cyclistAge={this.state.cyclistAge} softScores={this.state.softScores} bodyMeasurements={this.state.bodyMeasurements}/>
      </div>
      
    )
  }
}

export default QuickSize;  