
import React from 'react'
import {Link} from 'react-router-dom'
import './Core.css'

const HomeLinks=()=>{

    return (
      <div className="homeLinksContainer">
      <div className="homeLinksCore">
      <div className="homeLinksText">
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
      </div>
      <div className="homeLinksColumn">
      <h3>COMPANY</h3>
      <li>
      <a href="https:fitkitsystems.com">Fit Kit Systems</a>
      </li>
      <li>
      <a href="https:fitkitsystems.com/blog">Blog</a>
      </li>
      <li>
      <Link to="/contact">Contact</Link>
      </li>
      </div>
      <div className="homeLinksColumn">
      <h3>RESOURCES</h3>
      <li>
      <a href="https:fitkitsystems.com/bike-sizing-and-fitting">Bike Sizing and Fitting</a>
      </li>
      <li>
      <a href="https:fitkitsystems.com/bike-sizing-and-fitting/the-fit-kit-system/">The Fit Kit System</a>
      </li>
      <li>
      <a href="https:fitkitsystems.com/education/training-workshops">Bike Fitting Education</a>
      </li>
      <li>
      <a href="https:fitkitsystems.com/education/training-resources">Learning Center</a>
      </li>
      </div>
      <div className="homeLinksColumn">
      <h3>SOCIAL NETWORKS</h3>
      <li>
      <a href="https:facebook.com/fitkitsystems">Facebook</a>
      </li>

      </div>
      </div>
      </div>
      </div>
     
     
        
    )
  }

export default HomeLinks
