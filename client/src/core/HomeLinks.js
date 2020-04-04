
import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Core.css'

const HomeLinks=()=>{

    return (

      <div className="homeLinksContainer">
      <Grid>
      <Row>
      <div className="homeLinksCore">
      <div className="homeLinksText">
      <Col xs={6} sm={3}>
      <div className="homeLinksColumn">
      <h3>PRODUCT</h3>
      <li>
      <Link to="/product/quick-size">Quick Size</Link>
      </li>
      <li>
      <Link to="/product/quick-fit">Quick Fit</Link>
      </li>
      <li>
      <Link to="/product/pricing">Pricing</Link>
      </li>
      <li>
      <a href="https://www.youtube.com/watch?v=Imavt8sbaLU&list=PL2Kmx4t0uhN4YMjeUQTxMbW4AaozaqwH0">Video Demos</a>
      </li>      
      </div>
      </Col>
      <Col xs={6} sm={3}>
      <div className="homeLinksColumn">
      <h3>COMPANY</h3>
      <li>
      <a href="https://fitkitsystems.com">Fit Kit Systems</a>
      </li>
      <li>
      <a href="https://fitkitsystems.com/blog">Blog</a>
      </li>
      <li>
      <Link to="/contact">Contact</Link>
      </li>
      </div>
      </Col>
      <Col xs={6} sm={3}>
      <div className="homeLinksColumn">
      <h3>RESOURCES</h3>
      <li>
      <a href="https://fitkitsystems.com/bike-sizing-and-fitting">Bike Sizing and Fitting</a>
      </li>
      <li>
      <a href="https://fitkitsystems.com/bike-sizing-and-fitting/the-fit-kit-system/">The Fit Kit System</a>
      </li>
      <li>
      <a href="https://fitkitsystems.com/education/training-workshops">Education</a>
      </li>
      <li>
      <a href="https://fitkitsystems.com/education/training-resources">Learning Center</a>
      </li>
      </div>
      </Col>
      <Col xs={6} sm={3}>
      <div className="homeLinksColumn">
      <h3>SOCIAL NETWORKS</h3>
      <li>
      <a href="https://facebook.com/fitkitsystems">Facebook</a>
      </li>
      </div>
      </Col>

      </div>
      </div>
      </Row>
     </Grid>
      </div>
      

     
        
    )
  }

export default HomeLinks
