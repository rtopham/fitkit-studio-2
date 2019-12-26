import React from 'react'
import {FormControl} from "react-bootstrap"
import './QuickSize.css'

const QuickSizeSlider=(props)=>{

return(
   <div className="two-column">
   <FormControl id={props.label} disabled={false} type="range" className="slider qs-control-margin" value={props.value}
                min={props.min} max={props.max} step={props.step}
                onChange={props.onChange}
                 />
  </div>
                    
                 
        )
  }
  
export default QuickSizeSlider
