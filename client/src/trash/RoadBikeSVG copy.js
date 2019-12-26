import React from 'react'
import {drawSVGLineArrow, drawSVGHorizontalLineArrow,drawSVGHorizontalLineArrowText, drawSVGVerticalLineArrowText, drawSVGVerticalLineDashed, drawSVGHorizontalLineDashed, drawAngledLineDashed, drawSVGAngledLineArrowText, drawSVGText,
   drawSVGVerticalLineArrow, drawSVGLineArrowExperimental} from './../lib/svg-functions'
import RoadBikeImage from './../assets/Bikes/FitKit3Rd.png'
import handlebarImage from './../assets/Bikes/handlebar.png'
import saddleImage from './../assets/Bikes/saddle.png'
import './Bike.css'

const RoadBikeSVG=(props)=> {

    const dashColor="red"
    const topTubeCenter={x:475,y:60}
    const bottomBracketCenter={x:308,y:298}
    const seatTubeCenter={x:250,y:90}
    const saddleNose={x:288,y:18}
    const saddlePlane={x1:130,y:12,x2:620}
    const saddleButt={x:175,y:12}
    const upperBoundry={x1:130,y:2,x2:600}
    const barCenter={x:510,y:35}
    const hoodTrough={x:570,y:25}
    const spindleCenter={x:330,y:372}
    const handlebarImageOrigin={x:610,y:70}
    const saddleImageOrigin={x:85, y:30}
    const stemTubeClamp={x:handlebarImageOrigin.x+42,y:handlebarImageOrigin.y+37}
    const stemBarClamp={x:handlebarImageOrigin.x+42,y:handlebarImageOrigin.y+17}
    const lineSpacing=17



return (

<div className="bikeBackground">
<div className="bikeSVG">
<svg id={"svg-"+props.tab} width="700" height="413" >

<defs id={"def-"+props.tab}>
    <marker id={props.markerId} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>

    <marker id={"arrowSVG"+props.id} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>
{props.tab!==2&&
    <marker id={props.id} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>
}
  </defs>
<image width="700" height="413" className="bikeTabImage" href={RoadBikeImage} onMouseDown={props.onMouseDown} />
<image x={handlebarImageOrigin.x} y={handlebarImageOrigin.y} width={.12*689} height={.12*350} href={handlebarImage}/>
<image x={saddleImageOrigin.x} y={saddleImageOrigin.y} width={.17*186} height={.17*336} href={saddleImage} />
 

{drawSVGHorizontalLineArrowText(bottomBracketCenter.x,topTubeCenter.y,topTubeCenter.x,"black",props.markerId,"frame reach")}
{drawSVGHorizontalLineArrowText(seatTubeCenter.x,topTubeCenter.y-lineSpacing,topTubeCenter.x,"black", props.markerId,"effective top tube")}
{/*{drawSVGHorizontalLineArrowText(saddleNose.x,topTubeCenter.y-2*lineSpacing,topTubeCenter.x,"black", props.markerId,"handlebar reach")}*/}
{drawSVGHorizontalLineArrowText(saddleNose.x,topTubeCenter.y-2*lineSpacing,barCenter.x,"black", props.markerId,"saddle nose to bar center")}
{drawSVGHorizontalLineArrowText(saddleNose.x,topTubeCenter.y-3*lineSpacing-4,hoodTrough.x,"black", props.markerId,"saddle nose to hood trough")}
{drawSVGHorizontalLineArrow(handlebarImageOrigin.x+7,handlebarImageOrigin.y+46,handlebarImageOrigin.x+75,"black", props.markerId)}
{drawSVGHorizontalLineArrow(saddleImageOrigin.x+6,saddleImageOrigin.y+71,saddleImageOrigin.x+25,"black", props.markerId)}

{drawSVGLineArrow(bottomBracketCenter.x,topTubeCenter.y+5,saddleNose.x+8, topTubeCenter.y+5,"black", props.markerId)}
{drawSVGVerticalLineArrow(saddlePlane.x2,saddlePlane.y,barCenter.y-8,"black",props.markerId)}
{drawSVGVerticalLineArrow(stemBarClamp.x-52,stemTubeClamp.y,stemBarClamp.y+8,"black",props.markerId)}
{drawSVGVerticalLineArrow(stemBarClamp.x-45,stemBarClamp.y,stemBarClamp.y-4,"black",props.markerId)}



{drawSVGVerticalLineArrowText(bottomBracketCenter.x,topTubeCenter.y,bottomBracketCenter.y,"black", props.markerId,100,0,true,"frame","stack")}

{drawSVGVerticalLineDashed(saddleNose.x,upperBoundry.y,saddleNose.y+50,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(seatTubeCenter.x,40,seatTubeCenter.y,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(topTubeCenter.x,saddlePlane.y,topTubeCenter.y,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(barCenter.x,saddlePlane.y,barCenter.y,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(hoodTrough.x,upperBoundry.y,hoodTrough.y,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(handlebarImageOrigin.x+7,handlebarImageOrigin.y+20,handlebarImageOrigin.y+50,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(handlebarImageOrigin.x+76,handlebarImageOrigin.y+20,handlebarImageOrigin.y+50,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(saddleImageOrigin.x+6,saddleImageOrigin.y+15,saddleImageOrigin.y+75,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(saddleImageOrigin.x+25,saddleImageOrigin.y+15,saddleImageOrigin.y+75,dashColor, props.markerId)}

{drawSVGHorizontalLineDashed(saddlePlane.x1,saddlePlane.y,saddlePlane.x2,dashColor, props.markerId)}
{drawSVGHorizontalLineDashed(barCenter.x,barCenter.y,saddlePlane.x2,dashColor, props.markerId)}
{drawSVGHorizontalLineDashed(stemTubeClamp.x,stemTubeClamp.y,stemTubeClamp.x-60,dashColor, props.markerId)}
{drawSVGHorizontalLineDashed(stemBarClamp.x,stemBarClamp.y,stemBarClamp.x-60,dashColor, props.markerId)}
{drawSVGHorizontalLineDashed(stemBarClamp.x-20,stemBarClamp.y-11,stemBarClamp.x-60,dashColor, props.markerId)}

{drawAngledLineDashed(bottomBracketCenter.x-60,bottomBracketCenter.y+15,bottomBracketCenter.x+60,bottomBracketCenter.y-15,dashColor, props.markerId)}
{drawAngledLineDashed(spindleCenter.x-80,spindleCenter.y+20,spindleCenter.x+80,spindleCenter.y-20,dashColor, props.markerId)}
{drawAngledLineDashed(saddleButt.x,saddleButt.y,saddlePlane.x1,saddlePlane.y+10,dashColor, props.markerId)}

{drawSVGAngledLineArrowText(bottomBracketCenter.x+60,bottomBracketCenter.y-15,spindleCenter.x+60,spindleCenter.y-15,"black", props.markerId,0,null,false,"crank length")}
{drawSVGAngledLineArrowText(saddleButt.x,saddleButt.y,bottomBracketCenter.x-60,bottomBracketCenter.y+15,"black", props.markerId,50,0,true,"saddle","to bb")}
{drawSVGAngledLineArrowText(saddleButt.x-20,saddleButt.y,spindleCenter.x-80,spindleCenter.y+20,"black", props.markerId, 80,15,true,"saddle","to pedal")}

{drawSVGLineArrow(saddlePlane.x1,saddlePlane.y,saddlePlane.x1,saddlePlane.y+10-8,"black",props.markerId)}
{drawSVGText(saddlePlane.x1-45,saddlePlane.y+5,"black", props.markerId,"saddle","angle")}
{drawSVGText(saddleNose.x-30,topTubeCenter.y+20, "black", props.markerId,"saddle","setback")}
{drawSVGText(saddlePlane.x2+5,saddlePlane.y+5, "black", props.markerId, "saddle to","bar drop")}
{drawSVGText(handlebarImageOrigin.x+7,handlebarImageOrigin.y+60,"black", props.markerId,"handlebar","width")}
{drawSVGText(stemBarClamp.x-90,stemBarClamp.y+15,"black", props.markerId,"stem","length")}
{drawSVGText(stemBarClamp.x-50,stemBarClamp.y-27,"black", props.markerId,"handlebar","reach")}
{drawSVGText(saddleImageOrigin.x,saddleImageOrigin.y+87,"black", props.markerId,"saddle","width")}

</svg>
</div>
</div>

    )

  }

export default RoadBikeSVG
