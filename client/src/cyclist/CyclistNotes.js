import React from 'react'
import {Panel, FormControl, FormGroup} from "react-bootstrap"

const CyclistNotes=(props)=> {

return (
<Panel>
  <Panel.Body className="input-panel">
<FormGroup>
  <FormControl componentClass="textarea" rows="8" spellCheck placeholder="Enter notes here." value={props.notes} onChange={props.changeNotes}></FormControl>
</FormGroup>
</Panel.Body>
</Panel>
    )
  }

export default CyclistNotes;  