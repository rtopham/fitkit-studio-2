import React, { Component } from 'react'
import {Tabs, Tab, Panel, Radio, FormGroup, ControlLabel} from "react-bootstrap"
import './QuickSize.css'
import QuickSizeSlider from './QuickSizeSlider'
import SizingRecommendations from './SizingRecommendations'
import {inseamHelp, footLengthHelp, torsoHelp, armHelp, sitBonesHelp, shouldersHelp, heightHelp} from './HelpOverlays'

class QuickSize extends Component {

state={
  cyclist:{
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
  let cyclist = Object.assign({},this.state.cyclist)
  cyclist.age=value
  this.setState({cyclist})
}

changeFlexibility = (e) => {
  let cyclist = Object.assign({},this.state.cyclist)
  cyclist.flexibility=e.target.value
  this.setState({cyclist})
}

changeRidingStyle = (e) => {
  let cyclist = Object.assign({},this.state.cyclist)
  cyclist.ridingStyle=e.target.value
  this.setState({cyclist})
}

changeConditions = (e) => {
  let cyclist = Object.assign({},this.state.cyclist)
  cyclist.preconditions=e.target.value
  this.setState({cyclist})
}


  render() {
 
    return (
      <div className="globalCore">

      <SizingRecommendations cyclist={this.state.cyclist} bodyMeasurements={this.state.bodyMeasurements}/>
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Body Measurements">
      <Panel>
        <Panel.Body>
       <div className="bigcolumn">
             <QuickSizeSlider label="Inseam" units="cm." value={this.state.bodyMeasurements.inseam} overlay={inseamHelp} min={70} max={99.9} step={.1} onChange={this.changeInseam} />
      
             </div>
      <div className="row">
      <div className="column">
      <QuickSizeSlider label="Foot Length" units="cm." value={this.state.bodyMeasurements.footLength} overlay={footLengthHelp} min={21.5} max={31.8} step={.1} onChange={this.changeFootLength}/>
      <QuickSizeSlider label="Height" units="cm." value={this.state.bodyMeasurements.height} overlay={heightHelp} min={122} max={215} step={.1} onChange={this.changeHeight} />
      </div>
      <div className="column">
      <QuickSizeSlider label="Torso" units="cm." value={this.state.bodyMeasurements.torso} overlay={torsoHelp} min={34} max={75} step={.1} onChange={this.changeTorso} />
      <QuickSizeSlider label="Shoulders" units="cm." value={this.state.bodyMeasurements.shoulders} overlay={shouldersHelp}  min={34} max={50} step={.5} onChange={this.changeShoulders} />
     </div>
     <div className="column">
     <QuickSizeSlider label="Arm" units="cm." value={this.state.bodyMeasurements.arm} overlay={armHelp} min={34} max={75} step={.1} onChange={this.changeArm} />
     <QuickSizeSlider label="Sit Bones" units="mm." value={this.state.bodyMeasurements.sitBones} overlay={sitBonesHelp} min={90} max={140} step={1} onChange={this.changeSitBones} />
 
     </div>
     </div>
     </Panel.Body>
     </Panel>
     </Tab>
     <Tab eventKey={2} title="Soft Scores">
     <Panel>
       <Panel.Body>
      <div className="row">
      <div className="softScoreColumn">
       <FormGroup>
         <ControlLabel>Age</ControlLabel>
         <Radio onChange={this.changeAge} value={25} defaultChecked name="radioGroup" >Under 40</Radio>
         <Radio onChange={this.changeAge} value={50} name="radioGroup">Over 40</Radio>
       </FormGroup>  
       </div>
       <div className="softScoreColumn">
       <FormGroup>
         <ControlLabel>Flexibility</ControlLabel>
         <Radio onChange={this.changeFlexibility} value="Poor" name="flexGroup">Poor</Radio>
         <Radio onChange={this.changeFlexibility} defaultChecked value="Good" name="flexGroup">Good</Radio>
         <Radio onChange={this.changeFlexibility} value="Excellent" name="flexGroup">Excellent</Radio>
         </FormGroup>
         </div>
         <div className="softScoreColumn">
       <FormGroup>
         <ControlLabel>Riding Style</ControlLabel>
         <Radio onChange={this.changeRidingStyle} defaultChecked value="Competitive" name="styleGroup">Competitive</Radio>
         <Radio onChange={this.changeRidingStyle} value="Relaxed" name="styleGroup">Relaxed</Radio>
         </FormGroup>
         </div>
         <div className="softScoreColumn">
       <FormGroup>
         <ControlLabel>Conditions</ControlLabel>
         <Radio onChange={this.changeConditions} defaultChecked value="None" name="conditionsGroup">None</Radio>
         <Radio onChange={this.changeConditions} value="Yes" name="conditionsGroup">Yes</Radio>
         <Radio onChange={this.changeConditions} value="Spinal (-1)" name="conditionsGroup">Spinal (-1)</Radio>
         <Radio onChange={this.changeConditions} value="Spinal (-2)" name="conditionsGroup">Spinal (-2)</Radio>
         </FormGroup>
         </div>
         </div>
</Panel.Body>
     </Panel>
     </Tab>
     <Tab eventKey={3} title="Cyclist">
     <Panel>
       <Panel.Body>
     Upgrade to Quick Size Plus to enter and store cyclist data and generate PDF reports.
     </Panel.Body>
     </Panel>
     </Tab>
    
     </Tabs>
 

      </div>
      
    )
  }
}

export default QuickSize;
