import React from 'react'
import './QuickSize.css'
import {Row,Col} from 'react-bootstrap'
import QuickSizeSlider from './QuickSizeSlider'
import QuickSizeInput from './QuickSizeInput'
import {inseamHelp, footLengthHelp, torsoHelp, armHelp} from './HelpOverlays'

const CoreMeasurements=(props)=> {
 
    return (
      <React.Fragment>
      <Row>
      <Col xs={12} sm={6}>
      <QuickSizeInput label="Foot Length" units="cm." value={props.bodyMeasurements.footLength} overlay={footLengthHelp} min={21.5} max={31.8} step={.1} onChange={props.changeFootLength}/>
      <QuickSizeSlider label="Foot Length" units="cm." value={props.bodyMeasurements.footLength} overlay={footLengthHelp} min={21.5} max={31.8} step={.1} onChange={props.changeFootLength}/>
      </Col>
      <Col xs={12} sm={6}>
      <QuickSizeInput label="Inseam" units="cm. " value={props.bodyMeasurements.inseam} overlay={inseamHelp} min={70} max={99.9} step={.1} onChange={props.changeInseam} />      
      <QuickSizeSlider label="Inseam" units="cm." value={props.bodyMeasurements.inseam} overlay={inseamHelp} min={70} max={99.9} step={.1} onChange={props.changeInseam} />
      </Col>
      </Row>
      <Row>
      <Col xs={12} sm={6}>
      <QuickSizeInput label="Torso" units="cm." value={props.bodyMeasurements.torso} overlay={torsoHelp} min={50} max={75} step={.1} onChange={props.changeTorso} />
      <QuickSizeSlider label="Torso" units="cm." value={props.bodyMeasurements.torso} overlay={torsoHelp} min={50} max={75} step={.1} onChange={props.changeTorso} />
      </Col>
      <Col xs={12} sm={6}>
      <QuickSizeInput label="Arm" units="cm." value={props.bodyMeasurements.arm} overlay={armHelp} min={50} max={70} step={.1} onChange={props.changeArm} />      
      <QuickSizeSlider label="Arm" units="cm." value={props.bodyMeasurements.arm} overlay={armHelp} min={50} max={70} step={.1} onChange={props.changeArm} />
      </Col>
      </Row>
      </React.Fragment>
      
    )
  }

export default CoreMeasurements;  