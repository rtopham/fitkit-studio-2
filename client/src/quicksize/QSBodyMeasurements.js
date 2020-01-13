import React from 'react'
import {Panel} from "react-bootstrap"
import './QuickSize.css'
import CoreMeasurements from './CoreMeasurements'

const QSBodyMeasurements=(props)=>{

    return (
      <Panel>
        <Panel.Body>
        <CoreMeasurements bodyMeasurements={props.bodyMeasurements} changeInseam={props.changeInseam} changeFootLength={props.changeFootLength} changeTorso={props.changeTorso}
      changeArm={props.changeArm}/>
     </Panel.Body>
     </Panel>
      
    )
  }

export default QSBodyMeasurements;  