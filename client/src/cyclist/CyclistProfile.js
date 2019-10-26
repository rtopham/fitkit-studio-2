import React, { Component } from 'react'
import {Col, Panel, Radio, Form, FormControl, FormGroup, ControlLabel} from "react-bootstrap"
import {validateInputLength, validateBirthDate, validateEmail, validatePhone, validateZipCode} from '../lib/form-validation'
import './Cyclist.css'

class CyclistProfile extends Component {


  render() {
 
   return (
    <Panel>
      <Panel.Body>
      <Form className="profile-form-margin" horizontal>
      <FormGroup validationState={validateInputLength(this.props.cyclistProfile.firstName,2)}>
        <Col componentClass={ControlLabel} sm={2}>
        First Name:
        </Col>
        <Col sm={10}>
        <FormControl  disabled={!this.props.editProfile} value={this.props.cyclistProfile.firstName} onChange={this.props.handleChange("firstName")}/>
        </Col>
        </FormGroup>
        <FormGroup validationState={validateInputLength(this.props.cyclistProfile.lastName,2)}>
        <Col componentClass={ControlLabel} sm={2}>
        Last Name:
        </Col>
        <Col sm={10}>
        <FormControl disabled={!this.props.editProfile} value={this.props.cyclistProfile.lastName} onChange={this.props.handleChange("lastName")}/>
        </Col>
        </FormGroup>
        <FormGroup validationState={validateEmail(this.props.cyclistProfile.email)}>
        <Col componentClass={ControlLabel} sm={2}>
        Email:
        </Col>
        <Col sm={10}>
        <FormControl disabled={!this.props.editProfile} value={this.props.cyclistProfile.email} onChange={this.props.handleChange("email")}/>
        </Col>
        </FormGroup>
        <FormGroup validationState={validatePhone(this.props.cyclistProfile.phone)}>
        <Col componentClass={ControlLabel} sm={2}>
        Phone:
        </Col>
        <Col sm={10}>
        <FormControl disabled={!this.props.editProfile} value={this.props.cyclistProfile.phone} onChange={this.props.handleChange("phone")}/>
        </Col>   
        </FormGroup>
        <FormGroup validationState={validateZipCode(this.props.cyclistProfile.zipCode)}>
        <Col componentClass={ControlLabel} sm={2}>
        Zip Code:
        </Col>
        <Col sm={10}>
        <FormControl disabled={!this.props.editProfile} value={this.props.cyclistProfile.zipCode} onChange={this.props.handleChange("zipCode")}/>
        </Col>
        </FormGroup>
        <FormGroup validationState={validateBirthDate(this.props.cyclistProfile.birthDate.substring(0,10))}>
        <Col componentClass={ControlLabel} sm={2}>
        Birth Date:
        </Col>
        <Col sm={10}>
        <FormControl type="date" disabled={!this.props.editProfile} value={this.props.cyclistProfile.birthDate.substring(0,10)} onChange={this.props.handleChange("birthDate")}/>
        </Col> 
        </FormGroup>
        <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
        Gender:
        </Col>
        <Col sm={10}>
        <Radio inline disabled={!this.props.editProfile} onChange={this.props.handleChange("gender")} checked={this.props.cyclistProfile.gender==="Male"} value="Male" name="gender">Male</Radio>
        <Radio inline disabled={!this.props.editProfile} onChange={this.props.handleChange("gender")} checked={this.props.cyclistProfile.gender==="Female"} value="Female" name="gender">Female</Radio>
        <Radio inline disabled={!this.props.editProfile} onChange={this.props.handleChange("gender")} checked={this.props.cyclistProfile.gender==="Non-Binary"} value="Non-Binary" name="gender">Non-Binary</Radio>
        </Col>    
        </FormGroup>
 

      </Form>
      </Panel.Body>
      </Panel>
    )
  }
}

export default CyclistProfile;  