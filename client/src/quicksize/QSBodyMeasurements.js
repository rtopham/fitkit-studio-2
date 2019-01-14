import React, { Component } from 'react'
import {Panel} from "react-bootstrap"
import './QuickSize.css'
import CoreMeasurements from './CoreMeasurements'

class QSBodyMeasurements extends Component {

  render() {
 
    return (
      <Panel>
        <Panel.Body className="qs-input-panel">
        <CoreMeasurements bodyMeasurements={this.props.bodyMeasurements} changeInseam={this.props.changeInseam} changeFootLength={this.props.changeFootLength} changeTorso={this.props.changeTorso}
      changeArm={this.props.changeArm}/>
     </Panel.Body>
     </Panel>
      
    )
  }
}

export default QSBodyMeasurements;  