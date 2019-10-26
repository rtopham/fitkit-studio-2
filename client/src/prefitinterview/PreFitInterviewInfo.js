import React, {Component} from 'react'
import {FormGroup, FormControl, ControlLabel, Panel} from "react-bootstrap"
import clientconfig from '../clientconfig/config'
import "./PreFit.css"

class PreFitInterviewInfo extends Component {
state = {
      expand:false
    }



handleClose = () => {
    this.setState({ show: false});
    this.toggleExpand()

  }  

toggleExpand =() =>{
    this.setState({expand:!this.state.expand})
  }

  render() {

    return (<div className="modal-container">
      <Panel id="PreFitInterviewInfo" onToggle={this.toggleExpand} expanded={this.state.expand}>
      <Panel.Heading><Panel.Title>
        <Panel.Toggle href="#" componentClass="a">
        Pre-Fit Interview Information
        </Panel.Toggle>
        </Panel.Title></Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          <FormGroup>
          <ControlLabel>URL for Customers to Complete Pre-Fit Interview</ControlLabel>
          <FormControl.Static>{clientconfig.appUrlBase}pre-fit-interview/{this.props.user._id}</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Pretty Links</ControlLabel>
          <FormControl.Static><a href={`${clientconfig.appUrlBase}pre-fit-interview/${this.props.user._id}`}>Bike-Fit Interview</a></FormControl.Static>
          <FormControl.Static><a href={`${clientconfig.appUrlBase}pre-fit-interview/${this.props.user._id}`}>Pre-Fit Interview</a></FormControl.Static>
          {this.props.shop.name&&
          <div>
          <FormControl.Static><a href={`${clientconfig.appUrlBase}pre-fit-interview/${this.props.user._id}`}>{this.props.shop.name+' Bike-Fit Interview'}</a></FormControl.Static>
          <FormControl.Static><a href={`${clientconfig.appUrlBase}pre-fit-interview/${this.props.user._id}`}>{this.props.shop.name+' Pre-Fit Interview'}</a></FormControl.Static>
          </div>
          }
        </FormGroup>        
      </Panel.Body>
      <Panel.Footer>
      </Panel.Footer>

      </Panel.Collapse>
      </Panel>
  </div>)
  }
}

export default PreFitInterviewInfo