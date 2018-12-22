import React, { Component } from 'react'
import {Panel, FormControl, FormGroup} from "react-bootstrap"

class CyclistNotes extends Component {

  render() {
 
   return (
<Panel>
  <Panel.Body className="input-panel">
<FormGroup>
  <FormControl componentClass="textarea" rows="8" spellCheck placeholder="Enter notes here." value={this.props.notes} onChange={this.props.changeNotes}></FormControl>
</FormGroup>
</Panel.Body>
</Panel>
    )
  }
}

export default CyclistNotes;  