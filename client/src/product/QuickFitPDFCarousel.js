
import React from 'react'
import {Carousel} from 'react-bootstrap'
import QuickFitPDF1 from './../assets/ScreenShots/QuickFit/QuickFitPDF1.jpg'
import QuickFitPDF2 from './../assets/ScreenShots/QuickFit/QuickFitPDF2.jpg'

const QuickFitPDFCarousel=()=>{

  return (
      <React.Fragment>
      <Carousel interval={10000}>
        <Carousel.Item className="carousel-modifications">
        <img alt="936X982" src={QuickFitPDF1}/>
        </Carousel.Item>
        <Carousel.Item className="carousel-modifications">
          <img alt="936X982" src={QuickFitPDF2}/>
        </Carousel.Item>
       </Carousel>
      </React.Fragment>
    )
  }

export default QuickFitPDFCarousel
