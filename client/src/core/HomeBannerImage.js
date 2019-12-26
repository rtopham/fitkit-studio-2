
import React from 'react'
import homeBanner from './../assets/homeBanner.jpg'
import './Core.css';

const HomeBannerImage=()=>{
const anchor = {x:1450, y:200}
const lineSpacing = 40
    return (
      <div className="homeBannerContainer">
        <svg viewBox="0 0 2172 525">
        <image className="homeBannerImage" href={homeBanner}/>
        <text textAnchor="start" x={anchor.x} y={anchor.y} fill="white" className="homeBannerImageText">
          <tspan>"Finally! A simple, dedicated</tspan>
          <tspan x={anchor.x+85} dy={lineSpacing} >software solution for</tspan>
          <tspan x={anchor.x+75} dy={lineSpacing} >independent bike fitting</tspan>
          <tspan x={anchor.x-5} dy={lineSpacing} >professionals and bike shops"</tspan>
          </text>
        </svg>
      </div>
        
    )
  }

export default HomeBannerImage
