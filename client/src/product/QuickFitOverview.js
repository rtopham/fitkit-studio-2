
import React, {Component} from 'react'
import {Panel, Tabs, Button, Glyphicon, Image, Tab} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import QuickFitCarousel from './QuickFitCarousel'
import QuickFitPDFCarousel from './QuickFitPDFCarousel'
import QuickFitSS1 from './../assets/ScreenShots/QuickFit/QuickFitSS1.png'
import PreFitSS1 from './../assets/ScreenShots/QuickFit/PreFitSS1.png'
import QuickFitBrandingSS from './../assets/ScreenShots/QuickFit/QuickFitBrandingSS.png'
import './Product.css';

class QuickFitOverview extends Component {
  state={
    key:1
  }

handleSelect=(key)=>{
  this.setState({key})
}

  render() {
    return (
        <div className="globalCore">
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                <span>Quick Fit Features</span><LinkContainer to="/"><Button className="pull-right back-link" bsStyle="link" bsSize="xsmall"><Glyphicon glyph="arrow-left"></Glyphicon></Button></LinkContainer>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            <Tabs className="fks-tabs" activeKey={this.state.key} onSelect={this.handleSelect} id="quick-fit-features-tabs">
              <Tab eventKey={1} title="Overview">
              <h4>Overview</h4>
            <p>Quick Fit is an affordable, dedicated software solution for independent bike fitting professionals and bike shops. Quick Fit features include additional sizing calculations,
              cloud storage of pre-fit customer interviews, cyclist data, bike equipment and fit position data, summary PDF reports for printing or emailing to customers,
              automated customer intake processes, and customized bike shop or fitting studio branding. All registered users are eligible for a free 60-day trial of Quick Fit.
              </p>
              </Tab>
              <Tab eventKey={2} title="Customer Intake">
            <h4>Customer Intake</h4>
            <p>Quick Fit includes a comprehensive online pre-fit interview form that can be customized with your logo and contact details. Each pre-fit interview completed by a customer
              is automatically associated with your user account and can be used to automatically populate data for a new or existing customer. If the customer is being fit for a
              specific bike, a new bike is created in the customer's profile and populated with the applicable data.</p>
              </Tab>
              <Tab eventKey={3} title="Customer/Bike Data">
              <h4>Customer and Bike Data</h4>
            <p>All customer data is stored in the cloud and linked to your account. Customer data includes cyclist profile information, body measurements, soft scores,
              intake notes and pre-fit interview summaries. One or more bikes can be created and associated with each customer. For each bike created, equipment details
              and measurements, fit position details and measurements and other details are recorded and stored.
            </p>
              </Tab>
              <Tab eventKey={4} title="PDF Reports">
              <h4>PDF Reports</h4>
            <p>Quick Fit can generate two key reports for customers in PDF format. A simple sizing recommendation report can be generated for printing or emailing to
              customers seeking advice on pre-purchase sizing. For customers receiving a complete bike fit, a detailed summary report containing bike-specific equipment and
              fit position information can be generated for printing or emailing. PDF reports can be customized with user contact information and logos.
            </p>
              </Tab>
              <Tab eventKey={5} title="Branding">
              <h4>Customized Branding</h4>
            <p>Customize your pre-fit interview forms and PDF summary reports with your contact details and logo. These settings are stored in your account details
              and can be modified at any time.
            </p>
              </Tab>
              </Tabs>
            </Panel.Body>
            {this.state.key===1&&<Image responsive width="99%" src={QuickFitSS1}/>}
            {this.state.key===2&&<Image responsvie width="99%" src={PreFitSS1}/>}
            {this.state.key===3&&<QuickFitCarousel/>}
            {this.state.key===4&&<div><hr></hr><QuickFitPDFCarousel/></div>}
            {this.state.key===5&&<Image responsvie width="99%" src={QuickFitBrandingSS}/>}
          </Panel>
   
        </div>
        
    )
  }
}


export default QuickFitOverview
