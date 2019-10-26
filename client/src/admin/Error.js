import React, {Component} from 'react'
import {Panel} from "react-bootstrap"
import "./Admin.css";

class Error extends Component {
 render() {

  return (

      <div className="error">
      <Panel>
        <Panel.Heading>Error</Panel.Heading>
        <Panel.Body>
          <p>
          Sorry, that page doesn't exist.
          </p>
      </Panel.Body>
      </Panel>
                                  
      
</div>
    )
  }
}

export default Error
