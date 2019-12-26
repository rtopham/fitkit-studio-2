import React from 'react'
import {Panel} from "react-bootstrap"
import './QuickSize.css'
import CoreMeasurements from './CoreMeasurements'
import HeightWeight from './HeightWeight'
import ShouldersSitBones from './ShouldersSitbones'


const BodyMeasurements=(props)=> {
 
    return (
      <Panel>
        <Panel.Body className="input-panel">
        <HeightWeight preferences={props.preferences} imperialHeight={props.imperialHeight} imperialWeight={props.imperialWeight} bodyMeasurements={props.bodyMeasurements} updateHeight={props.updateHeight} updateWeight={props.updateWeight}/>
        <CoreMeasurements bodyMeasurements={props.bodyMeasurements} changeInseam={props.changeInseam} changeFootLength={props.changeFootLength} changeTorso={props.changeTorso}
      changeArm={props.changeArm}/>
        <ShouldersSitBones bodyMeasurements={props.bodyMeasurements} changeShoulders={props.changeShoulders} changeSitBones={props.changeSitBones}/>
     </Panel.Body>
     </Panel>
      
    )
  }

export default BodyMeasurements;  