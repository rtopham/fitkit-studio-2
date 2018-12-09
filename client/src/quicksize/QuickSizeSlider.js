import React, { Component } from 'react'
import {FormGroup, OverlayTrigger, Glyphicon, ControlLabel, FormControl} from "react-bootstrap"
import './QuickSize.css'

class QuickSizeSlider extends Component{

  render(){



    return(
   <FormGroup >
   <ControlLabel>{this.props.label+": "+this.props.value+" "+this.props.units+" "}
   <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={this.props.overlay}><Glyphicon glyph="info-sign"></Glyphicon>
   </OverlayTrigger>
   </ControlLabel> 
   <FormControl id={this.props.label} disabled={false} type="range" className="slider" value={this.props.value}
                min={this.props.min} max={this.props.max} step={this.props.step}
                onChange={this.props.onChange}
                 />
                 </FormGroup>
        )
  }
  
}

export default QuickSizeSlider
