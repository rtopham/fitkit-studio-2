import React, { Component } from 'react'
import {Well, Panel, Radio, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
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
        <ControlLabel>Flexibility</ControlLabel>
        <Radio onChange={this.props.changeFlexibility} value="Poor" name="flexGroup">Poor</Radio>
        <Radio onChange={this.props.changeFlexibility} defaultChecked value="Good" name="flexGroup">Good</Radio>
        <Radio onChange={this.props.changeFlexibility} value="Excellent" name="flexGroup">Excellent</Radio>
        </FormGroup>
        </div>
        <div className="softScoreColumn">
      <FormGroup>
        <ControlLabel>Riding Style</ControlLabel>
        <Radio onChange={this.props.changeRidingStyle} defaultChecked value="Competitive" name="styleGroup">Competitive</Radio>
        <Radio onChange={this.props.changeRidingStyle} value="Relaxed" name="styleGroup">Relaxed</Radio>
        </FormGroup>
        </div>
        <div className="softScoreColumn">
      <FormGroup>
        <ControlLabel>Conditions</ControlLabel>
        <Radio onChange={this.props.changeConditions} defaultChecked value="None" name="conditionsGroup">None</Radio>
        <Radio onChange={this.props.changeConditions} value="Yes" name="conditionsGroup">Yes</Radio>
        <Radio onChange={this.props.changeConditions} value="Spinal (-1)" name="conditionsGroup">Spinal (-1)</Radio>
        <Radio onChange={this.props.changeConditions} value="Spinal (-2)" name="conditionsGroup">Spinal (-2)</Radio>
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