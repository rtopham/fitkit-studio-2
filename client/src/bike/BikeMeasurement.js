import React from 'react'
import {OverlayTrigger, FormControl, FormGroup, InputGroup} from 'react-bootstrap'
import {validateMeasurement, validateAngle} from './../lib/form-validation'
import './Bike.css'



const BikeMeasurement=(props)=>{

    let mUnit= props.id.includes("Angle") ? 'deg.' : 'mm.'
    let min =  props.id.includes("Angle") ? '-45' : '0'
    if(props.id==='mtbSaddleToGripCenterDropRise') min='-200'
    let tdClass='bikeCol1'
    

    if(props.id==='shoeSize'){
         mUnit=''
         tdClass=''
    }

    const validate=()=>{
        if(props.id.includes("Angle")===false&&props.id==='mtbSaddleToGripCenterDropRise') return validateAngle(props.bike[props.id], props.originalBike[props.id])
        if(props.id.includes("Angle")===false) return validateMeasurement(props.bike[props.id], props.originalBike[props.id])
        return validateAngle(props.bike[props.id], props.originalBike[props.id])
        }


    if(!props.show)return null
    return(
        <OverlayTrigger trigger={['hover','focus']}
        placement="bottom"
        overlay={props.overlay}>
        <tr id={props.id}>
          <td className={tdClass}><FormControl.Static className="form-control-static">{props.title}:</FormControl.Static></td>
          <td>{props.editFields&&
              <FormGroup className="bikeFormGroup" validationState={validate()}>
              <InputGroup className="bikeActualInput">
              <FormControl type="number" min={min} bsSize="sm" value={props.bike[props.id]} onChange={props.handleChange(props.id)}/>
              {props.id!=='shoeSize'&&<InputGroup.Addon className="addOn">{mUnit}</InputGroup.Addon>}
              </InputGroup>
              </FormGroup>}

              {!props.editFields&&
              <FormControl.Static className="form-control-static">{props.bike[props.id]+` ${mUnit}`}</FormControl.Static>}
          </td>
    
        </tr>
        </OverlayTrigger>
    )
}

export default BikeMeasurement