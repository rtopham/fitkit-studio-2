import React, { Component } from 'react'
import {FormControl} from "react-bootstrap"
import './QuickSize.css'

class QuickSizeSlider extends Component{

  render(){



    return(
      <div>
   <FormControl id={this.props.label} disabled={false} type="range" className="slider qs-control-margin" value={this.props.value}
                min={this.props.min} max={this.props.max} step={this.props.step}
                onChange={this.props.onChange}
                 />
</div>
                    
                 
        )
  }
  
}

export default QuickSizeSlider
