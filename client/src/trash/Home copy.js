
import React, {Component} from 'react'
import {Image, Panel} from 'react-bootstrap'
import bikeImage from './../assets/Bikes/FitKit3Rd.png'
import './Core.css';
import clientconfig from './../clientconfig/config'

class Home extends Component {

    state = {
        response: ''
      };
    /*
      componentDidMount() {
    
        this.callApi()
          .then (res=> this.setState ({response:'nothing yet'}))
          //.then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
 
      }
    
      callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
      };
*/
  render() {
    return (
        <div className="globalCore">
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                Home
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Image responsive className="homeBikeImage" src={bikeImage}></Image>
              Fit Kit Studio, brought to you by <a href="https:fitkitsystems.com">Fit Kit Systems</a>, is a web application for:
              <p></p>
              <ul>
<li>Bike Sizing using the Fit Kit System;</li>
<li>Bike Fit documentation that can be used with any fitting system or method.</li>
</ul>
<p>The Fit Kit Studio Quick Size service is free of charge to all registered users. Quick Fit, available for a small monthly or annual fee, 
              provides even more features, including additional sizing calculations, cloud storage of pre-fit interviews, cyclist data and bike fit data, summary PDF reports for printing 
              or emailing to customers, and customized bike shop or fitting studio branding. All registerd users are eligible for a free {clientconfig.trialPeriod}-day trial of Quick Fit.
            </p>
            </Panel.Body>
          </Panel>
        </div>
        
    )
  }
}


export default Home
