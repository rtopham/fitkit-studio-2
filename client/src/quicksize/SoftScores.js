import React from 'react'
import {Well, Row, Col, Panel, Radio, FormGroup, FormControl, ControlLabel, OverlayTrigger, Glyphicon} from "react-bootstrap"
import {flexibilityHelp, ridingStyleHelp, conditionsHelp} from './HelpOverlays'
import './QuickSize.css'

const SoftScores=(props)=> {

  const ageBlock = props.cyclistAge ? (
      <FormControl.Static>
      {props.cyclistAge}
      </FormControl.Static>
      

      ):<div>         
      <Radio onChange={props.changeAge} value={25} defaultChecked name="radioGroup" >Under 40</Radio>
      <Radio onChange={props.changeAge} value={50} name="radioGroup">Over 40</Radio></div>
    
    return (
      <Panel>
      <Panel.Body className="input-panel">
      <Well className="softScoreWell">
     <Row>
     <Col xs={12} sm={3}>
      <FormGroup>
        <ControlLabel>Age</ControlLabel>
      {ageBlock}
      </FormGroup>  
      </Col>

      <Col xs={12} sm={3}>
      <FormGroup>
        <ControlLabel>Flexibility <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={flexibilityHelp}><Glyphicon glyph="info-sign"></Glyphicon></OverlayTrigger>
        </ControlLabel>
        <Radio onChange={props.changeFlexibility} checked={props.softScores.flexibility==="Poor"} value="Poor" name="flexGroup">Poor</Radio>
        <Radio onChange={props.changeFlexibility} checked={props.softScores.flexibility==="Good"} value="Good" name="flexGroup">Good</Radio>
        <Radio onChange={props.changeFlexibility} checked={props.softScores.flexibility==="Excellent"} value="Excellent" name="flexGroup">Excellent</Radio>
        </FormGroup>
        </Col>
        <Col xs={12} sm={3}>
      <FormGroup>
        <ControlLabel>Riding Style <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={ridingStyleHelp}><Glyphicon glyph="info-sign"></Glyphicon></OverlayTrigger>  
        </ControlLabel>
        <Radio onChange={props.changeRidingStyle} checked={props.softScores.ridingStyle==="Competitive"} value="Competitive" name="styleGroup">Competitive</Radio>
        <Radio onChange={props.changeRidingStyle} checked={props.softScores.ridingStyle==="Relaxed"} value="Relaxed" name="styleGroup">Relaxed</Radio>
        </FormGroup>
       </Col>
       <Col xs={12} sm={3}>
      <FormGroup>
        <ControlLabel>Conditions <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={conditionsHelp}><Glyphicon glyph="info-sign"></Glyphicon></OverlayTrigger> 
        </ControlLabel>
        <Radio onChange={props.changeConditions} checked={props.softScores.preconditions==="None"} value="None" name="conditionsGroup">None</Radio>
        <Radio onChange={props.changeConditions} checked={props.softScores.preconditions==="Yes"} value="Yes" name="conditionsGroup">Yes (soft tissue)</Radio>
        <Radio onChange={props.changeConditions} checked={props.softScores.preconditions==="Spinal (-1)"} value="Spinal (-1)" name="conditionsGroup">Spinal (lumbar fusion)</Radio>
        <Radio onChange={props.changeConditions} checked={props.softScores.preconditions==="Spinal (-2)"} value="Spinal (-2)" name="conditionsGroup">Spinal (cervical fusion)</Radio>
        </FormGroup>
        </Col>
        </Row>
        </Well>
</Panel.Body >
    </Panel>
      
    )
  }

export default SoftScores;  