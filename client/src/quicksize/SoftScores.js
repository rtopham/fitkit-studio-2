import React, { Component } from 'react'
import {Well, Panel, Radio, FormGroup, FormControl, ControlLabel, OverlayTrigger, Glyphicon} from "react-bootstrap"
import {flexibilityHelp, ridingStyleHelp, conditionsHelp} from './HelpOverlays'
import './QuickSize.css'

class SoftScores extends Component {


  render() {
    const ageBlock = this.props.cyclistAge ? (
      <FormControl.Static>
      {this.props.cyclistAge}
      </FormControl.Static>
      

      ):<div>         
      <Radio onChange={this.props.changeAge} value={25} defaultChecked name="radioGroup" >Under 40</Radio>
      <Radio onChange={this.props.changeAge} value={50} name="radioGroup">Over 40</Radio></div>
    
    return (
      <Panel>
      <Panel.Body className="input-panel">
      <Well className="softScoreWell">
     <div className="row">
     <div className="softScoreColumn">
      <FormGroup>
        <ControlLabel>Age</ControlLabel>
      {ageBlock}
      </FormGroup>  
      </div>
      <div className="softScoreColumn">
      <FormGroup>
        <ControlLabel>Flexibility <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={flexibilityHelp}><Glyphicon glyph="info-sign"></Glyphicon></OverlayTrigger>
        </ControlLabel>
        <Radio onChange={this.props.changeFlexibility} checked={this.props.softScores.flexibility==="Poor"} value="Poor" name="flexGroup">Poor</Radio>
        <Radio onChange={this.props.changeFlexibility} checked={this.props.softScores.flexibility==="Good"} value="Good" name="flexGroup">Good</Radio>
        <Radio onChange={this.props.changeFlexibility} checked={this.props.softScores.flexibility==="Excellent"} value="Excellent" name="flexGroup">Excellent</Radio>
        </FormGroup>
        </div>
        <div className="softScoreColumn">
      <FormGroup>
        <ControlLabel>Riding Style <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={ridingStyleHelp}><Glyphicon glyph="info-sign"></Glyphicon></OverlayTrigger>  
        </ControlLabel>
        <Radio onChange={this.props.changeRidingStyle} checked={this.props.softScores.ridingStyle==="Competitive"} value="Competitive" name="styleGroup">Competitive</Radio>
        <Radio onChange={this.props.changeRidingStyle} checked={this.props.softScores.ridingStyle==="Relaxed"} value="Relaxed" name="styleGroup">Relaxed</Radio>
        </FormGroup>
        </div>
        <div className="softScoreColumn">
      <FormGroup>
        <ControlLabel>Conditions <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={conditionsHelp}><Glyphicon glyph="info-sign"></Glyphicon></OverlayTrigger> 
        </ControlLabel>
        <Radio onChange={this.props.changeConditions} checked={this.props.softScores.preconditions==="None"} value="None" name="conditionsGroup">None</Radio>
        <Radio onChange={this.props.changeConditions} checked={this.props.softScores.preconditions==="Yes"} value="Yes" name="conditionsGroup">Yes (soft tissue)</Radio>
        <Radio onChange={this.props.changeConditions} checked={this.props.softScores.preconditions==="Spinal (-1)"} value="Spinal (-1)" name="conditionsGroup">Spinal (lumbar fusion)</Radio>
        <Radio onChange={this.props.changeConditions} checked={this.props.softScores.preconditions==="Spinal (-2)"} value="Spinal (-2)" name="conditionsGroup">Spinal (cervical fusion)</Radio>
        </FormGroup>
        </div>
        </div>
        </Well>
</Panel.Body >
    </Panel>
      
    )
  }
}

export default SoftScores;  