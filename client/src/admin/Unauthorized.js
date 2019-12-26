import React from 'react'
import {Panel} from "react-bootstrap"
import "./Admin.css";

const Unauthorized=()=> {

  return (
      <div className="error">
      <Panel>
        <Panel.Heading>Unauthorized</Panel.Heading>
        <Panel.Body>
          <p>
          You are not authorized to view this page.
          </p>
      </Panel.Body>
      </Panel>
     
</div>
    )
  }

export default Unauthorized
