import React, {Component} from 'react'
import {Modal, FormGroup, Form, FormControl, ControlLabel, Radio, Panel, Button} from "react-bootstrap"
import {validateInputLength, validatePhone, validateWebsite} from '../lib/form-validation'
import {update} from '../user/api-user'
import {create} from './api-shop'
import auth from '../auth/auth-helper'
import UploadLogo from './UploadLogo'
import {recordLogAction} from './../log/api-log'
import "./Shop.css"

class NewShopStudio extends Component {
state = {
      show:false,
      expand:false,
      error: ''
    }

componentDidMount=()=>{
  this.shopData= new FormData()
}

clickSaveShopStudio = () => {
    let jwt = auth.isAuthenticated()
    const user = {
      shop_owner: true
    }
    update({
      userId: this.props.user._id
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        jwt.user.shop_owner=user.shop_owner
        sessionStorage.setItem('jwt', JSON.stringify(jwt))
//        this.setState({show: true})
        this.createNewShop()
      }
    })
  }

createNewShop= ()=>{
  let jwt = auth.isAuthenticated()
/*  
  const shop = {
    active: this.props.shop.active, name: this.props.shop.name, address: this.props.shop.address,
    phone: this.props.shop.phone, website: this.props.shop.website, logo: this.props.shop.logo, owner: this.props.user._id
  }
*/

  this.shopData.set('active', this.props.shop.active)
  this.shopData.set('name', this.props.shop.name)
  this.shopData.set('address', this.props.shop.address)
  this.shopData.set('address2', this.props.shop.address2)
  this.shopData.set('phone', this.props.shop.phone)
  this.shopData.set('website', this.props.shop.website)
  this.shopData.set('owner', this.props.user._id)

  
  create({
    userId: this.props.user._id
  }, {
    t: jwt.token
  }, this.shopData).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
      console.log(data.error)
    } else {
      this.setState({show: true})
      const logData={userId:this.props.user._id,action: "created shop", description: "User "+this.props.user.name+" created a shop called "+this.props.shop.name+".",documentId:data._id}
      recordLogAction(logData)
    }
  })
}

updateShopData= (file) =>{
  this.shopData.set('logo', file)
//  console.log(file)
}

handleClose = () => {
    this.setState({ show: false});
    this.toggleExpand()
  }  

toggleExpand =() =>{
    this.setState({expand:!this.state.expand})
  }

  validateShopStudioForm() {
    return (
      validateInputLength(this.props.shop.name,2)==='success'&&
      (validateInputLength(this.props.shop.address,2)==='success')&&
      (validateInputLength(this.props.shop.address2,2)==='success')&&
      (validatePhone(this.props.shop.phone)==='success'|validatePhone(this.props.shop.phone)===null)&&
      (validateWebsite(this.props.shop.website)==='success'|validateWebsite(this.props.shop.website)===null)
    );
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
          <FormGroup>
          <ControlLabel>Shop or Studio Branding (for PDF Reports)</ControlLabel>
          <Radio onChange={this.props.changeShopStatus} checked={!this.props.shop.active} value={false} name="activeGroup">Use Default Branding</Radio>
          <Radio onChange={this.props.changeShopStatus} checked={this.props.shop.active} value={true} name="activeGroup">Use Custom Shop or Studio Branding</Radio>
          </FormGroup>
          <FormGroup hidden={!this.props.shop.active} validationState={validateInputLength(this.props.shop.name,2)}>
            <ControlLabel>Shop or Studio Name</ControlLabel>
            <FormControl
            disabled={!this.props.shop.active}
            value={this.props.shop.name}
            maxLength={35}
            onChange={this.props.changeShopStudio("name")}
            name="name"/>
          </FormGroup>
          <FormGroup hidden={!this.props.shop.active} validationState={validateInputLength(this.props.shop.address,2)}>
            <ControlLabel>Address</ControlLabel>
            <FormControl
            disabled={!this.props.shop.active}
            value={this.props.shop.address}
            maxLength={35}
            onChange={this.props.changeShopStudio("address")}
            name="address"/>
          </FormGroup>
          <FormGroup hidden={!this.props.shop.active} validationState={validateInputLength(this.props.shop.address2,2)}>
            <ControlLabel>Address (line 2)</ControlLabel>
            <FormControl
            disabled={!this.props.shop.active}
            value={this.props.shop.address2}
            maxLength={35}
            onChange={this.props.changeShopStudio("address2")}
            name="address2"/>
          </FormGroup>
          <FormGroup hidden={!this.props.shop.active} validationState={validatePhone(this.props.shop.phone,2)}>
            <ControlLabel>Phone</ControlLabel>
            <FormControl
            disabled={!this.props.shop.active}
            value={this.props.shop.phone}
            maxLength={35}
            onChange={this.props.changeShopStudio("phone")}
            name="phone"/>
          </FormGroup>
          <FormGroup hidden={!this.props.shop.active} validationState={validateWebsite(this.props.shop.website,2)}>
            <ControlLabel>Website</ControlLabel>
            <FormControl
            disabled={!this.props.shop.active}
            value={this.props.shop.website}
            maxLength={35}
            onChange={this.props.changeShopStudio("website")}
            name="website"/>
          </FormGroup>
</Form>
<UploadLogo tempLogo={this.props.tempLogo} logoUrl={this.props.logoUrl} updateLogoState={this.props.updateLogoState} shop={this.props.shop} user={this.props.user} hidden={!this.props.shop.active}
disabled={!this.props.shop.active} updateShopData={this.updateShopData}/>
              </Panel.Body>

      <Panel.Footer>
        <Button color="primary" disabled={!this.props.shop.active||this.props.shop.name===''||!this.validateShopStudioForm()} onClick={this.clickSaveShopStudio} className="">Save New Shop/Studio Information</Button>
      </Panel.Footer>

      </Panel.Collapse>
      </Panel>

      <Modal container={this} show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>Save New Shop/Studio Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Shop/Studio Information successfully saved.</h4>
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

export default NewShopStudio