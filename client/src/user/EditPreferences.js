import React, {Component} from 'react'
import {Modal, Well, FormGroup, ControlLabel, Radio, Panel, Button} from "react-bootstrap"
import {update} from './api-user'
import auth from '../auth/auth-helper'
import {recordLogAction} from './../log/api-log'
import "./Users.css"

class EditPreferences extends Component {
state = {
      show:false,
      expand:false,
      error: ''
    }

clickUpdatePreferences = () => {
    let jwt = auth.isAuthenticated()
    const user = {
      preferences: {height_units:this.props.user.preferences.height_units,weight_units:this.props.user.preferences.weight_units}
    }
    update({
      userId: this.props.user._id
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        jwt.user.preferences=user.preferences
        sessionStorage.setItem('jwt', JSON.stringify(jwt))
        this.setState({show: true})
        const logData={userId:this.props.user._id,action: "changed preferences", description: "User "+this.props.user.name+" changed his or her preferences."}
        recordLogAction(logData)
      }
    })
  }

handleClose = () => {
    this.setState({ show: false, expand:false });

  }  

toggleExpand =() =>{
    this.setState({expand:!this.state.expand})
  }

  render() {
    return (<div className="modal-container">
      <Panel id="editProfile" onToggle={this.toggleExpand} expanded={this.state.expand}>
      <Panel.Heading><Panel.Title>
        <Panel.Toggle href="#" componentClass="a">
        Preferences
        </Panel.Toggle>
        </Panel.Title></Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
        <Well className="preferencesWell">
     <div className="row">
     <div className="preferencesColumn">
      <FormGroup>
        <ControlLabel>Height Display Units</ControlLabel>
        <Radio onChange={this.props.changeHeightUnits} checked={this.props.user.preferences.height_units==="Metric"} value="Metric" name="heightGroup">Metric (cm.)</Radio>
        <Radio onChange={this.props.changeHeightUnits} checked={this.props.user.preferences.height_units==="Imperial"} value="Imperial" name="heightGroup">Imperial (in.)</Radio>
        </FormGroup>
        </div>
      <div className="preferencesColumn">
      <FormGroup>
        <ControlLabel>Weight Display Units</ControlLabel>
        <Radio onChange={this.props.changeWeightUnits} checked={this.props.user.preferences.weight_units==="Metric"} value="Metric" name="weightGroup">Metric (kgs.)</Radio>
        <Radio onChange={this.props.changeWeightUnits} checked={this.props.user.preferences.weight_units==="Imperial"} value="Imperial" name="weightGroup">Imperial (lbs.)</Radio>
        </FormGroup>
        </div>        
        </div>
        </Well>
              </Panel.Body>

      <Panel.Footer>
        <Button color="primary" disabled={false} onClick={this.clickUpdatePreferences} className="">Update Preferences</Button>
      </Panel.Footer>

      </Panel.Collapse>
      </Panel>

      <Modal container={this} show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>Update Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Preferences successfully updated.</h4>
        </Modal.Body>
        <Modal.Footer>

            <Button bsStyle="primary" onClick={this.handleClose}>
              Ok
            </Button>

        </Modal.Footer>
      </Modal>

  </div>)
  }
}

export default EditPreferences
