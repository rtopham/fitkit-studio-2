import React from 'react'
import './QuickSize.css'
import QuickSizeSlider from './QuickSizeSlider'
import QuickSizeInput from './QuickSizeInput'
import {sitBonesHelp, shouldersHelp} from './HelpOverlays'
import {Row,Col} from 'react-bootstrap'

const ShouldersSitBones=(props)=>{
    return (
    <React.Fragment>
     <Row>
      <Col xs={12} sm={6}>
       <QuickSizeInput label="Shoulders" units="cm." value={props.bodyMeasurements.shoulders} overlay={shouldersHelp}  min={34} max={50} step={.5} onChange={props.changeShoulders} />
       <QuickSizeSlider label="Shoulders" units="cm." value={props.bodyMeasurements.shoulders} overlay={shouldersHelp}  min={34} max={50} step={.5} onChange={props.changeShoulders} />
      </Col>
      <Col xs={12} sm={6}>
      <QuickSizeInput label="Sit Bones" units="mm." value={props.bodyMeasurements.sitBones} overlay={sitBonesHelp} min={90} max={150} step={1} onChange={props.changeSitBones} />
      <QuickSizeSlider label="Sit Bones" units="mm." value={props.bodyMeasurements.sitBones} overlay={sitBonesHelp} min={90} max={150} step={1} onChange={props.changeSitBones} />
      </Col>      
     </Row>
     </React.Fragment>
    )
  }

export default ShouldersSitBones;  