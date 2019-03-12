import React, {Component} from 'react'
import {Well, Panel} from "react-bootstrap"
import "./Shop.css"

class ShopStudioUpgradeNotice extends Component {
state = {
      show:false,
      expand:false,
      error: ''
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
      <Panel id="editProfile" onToggle={this.toggleExpand} expanded={this.state.expand}>
      <Panel.Heading><Panel.Title>
        <Panel.Toggle href="#" componentClass="a">
        Shop/Studio Information
        </Panel.Toggle>
        </Panel.Title></Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
<Well>Applicable to subscribers of Quick Size Plus only.
  <p>Upgrade to Quick Size Plus to create customized PDF reports containing shop or studio details, contact info and logo.
  <br/>PDF reports can be printed and/or emailed to customers.</p>
  <a href="/FKS_Sample.pdf">Sample Custom PDF Report</a> </Well>

              </Panel.Body>

      <Panel.Footer>

      </Panel.Footer>

      </Panel.Collapse>
      </Panel>


  </div>)
  }
}

export default ShopStudioUpgradeNotice