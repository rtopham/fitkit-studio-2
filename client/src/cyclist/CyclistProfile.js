import React from 'react'
import {Col, Panel, Radio, Form, FormControl, FormGroup, ControlLabel} from "react-bootstrap"
import {validateInputLength, validateBirthDate, validateEmail, validatePhone, validateZipCode} from '../lib/form-validation'
import './Cyclist.css'

const CyclistProfile=(props)=> {

   return (
    <Panel>
      <Panel.Body>
      <Form className="profile-form-margin" horizontal>
      <FormGroup validationState={validateInputLength(props.cyclistProfile.firstName,2)}>
        <Col componentClass={ControlLabel} sm={2}>
        First Name:
        </Col>
        <Col sm={10}>
        <FormControl  disabled={!props.editProfile} value={props.cyclistProfile.firstName} onChange={props.handleChange("firstName")}/>
        </Col>
        </FormGroup>
        <FormGroup validationState={validateInputLength(props.cyclistProfile.lastName,2)}>
        <Col componentClass={ControlLabel} sm={2}>
        Last Name:
        </Col>
        <Col sm={10}>
        <FormControl disabled={!props.editProfile} value={props.cyclistProfile.lastName} onChange={props.handleChange("lastName")}/>
        </Col>
        </FormGroup>
        <FormGroup validationState={validateEmail(props.cyclistProfile.email)}>
        <Col componentClass={ControlLabel} sm={2}>
        Email:
        </Col>
        <Col sm={10}>
        <FormControl disabled={!props.editProfile} value={props.cyclistProfile.email} onChange={props.handleChange("email")}/>
        </Col>
        </FormGroup>
        <FormGroup validationState={validatePhone(props.cyclistProfile.phone)}>
        <Col componentClass={ControlLabel} sm={2}>
        Phone:
        </Col>
        <Col sm={10}>
        <FormControl disabled={!props.editProfile} value={props.cyclistProfile.phone} onChange={props.handleChange("phone")}/>
        </Col>   
        </FormGroup>
        <FormGroup validationState={validateZipCode(props.cyclistProfile.zipCode)}>
        <Col componentClass={ControlLabel} sm={2}>
        Zip Code:
        </Col>
        <Col sm={10}>
        <FormControl disabled={!props.editProfile} value={props.cyclistProfile.zipCode} onChange={props.handleChange("zipCode")}/>
        </Col>
        </FormGroup>
        <FormGroup validationState={validateBirthDate(props.cyclistProfile.birthDate.substring(0,10))}>
        <Col componentClass={ControlLabel} sm={2}>
        Birth Date:
        </Col>
        <Col sm={10}>
        <FormControl type="date" disabled={!props.editProfile} value={props.cyclistProfile.birthDate.substring(0,10)} onChange={props.handleChange("birthDate")}/>
        </Col> 
        </FormGroup>
        <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
        Gender:
        </Col>
        <Col sm={10}>
        <Radio inline disabled={!props.editProfile} onChange={props.handleChange("gender")} checked={props.cyclistProfile.gender==="Male"} value="Male" name="gender">Male</Radio>
        <Radio inline disabled={!props.editProfile} onChange={props.handleChange("gender")} checked={props.cyclistProfile.gender==="Female"} value="Female" name="gender">Female</Radio>
        <Radio inline disabled={!props.editProfile} onChange={props.handleChange("gender")} checked={props.cyclistProfile.gender==="Non-Binary"} value="Non-Binary" name="gender">Non-Binary</Radio>
        </Col>    
        </FormGroup>
 

      </Form>
      </Panel.Body>
      </Panel>
    )
  }

export default CyclistProfile;  