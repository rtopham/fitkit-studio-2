import React from 'react'
import {drawSVGLineArrow, drawSVGHorizontalLineArrow,drawSVGHorizontalLineArrowText, drawSVGVerticalLineArrowText, drawSVGVerticalLineDashed, drawSVGHorizontalLineDashed, drawAngledLineDashed, drawSVGAngledLineArrowText, drawSVGText,
   drawSVGVerticalLineArrow} from './../lib/svg-functions'
import RoadBikeImage from './../assets/Bikes/FitKit3Rd.png'
import handlebarImage from './../assets/Bikes/handlebar.png'
import saddleImage from './../assets/Bikes/saddle.png'
import './Bike.css'

const RoadBikeSVG=(props)=> {

    const dashColor="red"
    const headTubeCenter={x:475,y:60}
    const headTubeTopTubeIntersection={x:475,y:72}
    const effectiveSeatTubeIntersection={x:245,y:72}
    const topTubeCenter={x: 370, y:86}
    const bottomBracketCenter={x:308,y:298}
//    const seatTubeCenter={x:250,y:90}
//    const seatPostTopTubeIntersection={x:240,y:59}
//    const saddleNose={x:288,y:18}
    const saddlePlane={x1:130,y:12,x2:620}
    const saddleCenter={x:225,y:12}
//    const saddleButt={x:175,y:12}
//    const upperBoundry={x1:130,y:2,x2:600}
    const barCenter={x:510,y:35}
//    const hoodTrough={x:570,y:25}
    const spindleCenter={x:330,y:372}
    const handlebarImageOrigin={x:610,y:70}
    const saddleImageOrigin={x:85, y:30}
    const stemTubeClamp={x:handlebarImageOrigin.x+42,y:handlebarImageOrigin.y+37}
    const stemBarClamp={x:handlebarImageOrigin.x+42,y:handlebarImageOrigin.y+17}
    const groundPlane={x1:140,y:412,x2:560}
    const lineSpacing=17



return (

<div className="bikeBackground">
<div className="bikeSVG">
<svg id={"svg-"+props.tab} width="700" height="413" >

<defs id={"def-"+props.tab}>
    <marker id={props.markerId} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>

    <marker id={"d12345"} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="orange" />
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
 

{/*{drawSVGHorizontalLineArrowText(bottomBracketCenter.x,headTubeCenter.y,headTubeCenter.x,"black",props.markerId,"frame reach")}*/}
{drawSVGHorizontalLineArrowText(effectiveSeatTubeIntersection.x,headTubeTopTubeIntersection.y,headTubeTopTubeIntersection.x,"black", props.markerId,"effective top tube")}
{drawSVGHorizontalLineArrowText(effectiveSeatTubeIntersection.x,headTubeCenter.y-lineSpacing+8,headTubeCenter.x,"orange", "d12345","bike length (top tube + stem)")}*/}
{/*{drawSVGHorizontalLineArrowText(saddleNose.x,headTubeCenter.y-2*lineSpacing,barCenter.x,"black", props.markerId,"saddle nose to bar center")}*/}
{/*{drawSVGHorizontalLineArrowText(saddleNose.x,headTubeCenter.y-3*lineSpacing-4,hoodTrough.x,"black", props.markerId,"saddle nose to hood trough")}*/}
{drawSVGHorizontalLineArrow(handlebarImageOrigin.x+7,handlebarImageOrigin.y+46,handlebarImageOrigin.x+75,"black", props.markerId)}
{drawSVGHorizontalLineArrow(saddleImageOrigin.x+6,saddleImageOrigin.y+71,saddleImageOrigin.x+25,"black", props.markerId)}

{/*{drawSVGLineArrow(bottomBracketCenter.x,headTubeCenter.y+5,saddleNose.x+8, headTubeCenter.y+5,"black", props.markerId)}*/}

{drawSVGLineArrow(headTubeCenter.x-8,headTubeCenter.y-18,barCenter.x-9, barCenter.y+2,"orange", "d12345")}

{/*{drawSVGVerticalLineArrow(saddlePlane.x2,saddlePlane.y,barCenter.y-8,"black",props.markerId)}*/}
{drawSVGVerticalLineArrow(stemBarClamp.x-52,stemTubeClamp.y,stemBarClamp.y+8,"black",props.markerId)}
{/*{drawSVGVerticalLineArrow(stemBarClamp.x-45,stemBarClamp.y,stemBarClamp.y-4,"black",props.markerId)}*/}



{drawSVGVerticalLineArrowText(topTubeCenter.x,topTubeCenter.y,groundPlane.y,"black", props.markerId,50,0,true,"max standover","height")}*/}

{/*{drawSVGVerticalLineDashed(saddleNose.x,upperBoundry.y,saddleNose.y+50,dashColor, props.markerId)}*/}
{/* drawSVGVerticalLineDashed(seatTubeCenter.x,40,seatTubeCenter.y,dashColor, props.markerId) */}
{drawSVGVerticalLineDashed(effectiveSeatTubeIntersection.x,40,effectiveSeatTubeIntersection.y,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(headTubeTopTubeIntersection.x,saddlePlane.y+15,headTubeTopTubeIntersection.y,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(barCenter.x,saddlePlane.y+15,headTubeCenter.y,dashColor, props.markerId)}
{/*{drawSVGVerticalLineDashed(hoodTrough.x,upperBoundry.y,hoodTrough.y,dashColor, props.markerId)}*/}
{drawSVGVerticalLineDashed(handlebarImageOrigin.x+7,handlebarImageOrigin.y+20,handlebarImageOrigin.y+50,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(handlebarImageOrigin.x+76,handlebarImageOrigin.y+20,handlebarImageOrigin.y+50,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(saddleImageOrigin.x+6,saddleImageOrigin.y+15,saddleImageOrigin.y+75,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(saddleImageOrigin.x+25,saddleImageOrigin.y+15,saddleImageOrigin.y+75,dashColor, props.markerId)}

{/*{drawSVGHorizontalLineDashed(saddlePlane.x1,saddlePlane.y,saddlePlane.x2,dashColor, props.markerId)}*/}
{/*{drawSVGHorizontalLineDashed(barCenter.x,barCenter.y,saddlePlane.x2,dashColor, props.markerId)}*/}
{drawSVGHorizontalLineDashed(stemTubeClamp.x,stemTubeClamp.y,stemTubeClamp.x-60,dashColor, props.markerId)}
{drawSVGHorizontalLineDashed(stemBarClamp.x,stemBarClamp.y,stemBarClamp.x-60,dashColor, props.markerId)}
{/*{drawSVGHorizontalLineDashed(stemBarClamp.x-20,stemBarClamp.y-11,stemBarClamp.x-60,dashColor, props.markerId)}*/}

{drawAngledLineDashed(bottomBracketCenter.x-60,bottomBracketCenter.y+15,bottomBracketCenter.x,bottomBracketCenter.y,dashColor, props.markerId)}
{drawAngledLineDashed(spindleCenter.x-80,spindleCenter.y+20,spindleCenter.x,spindleCenter.y,dashColor, props.markerId)}
{/*{drawAngledLineDashed(saddleButt.x,saddleButt.y,saddlePlane.x1,saddlePlane.y+10,dashColor, props.markerId)}*/}
{drawAngledLineDashed(spindleCenter.x,spindleCenter.y,saddleCenter.x,saddleCenter.y,dashColor, props.markerId)}
{drawAngledLineDashed(saddleCenter.x-80,saddleCenter.y+20,saddleCenter.x,saddleCenter.y,dashColor, props.markerId)}
{/* drawAngledLineDashed(seatPostTopTubeIntersection.x-60,seatPostTopTubeIntersection.y+15,seatPostTopTubeIntersection.x,seatPostTopTubeIntersection.y,dashColor, props.markerId) */}
{drawAngledLineDashed(effectiveSeatTubeIntersection.x-60,effectiveSeatTubeIntersection.y+15,effectiveSeatTubeIntersection.x,effectiveSeatTubeIntersection.y,dashColor, props.markerId)}

{/*{drawSVGAngledLineArrowText(bottomBracketCenter.x+60,bottomBracketCenter.y-15,spindleCenter.x+60,spindleCenter.y-15,"black", props.markerId,0,null,false,"crank length")}*/}
{drawSVGAngledLineArrowText(effectiveSeatTubeIntersection.x-60,effectiveSeatTubeIntersection.y+15,bottomBracketCenter.x-60,bottomBracketCenter.y+15,"black", props.markerId,30,0,true,"frame","size")}
{drawSVGAngledLineArrowText(saddleCenter.x-80,saddleCenter.y+20,spindleCenter.x-80,spindleCenter.y+20,"black", props.markerId, 55,15,true,"saddle","to pedal")}

{/*{drawSVGLineArrow(saddlePlane.x1,saddlePlane.y,saddlePlane.x1,saddlePlane.y+10-8,"black",props.markerId)}*/}

{/*{drawSVGText(saddlePlane.x1-45,saddlePlane.y+5,"black", props.markerId,"saddle","angle")}
{drawSVGText(saddleNose.x-30,headTubeCenter.y+20, "black", props.markerId,"saddle","setback")}
{drawSVGText(saddlePlane.x2+5,saddlePlane.y+5, "black", props.markerId, "saddle to","bar drop")}*/}
{drawSVGText(handlebarImageOrigin.x+7,handlebarImageOrigin.y+60,"black", props.markerId,"handlebar","width")}
{drawSVGText(stemBarClamp.x-90,stemBarClamp.y+15,"black", props.markerId,"stem","length")}
{/*{drawSVGText(stemBarClamp.x-50,stemBarClamp.y-27,"black", props.markerId,"handlebar","reach")}*/}
{drawSVGText(saddleImageOrigin.x,saddleImageOrigin.y+87,"black", props.markerId,"saddle","width")}

</svg>
</div>
</div>

    )

  }
export default RoadBikeSVG
