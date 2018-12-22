import React, { Component } from 'react'
import {Tabs, Tab, Panel} from "react-bootstrap"
import './QuickSize.css'
import BodyMeasurements from './BodyMeasurements'
import SoftScores from './SoftScores'
import SizingRecommendations from './SizingRecommendations'

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


      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Body Measurements">
      <BodyMeasurements bodyMeasurements={this.state.bodyMeasurements} changeInseam={this.changeInseam} changeFootLength={this.changeFootLength} changeTorso={this.changeTorso}
      changeArm={this.changeArm} changeHeight={this.changeHeight} changeShoulders={this.changeShoulders} changeSitBones={this.changeSitBones}/>
     </Tab>
     <Tab eventKey={2} title="Soft Scores">
    <SoftScores bodyMeasurements={this.state.bodyMeasurements} changeAge={this.changeAge} changeFlexibility={this.changeFlexibility}
    changeRidingStyle={this.changeRidingStyle} changeConditions={this.changeConditions}/>
     </Tab>
     <Tab eventKey={3} title="Cyclist Profile">
     <Panel>
       <Panel.Body className="input-panel">
     Upgrade to Quick Size Plus to enter and store cyclist data and generate PDF reports.
     </Panel.Body>
     </Panel>
     </Tab>
    
     </Tabs>
 
     <SizingRecommendations cyclistAge={this.state.cyclistAge} softScores={this.state.softScores} bodyMeasurements={this.state.bodyMeasurements}/>
      </div>
      
    )
  }
}

export default QuickSize;  