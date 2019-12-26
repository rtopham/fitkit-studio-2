
import React from 'react'
import {Carousel} from 'react-bootstrap'
import QuickFitSS1 from './../assets/ScreenShots/QuickFit/QuickFitSS1.png'
import QuickFitSS2 from './../assets/ScreenShots/QuickFit/QuickFitSS2.png'
import QuickFitSS3 from './../assets/ScreenShots/QuickFit/QuickFitSS3.png'
import QuickFitSS4 from './../assets/ScreenShots/QuickFit/QuickFitSS4.png'

const QuickFitCarousel=()=>{

    return (
      <React.Fragment>
      <Carousel interval={10000}>
        <Carousel.Item className="carousel-modifications">
        <img alt="936X982" src={QuickFitSS1}/>
        </Carousel.Item>
        <Carousel.Item className="carousel-modifications">
          <img width={936} height={982} alt="936X982" src={QuickFitSS2}/>
        </Carousel.Item>
        <Carousel.Item>
          <img width={936} height={982} alt="900X500" src={QuickFitSS3}/>
        </Carousel.Item>
        <Carousel.Item>
          <img width={936} height={982} alt="900X500" src={QuickFitSS4}/>
        </Carousel.Item>
      </Carousel>
      </React.Fragment>
        
    )
  }



export default QuickFitCarousel
