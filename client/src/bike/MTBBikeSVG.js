import React, {Component} from 'react'
import {drawSVGLineArrow, drawSVGHorizontalLineArrow,drawSVGHorizontalLineArrowText, drawSVGVerticalLineArrowText, drawSVGVerticalLineDashed, drawSVGHorizontalLineDashed, drawAngledLineDashed, drawSVGAngledLineArrowText, drawSVGText, drawSVGVerticalLineArrow} from './../lib/svg-functions'
import MTBBikeImage from './../assets/FitKit3MTB.png'
import handlebarImage from './../assets/mtbhandlebarstem.png'
import saddleImage from './../assets/saddle.png'
import './Bike.css'

class MTBBikeSVG extends Component {
  
  render() {
    const dashColor="red"
    const headTubeCenter={x:466,y:61}
    const bottomBracketCenter={x:301,y:292}
    const seatTubeCenter={x:250,y:110}
    const saddleNose={x:286,y:24}
    const saddlePlane={x1:130,y:18,x2:620}
    const saddleButt={x:187,y:19}
    const saddleCenter={x:225,y:20}
    const upperBoundry={x1:130,y:2,x2:600}
    const barCenter={x:479,y:29}
//    const hoodTrough={x:565,y:25}
    const gripEnd={x:468,y:24}
    const spindleCenter={x:319,y:355}
    const handlebarImageOrigin={x:500,y:45}
    const handlebarImageBarEnds={leftX:handlebarImageOrigin.x+7,leftY:handlebarImageOrigin.y+33,rightX:handlebarImageOrigin.x+134,rightY:handlebarImageOrigin.y+33}
    const saddleImageOrigin={x:85, y:35}
    const stemTubeClamp={x:handlebarImageOrigin.x+82,y:handlebarImageOrigin.y+59}
    const stemBarClamp={x:handlebarImageOrigin.x+82,y:handlebarImageOrigin.y+35}
    const lineSpacing=17
return (

<div className="bikeBackground">
<div className="bikeSVG">
<svg width="700" height="413" >

<defs>
    <marker id={this.props.markerId} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>
  </defs>
<image width="700" height="413" className="bikeTabImage" href={MTBBikeImage} onMouseDown={this.props.onMouseDown} />
<image x={handlebarImageOrigin.x} y={handlebarImageOrigin.y} width={.5*280} height={.5*185} href={handlebarImage}/>
<image x={saddleImageOrigin.x} y={saddleImageOrigin.y} width={.17*186} height={.17*336} href={saddleImage} />

{drawSVGHorizontalLineArrowText(bottomBracketCenter.x,headTubeCenter.y,headTubeCenter.x,"black", this.props.markerId,"frame reach")}
{drawSVGHorizontalLineArrowText(seatTubeCenter.x,headTubeCenter.y-lineSpacing,headTubeCenter.x,"black", this.props.markerId,"effective top tube")}
{/*{drawSVGHorizontalLineArrowText(saddleNose.x,headTubeCenter.y-2*lineSpacing,headTubeCenter.x,"black", this.props.markerId,"handlebar reach")}*/}
{drawSVGHorizontalLineArrowText(saddleNose.x,headTubeCenter.y-2*lineSpacing,gripEnd.x,"black", this.props.markerId,"saddle nose to grip end")}
{drawSVGHorizontalLineArrowText(saddleNose.x,headTubeCenter.y-3*lineSpacing,barCenter.x,"black", this.props.markerId,"saddle nose to bar center")}
{/*{drawSVGHorizontalLineArrowText(saddleNose.x,headTubeCenter.y-4*lineSpacing-3,hoodTrough.x,"black", this.props.markerId,"saddle nose to hood trough")*/}
{drawSVGHorizontalLineArrow(handlebarImageBarEnds.leftX,handlebarImageBarEnds.leftY-10,handlebarImageBarEnds.rightX,"black", this.props.markerId)}
{drawSVGHorizontalLineArrow(saddleImageOrigin.x+6,saddleImageOrigin.y+71,saddleImageOrigin.x+25,"black", this.props.markerId)}

{drawSVGLineArrow(bottomBracketCenter.x,headTubeCenter.y+5,saddleNose.x+8, headTubeCenter.y+5,"black", this.props.markerId)}
{drawSVGVerticalLineArrow(saddlePlane.x2-74,saddlePlane.y,barCenter.y-8,"black",this.props.markerId)}
{drawSVGVerticalLineArrow(stemBarClamp.x-42,stemTubeClamp.y,stemBarClamp.y+8,"black",this.props.markerId)}



{drawSVGVerticalLineArrowText(bottomBracketCenter.x,headTubeCenter.y,bottomBracketCenter.y,"black", this.props.markerId,100,0,true,"frame","stack")}

{drawSVGVerticalLineDashed(saddleNose.x,upperBoundry.y,saddleNose.y+50,dashColor, this.props.markerId)}
{drawSVGVerticalLineDashed(seatTubeCenter.x,40,seatTubeCenter.y,dashColor, this.props.markerId)}
{drawSVGVerticalLineDashed(headTubeCenter.x,saddlePlane.y+12,headTubeCenter.y,dashColor, this.props.markerId)}
{drawSVGVerticalLineDashed(barCenter.x,upperBoundry.y,barCenter.y,dashColor, this.props.markerId)}
{/*{drawSVGVerticalLineDashed(hoodTrough.x,upperBoundry.y,hoodTrough.y,dashColor, this.props.markerId)}*/}
{drawSVGVerticalLineDashed(gripEnd.x,saddlePlane.y,gripEnd.y,dashColor, this.props.markerId)}
{drawSVGVerticalLineDashed(handlebarImageBarEnds.leftX,handlebarImageBarEnds.leftY-10, handlebarImageBarEnds.leftY+10,dashColor, this.props.markerId)}
{drawSVGVerticalLineDashed(handlebarImageBarEnds.rightX,handlebarImageBarEnds.rightY-10,handlebarImageBarEnds.rightY+10,dashColor, this.props.markerId)}
{drawSVGVerticalLineDashed(saddleImageOrigin.x+6,saddleImageOrigin.y+15,saddleImageOrigin.y+75,dashColor, this.props.markerId)}
{drawSVGVerticalLineDashed(saddleImageOrigin.x+25,saddleImageOrigin.y+15,saddleImageOrigin.y+75,dashColor, this.props.markerId)}

{drawSVGHorizontalLineDashed(saddlePlane.x1,saddlePlane.y,saddlePlane.x2-71,dashColor, this.props.markerId)}
{drawSVGHorizontalLineDashed(barCenter.x,barCenter.y,saddlePlane.x2-71,dashColor, this.props.markerId)}
{drawSVGHorizontalLineDashed(stemTubeClamp.x,stemTubeClamp.y,stemTubeClamp.x-50,dashColor, this.props.markerId)}
{drawSVGHorizontalLineDashed(stemBarClamp.x,stemBarClamp.y,stemBarClamp.x-50,dashColor, this.props.markerId)} 

{drawAngledLineDashed(bottomBracketCenter.x-60,bottomBracketCenter.y+15,bottomBracketCenter.x+60,bottomBracketCenter.y-15,dashColor, this.props.markerId)}
{drawAngledLineDashed(spindleCenter.x-80,spindleCenter.y+20,spindleCenter.x+80,spindleCenter.y-20,dashColor, this.props.markerId)}
{drawAngledLineDashed(saddleButt.x,saddleButt.y,saddlePlane.x1,saddlePlane.y+10,dashColor, this.props.markerId)}
{drawAngledLineDashed(spindleCenter.x,spindleCenter.y,saddleCenter.x,saddleCenter.y,dashColor, this.props.markerId)}
{drawAngledLineDashed(saddleCenter.x-80,saddleCenter.y+20,saddleCenter.x,saddleCenter.y,dashColor, this.props.markerId)}

{drawSVGAngledLineArrowText(bottomBracketCenter.x+60,bottomBracketCenter.y-15,spindleCenter.x+60,spindleCenter.y-15,"black", this.props.markerId,0,null,false,"crank length")}
{/*{drawSVGAngledLineArrowText(saddleButt.x,saddleButt.y,bottomBracketCenter.x-60,bottomBracketCenter.y+15,"black", this.props.markerId,50,0,true,"saddle","to bb")}
{drawSVGAngledLineArrowText(saddleButt.x-20,saddleButt.y,spindleCenter.x-80,spindleCenter.y+20,"black", this.props.markerId, 80,15,true,"saddle","to pedal")}*/}
{drawSVGAngledLineArrowText(saddleCenter.x-60,saddleCenter.y+15,bottomBracketCenter.x-60,bottomBracketCenter.y+15,"black", this.props.markerId,50,0,true,"saddle","to bb")}
{drawSVGAngledLineArrowText(saddleCenter.x-80,saddleCenter.y+20,spindleCenter.x-80,spindleCenter.y+20,"black", this.props.markerId, 75,15,true,"saddle","to pedal")}


{drawSVGLineArrow(saddlePlane.x1,saddlePlane.y,saddlePlane.x1,saddlePlane.y+10-8,"black",this.props.markerId)}
{drawSVGText(saddlePlane.x1-45,saddlePlane.y+5,"black", this.props.markerId,"saddle","angle")}
{drawSVGText(saddleNose.x-30,headTubeCenter.y+20, "black", this.props.markerId,"saddle","setback")}
{drawSVGText(saddlePlane.x2+5-71,saddlePlane.y+5, "black", this.props.markerId, "saddle to grip","center drop/rise")}
{drawSVGText(handlebarImageBarEnds.leftX+20,handlebarImageBarEnds.leftY-15,"black", this.props.markerId,"handlebar width")}
{drawSVGText(stemBarClamp.x-75,stemBarClamp.y+27,"black", this.props.markerId,"stem","length")}
{drawSVGText(saddleImageOrigin.x,saddleImageOrigin.y+87,"black", this.props.markerId,"saddle","width")}

</svg>
</div>
</div>


    )

  }
}

export default MTBBikeSVG
