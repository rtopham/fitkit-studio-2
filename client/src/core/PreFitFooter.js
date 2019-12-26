
import React from 'react'
import {Image} from 'react-bootstrap'
import fksIcon from '../assets/fksicon.jpg'
import './Core.css'

const PreFitFooter=()=> {
    return (
      <div>
      <hr></hr>
      <div className="centerthis"><Image src={fksIcon} className="footerLogoImage" />&copy; {(new Date()).getFullYear()} 
      <a href ="https://fitkitsystems.com"> Fit Kit Systems</a>  · All Rights Reserved
        </div>
      <hr></hr>
      </div>
    )
}

export default PreFitFooter
