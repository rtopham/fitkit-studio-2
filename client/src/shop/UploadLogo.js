import React, {Component} from 'react'
import {Glyphicon, Panel, Button,FormGroup} from "react-bootstrap"
//import auth from '../auth/auth-helper.js'
import "./Shop.css"

class UploadLogo extends Component {
  state = {
    photo: '',
    error: ''
    
  }

  componentDidMount = () => {
    this.logoData = new FormData()

  }

  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.logoData.set(name, value)
    this.setState({ [name]: value })
 
    let reader=new FileReader()
    reader.onload=(e)=>{
      let logo = e.target.result
//      this.setState({logo})
      this.props.updateLogoState(logo)
      this.props.updateShopData(value)
    }
    if(event.target.files[0]) reader.readAsDataURL(event.target.files[0])
    


  }
  
  render() {
//console.log(this.props.logoUrl)
let logoUrl=null
if(!this.props.logoUrl&&!this.props.tempLogo) logoUrl=null
if(this.props.tempLogo) logoUrl = this.props.tempLogo
if(!this.props.tempLogo&&this.props.logoUrl) logoUrl = this.props.logoUrl

    return (<div>
      <Panel hidden={this.props.hidden}>
      <Panel.Heading>
    <Panel.Title>Upload Logo</Panel.Title>
            
      </Panel.Heading>    
      <Panel.Body>
        <FormGroup  className="NewLogo">
        <input disabled={this.props.disabled} accept="image/*" onChange={this.handleChange('photo')} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
        <span><Button componentClass="span"><Glyphicon glyph="picture" /></Button></span>
        </label>
        {/*<span className="NewLogoFileName" >{this.state.photo ? this.state.photo.name : ''}</span>*/}
        {logoUrl ? <img className="LogoImage" src={logoUrl} alt="No Logo on File"></img>:'   No Logo on File'}

        </FormGroup>
        <FormGroup>
        { this.state.error && (<span>
            <Glyphicon glyph="warning-sign"></Glyphicon>{this.state.error}</span>)
        }
        </FormGroup>
      </Panel.Body>
{/*      <Panel.Footer>
        <Button color="primary" disabled={this.state.photo===''} onClick={this.clickUploadLogo} className="">Upload</Button>
</Panel.Footer>*/}
    </Panel>
  </div>)
  }
}

export default UploadLogo
