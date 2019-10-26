import React, {Component} from 'react'
import {Panel, Modal, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import {validateInputLength, validateEmail} from '../lib/form-validation'
import {sendContactMessage} from './api-admin'
import {LinkContainer} from 'react-router-bootstrap'
import {recordLogAction} from './api-admin'

class Contact extends Component {
  constructor(props, context) {
    super(props, context);

  this.state = {
      name: '', 
      subject:'',
      email: '',
      message:'',
      show: false,
      error: ''
  }

  
  this.handleClose = this.handleClose.bind(this);
}

  validateForm() {
    return (
      validateInputLength(this.state.name,2)==='success'&&
      validateEmail(this.state.email)==='success'&&
      validateInputLength(this.state.subject,2)==='success'&&
      validateInputLength(this.state.message,2)==='success'
    );
  }  

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  clickSubmit = (e) => {

    e.preventDefault()
    const message = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      subject: this.state.subject || undefined,
      message: this.state.message || undefined
    }

sendContactMessage(message).then((data) => {

      if (data.error) {

        this.setState({error: data.error})
      } else {
        this.setState({error: '', show: true})
        const logData={action: "support message sent", description: message.email+" sent a message via contact form."}
        recordLogAction(logData)
      }
    })
  }

  handleClose() {
    this.setState({ show: false });
  }  

  render() {
    let ErrorPanel=''
    if (this.state.error) ErrorPanel = (<Panel.Footer className="centerthis"><span className="glyphicon glyphicon-exclamation-sign"></span> <span>{this.state.error}</span></Panel.Footer>); else ErrorPanel=null
    return (
      <div className="Signup">
      <Panel>
        <Panel.Heading>Contact</Panel.Heading>
        <Panel.Body>
        <p>
          Get in touch by phone in the USA at 1-800-434-8548.
          <br/>
          <br/>
          Or use the form below to send and email.
          </p> 
      <form onSubmit={this.clickSubmit}>
      <FormGroup controlId="name" bsSize="large" validationState={validateInputLength(this.state.name,2)}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large" validationState={validateEmail(this.state.email)}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="subject" bsSize="large" validationState={validateInputLength(this.state.subject,2)}>
          <ControlLabel>Subject</ControlLabel>
          <FormControl
            value={this.state.subject}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="message" bsSize="large" validationState={validateInputLength(this.state.message,2)}>
        <ControlLabel>Message</ControlLabel>
        <FormControl componentClass="textarea" rows="8" spellCheck placeholder="Enter message." value={this.state.message} onChange={this.handleChange}></FormControl>
        </FormGroup>
        <Button
          type="submit"
          block
          bsSize="large"
          disabled={!this.validateForm()}>
          Send Message
          </Button>
      </form>
      {ErrorPanel}
      </Panel.Body>
      </Panel>
      <Modal show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Message successfully sent.</h4>
        </Modal.Body>
        <Modal.Footer>
          <LinkContainer to="/">
            <Button color="primary" onClick={this.handleClose} autoFocus="autoFocus">
              Ok
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
      
      </div>
    )
  }
}

export default Contact
