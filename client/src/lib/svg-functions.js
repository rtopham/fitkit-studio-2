import React from 'react'

export const drawSVGLineArrow=(x1,y1,x2,y2,color, markerId)=>{

    return(
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} markerEnd={"url(#"+markerId+")"} />
              )

   }

export const drawSVGLineArrowExperimental=(x1,y1,x2,y2,color, markerId)=>{

    return(
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} markerEnd="url(#arrowSVG)"/>
              )

   }

export const drawSVGText=(x,y,color,markerId, text,text2)=>{
    return(
    <text x={x} y={y} className="small"><tspan>{text}</tspan><tspan x={x} y={y+9}>{text2}</tspan></text>
    )
}

export const drawSVGHorizontalLineArrow=(x1,y,x2,color,markerId)=>{

    return(
        <g>
        <line x1={x1} y1={y} x2={x2-8} y2={y} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <line x1={x2-8} y1={y} x2={x1+8} y2={y} stroke={color} markerEnd={"url(#"+markerId+")"} />
        </g>

              )

   }

export const drawSVGVerticalLineArrow=(x,y1,y2,color,markerId)=>{
   
    return(
        <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} markerEnd={"url(#"+markerId+")"} />
              )

   }

export const drawSVGHorizontalLineArrowText=(x1,y,x2,color,markerId,text)=>{
    
    const lineLength=x2-x1
    const textLength=text.length*5.8
    const midpoint=x1+(lineLength/2)
    const rightLineX=midpoint+(textLength/2)
    const leftLineX=midpoint-(textLength/2)

     return(
        <g>
        <line x1={rightLineX} y1={y} x2={x2-8} y2={y} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <line x1={leftLineX} y1={y} x2={x1+8} y2={y} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <text x={leftLineX+2} y={y+4} className="small">{text}</text>
        </g>
              )

   }


   export const drawSVGVerticalLineArrowText=(x,y1,y2,color,markerId,textPos,addOffset,multiLine,text,text2)=>{
    
//    let textLines=1
//    if(multiLine) textLines=2
    //const slope=(y2-y1)/(x2-x1)
    const lineLength=y2-y1
//    const textHeight=11
    const midpointX=x
    const midpointY= (y1+y2)/2
    if(!textPos) textPos=lineLength/2
    const offSet=(text.length*5)/2

//    const newPointDistance=20
//    const topArrowDistance=8
//    const bottomArrowDistance=lineLength-8
//    const topSegmentDistance=textPos-8
//    const topSegmentRatio=topSegmentDistance/lineLength
//    const bottomSegmentDistance=textPos+8*textLines
//    const bottomSegmentRatio=bottomSegmentDistance/lineLength


//    const newPointRatio=newPointDistance/lineLength
//    const topArrowRatio=topArrowDistance/lineLength
//    const bottomArrowRatio=bottomArrowDistance/lineLength
//    const textPointRatio=textPos/lineLength
    let textPointX=midpointX
    let textPointY=midpointY
    if(textPos){
        textPointX=x
        textPointY=y1+textPos
    }

    let line={x1:0,y1:0,x2:0,y2:0,x3:0,y3:0,x4:0,y4:0}

    line.x1= x
    line.y1= y1+8
    line.x2= x
    line.y2= textPointY-6
    line.x3= x
    line.y3= textPointY+16
    line.x4= x
    line.y4= y2-8
    
    
if(!multiLine)
     return(
        <g>
        <line x1={line.x1} y1={line.y2} x2={line.x1} y2={line.y1} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <line x1={line.x3} y1={line.y3} x2={line.x4} y2={line.y4} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <text x={textPointX-offSet+5} y={textPointY+5} className="small">{text}</text>
        </g>
              )
    else return(
        <g>
        <line x1={line.x2} y1={line.y2} x2={line.x1} y2={line.y1} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <line x1={line.x3} y1={line.y3} x2={line.x4} y2={line.y4} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <text x={textPointX-offSet-addOffset+5} y={textPointY+5} className="small"><tspan>{text}</tspan><tspan x={textPointX-offSet-addOffset+5} y={textPointY+14}>{text2}</tspan></text>
        </g>
    )

   }


   export const drawSVGAngledLineArrowText=(x1,y1,x2,y2,color,markerId,textPos,addOffset,multiLine,text,text2)=>{
    
    let textLines=1
    if(multiLine) textLines=2
//    const slope=(y2-y1)/(x2-x1)
    const lineLength=Math.sqrt(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)))
//    const textHeight=11
    const midpointX= (x1+x2)/2
    const midpointY= (y1+y2)/2
    if(!textPos) textPos=lineLength/2
    const offSet=(text.length*5)/2

//    const newPointDistance=20
    const topArrowDistance=8
    const bottomArrowDistance=lineLength-8
    const topSegmentDistance=textPos-8
    const topSegmentRatio=topSegmentDistance/lineLength
    const bottomSegmentDistance=textPos+8*textLines
    const bottomSegmentRatio=bottomSegmentDistance/lineLength


//    const newPointRatio=newPointDistance/lineLength
    const topArrowRatio=topArrowDistance/lineLength
    const bottomArrowRatio=bottomArrowDistance/lineLength
    const textPointRatio=textPos/lineLength
    let textPointX=midpointX
    let textPointY=midpointY
    if(textPos){
        textPointX=(1-textPointRatio)*x1+(textPointRatio*x2)
        textPointY=(1-textPointRatio)*y1+(textPointRatio*y2)
    }


//    const bottomLineX= (1-newPointRatio)*textPointX+(newPointRatio*x2)
//    const bottomLineY= (1-newPointRatio)*textPointY+(newPointRatio*y2)

//    const topLineX= (1+newPointRatio)*textPointX-(newPointRatio*x2)
//    const topLineY= (1+newPointRatio)*textPointY-(newPointRatio*y2)

    let line={x1:0,y1:0,x2:0,y2:0,x3:0,y3:0,x4:0,y4:0}

    line.x1= (1-topArrowRatio)*x1+(topArrowRatio*x2)
    line.y1= (1-topArrowRatio)*y1+(topArrowRatio*y2)
    line.x2= (1-topSegmentRatio)*x1+(topSegmentRatio*x2)
    line.y2= (1-topSegmentRatio)*y1+(topSegmentRatio*y2)
    line.x3= (1-bottomSegmentRatio)*x1+(bottomSegmentRatio*x2)
    line.y3= (1-bottomSegmentRatio)*y1+(bottomSegmentRatio*y2)
    line.x4= (1-bottomArrowRatio)*x1+(bottomArrowRatio*x2)
    line.y4= (1-bottomArrowRatio)*y1+(bottomArrowRatio*y2)
    
    
if(!multiLine)
     return(
        <g>
        <line x1={line.x2} y1={line.y2} x2={line.x1} y2={line.y1} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <line x1={line.x3} y1={line.y3} x2={line.x4} y2={line.y4} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <text x={textPointX-offSet+5} y={textPointY+5} className="small">{text}</text>
        </g>
              )
    else return(
        <g>
        <line x1={line.x2} y1={line.y2} x2={line.x1} y2={line.y1} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <line x1={line.x3} y1={line.y3} x2={line.x4} y2={line.y4} stroke={color} markerEnd={"url(#"+markerId+")"} />
        <text x={textPointX-offSet-addOffset+5} y={textPointY+5} className="small"><tspan>{text}</tspan><tspan x={textPointX-offSet-addOffset+5} y={textPointY+14}>{text2}</tspan></text>
        </g>
    )

   }   

 export const drawSVGVerticalLineDashed=(x,y1,y2,color,markerId)=>{
   
     return(
        <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeDasharray="5,5" d="M5 20 l215 0"/>
              )

   }   

export const drawSVGHorizontalLineDashed=(x1,y,x2,color, markerId)=>{
    
     return(
        <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeDasharray="5,5" d="M5 20 l215 0"/>
              )

   }   

export const drawAngledLineDashed=(x1,y1,x2,y2,color, markerId)=>{
    
     return(
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeDasharray="5,5" d="M5 20 l215 0"/>
              )

   }   