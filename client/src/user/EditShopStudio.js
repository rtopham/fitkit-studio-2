import React, {Component} from 'react'
import {Modal, Well, FormGroup, Form, FormControl, ControlLabel, Radio, Panel, Button} from "react-bootstrap"
import {validateInputLength, validatePassword, validateConfirmPassword, validateEmail} from './../lib/form-validation'
import {update} from './api-user'
import auth from '../auth/auth-helper'
import "./Users.css"

class EditShopStudio extends Component {
state = {
      show:false,
      expand:false,
      error: ''
    }

clickUpdateShopStuido = () => {
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
        Shop/Studio Information
        </Panel.Toggle>
        </Panel.Title></Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
        <Form>
                <FormGroup validationState={validateInputLength(this.props.user.shopStudioName,2)}>
                  <ControlLabel>Shop or Studio Name</ControlLabel>
                  <FormControl
                  value={this.props.user.shopStudioName}
                  onChange={this.props.handleShopStudioChange("name")}
                  name="name" autoFocus />
                </FormGroup>
</Form>
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

export default EditShopStudio