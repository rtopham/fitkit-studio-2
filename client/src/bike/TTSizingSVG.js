import React from 'react'
import {drawSVGLineArrow, drawSVGHorizontalLineArrow,drawSVGHorizontalLineArrowText, drawSVGVerticalLineArrowText, drawSVGVerticalLineDashed, drawAngledLineDashed, drawSVGAngledLineArrowText, drawSVGText} from './../lib/svg-functions'
import TTBikeImage from './../assets/Bikes/FitKit3TT.png'
import saddleImage from './../assets/Bikes/saddle.png'
import './Bike.css'

const TTSizingSVG=(props)=> {
  
    const dashColor="red"
    const headTubeCenter={x:486,y:73}
    const headTubeTopTubeIntersection={x:487,y:87}
    const effectiveSeatTubeIntersection={x:242,y:73}
    const bottomBracketCenter={x:302,y:303}
    //const seatTubeCenter={x:250,y:90}
    const topTubeCenter={x: 375, y:82}
    //const seatPostTopTubeIntersection={x:240,y:59}
    //const saddleNose={x:288,y:18}
    const saddlePlane={x1:130,y:12,x2:620}
    //const saddleButt={x:175,y:12}
    const saddleCenter={x:232,y:12}
    //const upperBoundry={x1:130,y:2,x2:600}
    const barCenter={x:512,y:61}
//    const hoodTrough={x:565,y:25}
    const spindleCenter={x:315,y:374}
    //const handlebarImageOrigin={x:610,y:70}
    const saddleImageOrigin={x:85, y:30}
    //const stemTubeClamp={x:handlebarImageOrigin.x+30,y:handlebarImageOrigin.y+32}
    //const stemBarClamp={x:handlebarImageOrigin.x+30,y:handlebarImageOrigin.y+13}
    //const padRear={x:495,y:48}
    //const padCenter={x:512,y:45}
    //const extensionsEnd={x:648,y:28}
    const groundPlane={x1:140,y:410,x2:560}
    const lineSpacing=13
return (

<div className="bikeBackground">
<div className="bikeSVG">
<svg width="700" height="413" >

<defs>
    <marker id={props.markerId} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>

    <marker id={"tt12345"} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="orange" />
    </marker>
{props.tab!==2&&
    <marker id={props.id} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>
}
  </defs>
<image width="700" height="413" className="bikeTabImage" href={TTBikeImage} onMouseDown={props.onMouseDown} />
{/* <image x={handlebarImageOrigin.x} y={handlebarImageOrigin.y} width={.1*689} height={.1*350} href={handlebarImage}/> */}
<image x={saddleImageOrigin.x} y={saddleImageOrigin.y} width={.17*186} height={.17*336} href={saddleImage} />

{/*drawSVGHorizontalLineArrowText(bottomBracketCenter.x,headTubeCenter.y,headTubeCenter.x,"black", props.markerId,"frame reach")*/}
{/* drawSVGHorizontalLineArrowText(seatTubeCenter.x,headTubeCenter.y-lineSpacing*2+10,headTubeCenter.x,"black", props.markerId,"effective top tube") */}
{drawSVGHorizontalLineArrowText(effectiveSeatTubeIntersection.x,headTubeTopTubeIntersection.y-14,headTubeTopTubeIntersection.x,"black", props.markerId,"effective top tube")}
{/*drawSVGHorizontalLineArrowText(saddleNose.x,headTubeCenter.y-2*lineSpacing,padRear.x,"black", props.markerId,"saddle nose to pad rear")}*/}
{/*{drawSVGHorizontalLineArrowText(saddleNose.x,headTubeCenter.y-3*lineSpacing,barCenter.x,"black", props.markerId,"saddle nose to bar center")}*/}
{/*drawSVGHorizontalLineArrowText(saddleNose.x,headTubeCenter.y-5*lineSpacing-4,extensionsEnd.x,"black", props.markerId,"saddle nose to end of extensions")}*/}
{/* {drawSVGHorizontalLineArrow(handlebarImageOrigin.x+9,handlebarImageOrigin.y+45,handlebarImageOrigin.x+60,"black", props.markerId)}
{drawSVGHorizontalLineArrow(handlebarImageOrigin.x+25,handlebarImageOrigin.y,handlebarImageOrigin.x+45,"black", props.markerId)} */}
{drawSVGHorizontalLineArrow(saddleImageOrigin.x+6,saddleImageOrigin.y+71,saddleImageOrigin.x+25,"black", props.markerId)}

{drawSVGLineArrow(headTubeCenter.x-15,headTubeCenter.y-4,barCenter.x-9, barCenter.y,"orange", "tt12345")}
{/* drawSVGHorizontalLineArrowText(seatTubeCenter.x,headTubeCenter.y-20,headTubeCenter.x,"orange", "tt12345","bike length (top tube + stem)") */}
{drawSVGHorizontalLineArrowText(effectiveSeatTubeIntersection.x,headTubeCenter.y-lineSpacing,headTubeCenter.x,"orange", "tt12345","bike length (top tube + stem)")}*/}
{/*drawSVGLineArrow(bottomBracketCenter.x,headTubeCenter.y+40,saddleNose.x+8, headTubeCenter.y+40,"black", props.markerId)*/}
{/*drawSVGVerticalLineArrow(saddlePlane.x2-85,saddlePlane.y,padCenter.y-8,"black",props.markerId)*/}
{/*drawSVGVerticalLineArrow(saddlePlane.x2-42,padCenter.y+13,padCenter.y+12,"black", props.markerId)*/}
{/*{drawSVGVerticalLineArrow(stemBarClamp.x-42,stemTubeClamp.y,stemBarClamp.y+8,"black",props.markerId)}*/}

{drawSVGVerticalLineArrowText(topTubeCenter.x,topTubeCenter.y,groundPlane.y,"black", props.markerId,50,0,true,"max standover","height")}

{/*drawSVGVerticalLineArrowText(bottomBracketCenter.x,headTubeCenter.y,bottomBracketCenter.y,"black", props.markerId,100,0,true,"frame","stack")*/}

{/*drawSVGVerticalLineDashed(saddleNose.x,upperBoundry.y,saddleNose.y+100,dashColor, props.markerId)*/}
{/* drawSVGVerticalLineDashed(seatTubeCenter.x,40,seatTubeCenter.y,dashColor, props.markerId) */}
{/* drawSVGVerticalLineDashed(headTubeCenter.x,saddlePlane.y+30,headTubeCenter.y,dashColor, props.markerId) */}
{drawSVGVerticalLineDashed(effectiveSeatTubeIntersection.x,40,effectiveSeatTubeIntersection.y,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(headTubeTopTubeIntersection.x,saddlePlane.y+35,headTubeTopTubeIntersection.y,dashColor, props.markerId)}
{/*{drawSVGVerticalLineDashed(padCenter.x,saddlePlane.y,padCenter.y,dashColor, props.markerId)}*/}
{/*drawSVGVerticalLineDashed(padRear.x,saddlePlane.y,padRear.y,dashColor, props.markerId)*/}

{/* {drawSVGVerticalLineDashed(handlebarImageOrigin.x+9,handlebarImageOrigin.y+15,handlebarImageOrigin.y+45,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(handlebarImageOrigin.x+60,handlebarImageOrigin.y+15,handlebarImageOrigin.y+45,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(handlebarImageOrigin.x+25,handlebarImageOrigin.y,handlebarImageOrigin.y+25,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(handlebarImageOrigin.x+45,handlebarImageOrigin.y,handlebarImageOrigin.y+25,dashColor, props.markerId)} */}


{drawSVGVerticalLineDashed(saddleImageOrigin.x+6,saddleImageOrigin.y+15,saddleImageOrigin.y+75,dashColor, props.markerId)}
{drawSVGVerticalLineDashed(saddleImageOrigin.x+25,saddleImageOrigin.y+15,saddleImageOrigin.y+75,dashColor, props.markerId)}
{/*drawSVGVerticalLineDashed(extensionsEnd.x,upperBoundry.y,extensionsEnd.y+10,dashColor, props.markerId)*/}

{/*drawSVGHorizontalLineDashed(saddlePlane.x1,saddlePlane.y,saddlePlane.x2,dashColor, props.markerId)*/}
{/*drawSVGHorizontalLineDashed(padCenter.x,padCenter.y,saddlePlane.x2-60,dashColor, props.markerId)*/}
{/*drawSVGHorizontalLineDashed(padCenter.x,padCenter.y+13,saddlePlane.x2-40,dashColor, props.markerId)*/}
{/*{drawSVGHorizontalLineDashed(stemTubeClamp.x,stemTubeClamp.y,stemTubeClamp.x-50,dashColor, props.markerId)}*/}
{/*{drawSVGHorizontalLineDashed(stemBarClamp.x,stemBarClamp.y,stemBarClamp.x-50,dashColor, props.markerId)}*/}

{drawAngledLineDashed(bottomBracketCenter.x-60,bottomBracketCenter.y+15,bottomBracketCenter.x,bottomBracketCenter.y,dashColor, props.markerId)}
{drawAngledLineDashed(spindleCenter.x-80,spindleCenter.y+20,spindleCenter.x,spindleCenter.y,dashColor, props.markerId)}
{/*drawAngledLineDashed(saddleButt.x,saddleButt.y,saddlePlane.x1,saddlePlane.y+10,dashColor, props.markerId)*/}
{drawAngledLineDashed(spindleCenter.x,spindleCenter.y,saddleCenter.x,saddleCenter.y,dashColor, props.markerId)}
{drawAngledLineDashed(saddleCenter.x-87,saddleCenter.y+20,saddleCenter.x,saddleCenter.y,dashColor, props.markerId)}
{/*drawAngledLineDashed(padCenter.x,padCenter.y+13,saddlePlane.x2-40,padCenter.y+5,dashColor, props.markerId)*/}
{/* drawAngledLineDashed(seatPostTopTubeIntersection.x-60,seatPostTopTubeIntersection.y+15,seatPostTopTubeIntersection.x,seatPostTopTubeIntersection.y,dashColor, props.markerId) */}
{drawAngledLineDashed(effectiveSeatTubeIntersection.x-60,effectiveSeatTubeIntersection.y+15,effectiveSeatTubeIntersection.x,effectiveSeatTubeIntersection.y,dashColor, props.markerId)}

{/*drawSVGAngledLineArrowText(bottomBracketCenter.x+60,bottomBracketCenter.y-15,spindleCenter.x+60,spindleCenter.y-15,"black", props.markerId,0,null,false,"crank length")*/}
{/*{drawSVGAngledLineArrowText(saddleButt.x,saddleButt.y,bottomBracketCenter.x-60,bottomBracketCenter.y+15,"black", props.markerId,50,0,true,"saddle","to bb")}
{drawSVGAngledLineArrowText(saddleButt.x-20,saddleButt.y,spindleCenter.x-80,spindleCenter.y+20,"black", props.markerId, 80,15,true,"saddle","to pedal")}*/}
{/*drawSVGAngledLineArrowText(saddleCenter.x-60,saddleCenter.y+15,bottomBracketCenter.x-60,bottomBracketCenter.y+15,"black", props.markerId,50,0,true,"saddle","to bb")*/}
{drawSVGAngledLineArrowText(effectiveSeatTubeIntersection.x-60,effectiveSeatTubeIntersection.y+15,bottomBracketCenter.x-60,bottomBracketCenter.y+15,"black", props.markerId,30,0,true,"frame","size")}
{drawSVGAngledLineArrowText(saddleCenter.x-87,saddleCenter.y+20,spindleCenter.x-80,spindleCenter.y+20,"black", props.markerId, 55,15,true,"saddle","to pedal")}

{/*drawSVGLineArrow(saddlePlane.x1,saddlePlane.y,saddlePlane.x1,saddlePlane.y+10-8,"black",props.markerId)*/}
{/*drawSVGText(saddlePlane.x1-45,saddlePlane.y+5,"black", props.markerId,"saddle","angle")*/}
{/*drawSVGText(saddleNose.x+20,headTubeCenter.y+40, "black", props.markerId,"saddle","setback")*/}
{/*drawSVGText(saddlePlane.x2-80,saddlePlane.y+15, "black", props.markerId, "saddle to","pad drop")*/}
{/* drawSVGText(handlebarImageOrigin.x+9,handlebarImageOrigin.y+60,"black", props.markerId,"basebar","width") */}
{/* drawSVGText(handlebarImageOrigin.x+50,handlebarImageOrigin.y,"black", props.markerId,"pad","width") */}
{drawSVGText(saddleImageOrigin.x,saddleImageOrigin.y+87,"black", props.markerId,"saddle","width")}
{/*drawSVGText(saddlePlane.x2-33,padCenter.y,"black", props.markerId,"ext.","angle")*/}
</svg>
</div>
</div>

    )

  }

export default TTSizingSVG
