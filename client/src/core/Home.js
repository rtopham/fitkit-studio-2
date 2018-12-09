
import React, {Component} from 'react'
import {Image, Panel} from 'react-bootstrap'
import bikeImage from './../assets/FitKit2.png'
import './Core.css';

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
                Introducing Fit Kit Studio
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Image className="homeBikeImage" src={bikeImage}></Image>
              Fit Kit Studio, brought to you by <a href="https:fitkitsystems.com">Fit Kit Systems</a>, is a web application for:
              <p></p>
              <ul>
<li>Bike Sizing using the Fit Kit System;</li>
<li>Bike Fit documentation that can be used with any fitting system or method.</li>
</ul>
<p>The Fit Kit Studio Quick Size service is free of charge to all registered users. Quick Size Plus, available for a small monthly or annual fee, 
              provides even more features, including cloud storage of cyclist data, additional calculations, summary PDF reports for printing 
              or emailing to customers, customized fitting studio branding, and two additional users at no extra charge.
            </p>
            </Panel.Body>
          </Panel>
        </div>
        
    )
  }
}


export default Home
