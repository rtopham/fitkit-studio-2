
import React, {Component} from 'react'
import {Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import fksIcon from '../assets/fksicon.jpg'
import './Core.css'

class Footer extends Component {

  render() {
    return (
      <div>
      <hr></hr>
      <div className="centerthis"><Image src={fksIcon} className="footerLogoImage" />&copy; {(new Date()).getFullYear()} 
      <a href ="https://fitkitsystems.com"> Fit Kit Systems</a>  · All Rights Reserved · <Link to= "/privacy-policy"> Privacy Policy</Link> · <Link to="/terms-of-use">Terms of Use </Link>
      · <Link to="/contact">Contact Us</Link>

        </div>
      <hr></hr>
      </div>
    )
}
}

export default Footer
