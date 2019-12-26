
import React from 'react'
import {Carousel} from 'react-bootstrap'
import QuickSizeSS1 from './../assets/ScreenShots/QuickSize/QuickSizeSS1.png'
import QuickSizeSS2 from './../assets/ScreenShots/QuickSize/QuickSizeSS2.png'

const QuickSizeCarousel=()=>{
  return (
      <React.Fragment>
      <Carousel interval={10000}>
        <Carousel.Item className="carousel-modifications">
          <img width={936} height={982} alt="936X982" src={QuickSizeSS1}/>
        </Carousel.Item>
        <Carousel.Item>
          <img width={936} height={982} alt="900X500" src={QuickSizeSS2}/>
        </Carousel.Item>
      </Carousel>
      </React.Fragment>
        
    )
  }

export default QuickSizeCarousel
