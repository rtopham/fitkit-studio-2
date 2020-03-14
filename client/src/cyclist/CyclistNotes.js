import React from 'react'
import {Panel, FormControl, FormGroup, ControlLabel} from "react-bootstrap"

const CyclistNotes=(props)=> {

return (
<Panel>
  <Panel.Body className="input-panel">
<FormGroup>
  <ControlLabel>Shared Notes</ControlLabel>
  <FormControl componentClass="textarea" rows="8" spellCheck placeholder="Enter shared notes here (these notes appear on PDF Sizing Report)." value={props.notes} onChange={props.changeNotes}></FormControl>

</FormGroup>
<FormGroup>
  <ControlLabel>Confidential Notes</ControlLabel>
<FormControl componentClass="textarea" rows="8" spellCheck placeholder="Enter confidendtial notes here (these notes will not appear on PDF reports)." value={props.confidentialNotes} onChange={props.changeConfidentialNotes}></FormControl>
</FormGroup>
</Panel.Body>
</Panel>
    )
  }

export default CyclistNotes;  