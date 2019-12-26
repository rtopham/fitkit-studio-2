import React, { Component } from 'react'
import './QuickFit.css'
import bikeImage from './../assets/Bikes/FitKit3Rd.png'
import MTBbikeImage from './../assets/Bikes/FitKit3MTB.png'  
import TTbikeImage from './../assets/Bikes/FitKit3TT.png'
import aerobarImage from './../assets/Bikes/aerobar.png'
import roadbarImage from './../assets/Bikes/handlebar.png'
import mtbbarImage from './../assets/Bikes/mtbhandlebar.png'
import saddleImage from './../assets/Bikes/saddle.png'

class BikeImageCanvas extends Component{
  constructor(props){
super(props)
  
  this.state ={
    canvas:'',
    ctx:{},
    img:{},
    imageWidth: 0,
    imageHeight: 0,
    hbimg:{},
    saddleimg:{},
    loaded:false,
    loading:true
}
this.myMouseMoved = this.myMouseMoved.bind(this)
  }


myMouseMoved=(e)=>{
this.props.onMouseMove(this.state.canvas,e)
}

getStemLineObject=()=>{

  let stemLineObject={
    x1:0,
    x2:0,
    y1:0,
    y2:0   
  }
  switch(this.props.bikeType){
    case 'Road Bike': stemLineObject.x1=465
                      stemLineObject.y1=42
                      stemLineObject.x2=510
                      stemLineObject.y2=38;break
    case 'Mountain Bike': stemLineObject.x1=457
                          stemLineObject.y1=39
                          stemLineObject.x2=475
                          stemLineObject.y2=32;break
    case 'TT/Tri Bike': stemLineObject.x1=473
                      stemLineObject.y1=79
                      stemLineObject.x2=515
                      stemLineObject.y2=72;break
    default:
        stemLineObject.x1=465
        stemLineObject.y1=42
        stemLineObject.x2=510
        stemLineObject.y2=38;break  
  }
  return stemLineObject
}

getLineObject=(activeMetric)=>{

let bbX,bbY,psX,psY,shx1,shy1,shx2,shy2,sadX1,sadY1,fsX,fsY,ttsX,ttsY,hbX1,hbX2,htX,htY,spX,spY,scX,scY,hbX,hbY,snoseX,snoseY,hoodX,hoodY

  switch(this.props.bikeType){
    case 'Road Bike': bbX=310
                      bbY=300
                      psX=330
                      psY=370
                      shx1=370
                      shy1=90
                      shx2=370
                      shy2=407
                      sadX1=225
                      sadY1=12
                      fsX=242
                      fsY=67
                      ttsX=246
                      ttsY=70
                      hbX1=604
                      hbX2=677
                      htX=474
                      htY=60
                      spX=228
                      spY=30
                      scX=219
                      scY=30
                      hbX=508
                      hbY=28
                      snoseX=286
                      snoseY=16
                      hoodX=570
                      hoodY=26;break
    case 'Mountain Bike': bbX=302
                          bbY=295
                          psX=320
                          psY=355
                          shx1=355
                          shy1=106
                          shx2=355
                          shy2=407
                          sadX1=221
                          sadY1=12
                          fsX=240
                          fsY=67
                          ttsX=244
                          ttsY=70
                          hbX1=604
                          hbX2=677
                          htX=471
                          htY=63
                          spX=228
                          spY=30
                          scX=219
                          scY=30
                          hbX=476
                          hbY=34
                          snoseX=278
                          snoseY=15;break
    case 'TT/Tri Bike': bbX=302
                        bbY=305
                        psX=318
                        psY=374
                        shx1=378
                        shy1=96
                        shx2=378
                        shy2=407
                        sadX1=235
                        sadY1=12
                        fsX=246
                        fsY=67
                        ttsX=254
                        ttsY=70
                        hbX1=624
                        hbX2=657
                        htX=488
                        htY=84
                        spX=256
                        spY=28
                        scX=236
                        scY=28
                        hbX=515
                        hbY=67
                        snoseX=303
                        snoseY=15
                        hoodX=580
                        hoodY=80;break
    default:
        bbX=310
        bbY=300
        psX=330
        psY=370
        shx1=370
        shy1=90
        shx2=370
        shy2=407
        sadX1=225
        sadY1=12
        fsX=242
        fsY=67
        ttsX=246
        ttsY=70
        hbX1=604
        hbX2=677;break
  }

  let lineObject={
    x1:0,
    x2:0,
    y1:0,
    y2:0,
    dotX1:0,
    dotX2:0,
    dotY1:0,
    dotY2:0,
    handlebar:false,
    saddle:false   
  }
  switch(activeMetric){
    case 'frameSize': lineObject.x1=fsX
                      lineObject.y1=fsY
                      lineObject.x2=bbX
                      lineObject.y2=bbY;break; 
    case 'frameReach':  lineObject.x1=bbX
                        lineObject.y1=htY
                        lineObject.x2=htX
                        lineObject.y2=htY
                        lineObject.dotX1=bbX
                        lineObject.dotX2=bbX
                        lineObject.dotY1=htY
                        lineObject.dotY2=bbY;break;
    case 'frameStack':  lineObject.x1=bbX
                        lineObject.y1=htY
                        lineObject.x2=bbX
                        lineObject.y2=bbY
                        lineObject.dotX1=bbX
                        lineObject.dotX2=htX
                        lineObject.dotY1=htY
                        lineObject.dotY2=htY;break;
case 'handlebarReachHX':lineObject.x1=bbX
                        lineObject.y1=hbY
                        lineObject.x2=hbX
                        lineObject.y2=hbY
                        lineObject.dotX1=bbX
                        lineObject.dotX2=bbX
                        lineObject.dotY1=hbY
                        lineObject.dotY2=bbY;break;
case 'handlebarStackHY':lineObject.x1=bbX
                        lineObject.y1=hbY
                        lineObject.x2=bbX
                        lineObject.y2=bbY
                        lineObject.dotX1=bbX
                        lineObject.dotX2=hbX
                        lineObject.dotY1=hbY
                        lineObject.dotY2=hbY;break;                   
case 'handlebarReach': lineObject.x1=sadX1
                        lineObject.y1=sadY1
                        lineObject.x2=hbX
                        lineObject.y2=sadY1
                        lineObject.dotX1=hbX
                        lineObject.dotX2=hbX
                        lineObject.dotY1=sadY1
                        lineObject.dotY2=hbY;break;
case 'saddleNoseToBar':  lineObject.x1=snoseX
                        lineObject.y1=snoseY
                        lineObject.x2=hbX
                        lineObject.y2=snoseY
                        lineObject.dotX1=hbX
                        lineObject.dotX2=hbX
                        lineObject.dotY1=snoseY
                        lineObject.dotY2=hbY;break; 
case 'saddleNoseToHood':lineObject.x1=snoseX
                        lineObject.y1=snoseY
                        lineObject.x2=hoodX
                        lineObject.y2=snoseY
                        lineObject.dotX1=hoodX
                        lineObject.dotX2=hoodX
                        lineObject.dotY1=snoseY
                        lineObject.dotY2=hoodY;break;                        
case 'saddleToBarDrop': lineObject.x1=snoseX
                        lineObject.y1=snoseY
                        lineObject.x2=snoseX
                        lineObject.y2=hbY
                        lineObject.dotX1=hbX
                        lineObject.dotX2=snoseX
                        lineObject.dotY1=hbY
                        lineObject.dotY2=hbY;break;                        
                        
case 'effectiveTopTube':lineObject.x1=fsX
                        lineObject.y1=htY
                        lineObject.x2=htX
                        lineObject.y2=htY;break;      
  case 'seatPostOffset':lineObject.x1=spX
                        lineObject.y1=spY
                        lineObject.x2=scX-2
                        lineObject.y2=scY;break; 
  case 'crankLength':   lineObject.x1=bbX
                        lineObject.y1=bbY
                        lineObject.x2=psX
                        lineObject.y2=psY;break;                  
  case 'saddleHeight': lineObject.x1=sadX1
                         lineObject.y1=sadY1
                         lineObject.x2=psX
                         lineObject.y2=psY;break; 
  case 'saddleHeightBB': lineObject.x1=sadX1
                         lineObject.y1=sadY1
                         lineObject.x2=bbX
                         lineObject.y2=bbY;break;  
  case 'saddleSetBack':  lineObject.x1=snoseX
                         lineObject.y1=snoseY
                         lineObject.x2=bbX
                         lineObject.y2=snoseY
                         lineObject.dotX1=bbX
                         lineObject.dotX2=bbX
                         lineObject.dotY1=snoseY
                         lineObject.dotY2=bbY;break;                      
    case 'handlebarWidth':lineObject.x1=hbX1
                          lineObject.y1=15
                          lineObject.x2=hbX2
                          lineObject.y2=15
                          lineObject.handlebar=true;break;
    case 'saddleWidth':lineObject.x1=87
                       lineObject.y1=60
                       lineObject.x2=110
                       lineObject.y2=60
                       lineObject.saddle=true;break;  
    case 'standoverHeight': lineObject.x1=shx1
                            lineObject.y1=shy1
                            lineObject.x2=shx2
                            lineObject.y2=shy2;break
    case 'bikeLength':  lineObject.x1=ttsX
                        lineObject.y1=ttsY
                        lineObject.x2=477
                        lineObject.y2=70;break
    case 'adjustedBikeLength':  lineObject.x1=ttsX
                                lineObject.y1=ttsY
                                lineObject.x2=477
                                lineObject.y2=70;break
    default: //console.log('no active metric')
    }
    return lineObject
}

animate=(ctx)=>{
//  console.log('Inside Animate')
  let lineColor='Gold'
  const circleColor='red'
  let amount=0
  let running=false
  let lastMetricDrawn='none'
  let lineObject={}
  let startX,startY,endX,endY=0
  let refresh=false
  let stemLineObject=this.getStemLineObject()
  const stemStartX=stemLineObject.x1
  const stemStartY=stemLineObject.y1
  const stemEndX=stemLineObject.x2
  const stemEndY=stemLineObject.y2
  
  let drawMe=()=>{

    if(this.state.loaded&&this.props.godMode){
    let activeMetric=''
    let circleWidth=5
    
    for(var i=0;i<6;i++){

      if (i===0){activeMetric='standoverHeight';lineColor='gold';}
      if (i===1){activeMetric='saddleHeight';lineColor='honeydew';}
      if (i===2){activeMetric='bikeLength';lineColor='springgreen';}
      if (i===3){activeMetric='frameSize';lineColor='cyan';}
      if (i===4){activeMetric='handlebarWidth';lineColor='gold';}
      if (i===5){activeMetric='saddleWidth';lineColor='gold';}
      //if (i===3)lineColor='magenta';else lineColor='Gold'
      lineObject=this.getLineObject(activeMetric)
      startX=lineObject.x1
      startY=lineObject.y1
      endX=lineObject.x2
      endY=lineObject.y2
      if(i===3){startX=startX-4;endX=endX-4;}
      if(i===1){startX=startX+4;endX=endX+4;}

//      this.state.ctx.drawImage(this.state.img, 0, 0,this.state.imageWidth,this.state.imageHeight) 
      if(lineObject.handlebar) this.state.ctx.drawImage(this.state.hbimg, 600, 10,81,39)
      if(lineObject.saddle) this.state.ctx.drawImage(this.state.saddleimg, 80, 0,37,74)
      ctx.lineWidth=4
      ctx.strokeStyle=circleColor
      ctx.fillStyle=circleColor
      amount += 0.05; // change to alter duration
      if (amount > 1) amount = 1
   
      ctx.beginPath()
      ctx.strokeStyle = lineColor
      ctx.moveTo(startX, startY)
      // lerp : a  + (b - a) * f
      ctx.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.arc(startX,startY,circleWidth,0,2*Math.PI);
      ctx.fill()
      ctx.beginPath()
      ctx.arc(endX,endY,circleWidth,0,2*Math.PI);
      ctx.fill()
      
      if(activeMetric==='bikeLength'|activeMetric==='adjustedBikeLength'){
        ctx.beginPath()
        ctx.strokeStyle = lineColor
        ctx.moveTo(stemStartX, stemStartY)
        // lerp : a  + (b - a) * f
        ctx.lineTo(stemStartX + (stemEndX - stemStartX) * amount, stemStartY + (stemEndY - stemStartY) * amount)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.arc(stemStartX,stemStartY,circleWidth,0,2*Math.PI);
        ctx.fill()
        ctx.beginPath()
        ctx.arc(stemEndX,stemEndY,circleWidth,0,2*Math.PI);
        ctx.fill()
      }

    }

    }//end god mode

    if(!running&&this.props.activeMetric!=='none'&&this.props.activeMetric!==lastMetricDrawn) {
      running=true
      refresh=true
      lastMetricDrawn=this.props.activeMetric
      lineObject=this.getLineObject(this.props.activeMetric)
      startX=lineObject.x1
      startY=lineObject.y1
      endX=lineObject.x2
      endY=lineObject.y2
      
    }

    if(this.props.activeMetric==='stemLength'){
      startX=stemStartX
      startY=stemStartY
      endX=stemEndX
      endY=stemEndY
    }

    if(running&&this.state.ctx&&this.state.loaded&&amount<1){

      this.state.ctx.drawImage(this.state.img, 0, 0,this.state.imageWidth,this.state.imageHeight) 
      if(lineObject.handlebar) this.state.ctx.drawImage(this.state.hbimg, 600, 10,81,39)
      if(lineObject.saddle) this.state.ctx.drawImage(this.state.saddleimg, 80, 0,37,74)
      ctx.lineWidth=5
      ctx.strokeStyle=circleColor
      ctx.fillStyle=circleColor
      amount += 0.05; // change to alter duration
      if (amount > 1) amount = 1
   
      ctx.beginPath()
      ctx.strokeStyle = lineColor
      ctx.moveTo(startX, startY)
      // lerp : a  + (b - a) * f
      ctx.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.arc(startX,startY,5,0,2*Math.PI);
      ctx.fill()
      ctx.beginPath()
      ctx.arc(endX,endY,5,0,2*Math.PI);
      ctx.fill()

      if(this.props.activeMetric==='bikeLength'|this.props.activeMetric==='adjustedBikeLength'){
        ctx.beginPath()
        ctx.strokeStyle = lineColor
        ctx.moveTo(stemStartX, stemStartY)
        // lerp : a  + (b - a) * f
        ctx.lineTo(stemStartX + (stemEndX - stemStartX) * amount, stemStartY + (stemEndY - stemStartY) * amount)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.arc(stemStartX,stemStartY,5,0,2*Math.PI);
        ctx.fill()
        ctx.beginPath()
        ctx.arc(stemEndX,stemEndY,5,0,2*Math.PI);
        ctx.fill()
      }

      if(lineObject.dotX1!==0){
        ctx.beginPath()
        ctx.strokeStyle="black"
        ctx.setLineDash([5,3])
        ctx.moveTo(lineObject.dotX1,lineObject.dotY1)
        ctx.lineTo(lineObject.dotX2,lineObject.dotY2)
        ctx.stroke()
        ctx.setLineDash([])
      }

      if(amount>=1){
        running=false
        amount=0
        
      
      }

    }

    if(refresh&&!running&&this.props.activeMetric==='none'){
//      console.log('Inside Refresh')
      this.state.ctx.drawImage(this.state.img, 0, 0,this.state.imageWidth,this.state.imageHeight) 
      lastMetricDrawn='none'
      refresh=false
    }


    requestAnimationFrame(drawMe)
  }
  drawMe()
}

componentDidMount=()=> {

  const canvas = this.refs.canvas
  const ctx = canvas.getContext("2d")
  const img = this.refs.image
  const hbimg = this.refs.hbimage
  const saddleimg=this.refs.saddleimage



  img.onload = () => {

    let imageWidth=img.naturalWidth;
    let imageHeight=img.naturalHeight;
    let aspectRatio=(imageWidth/imageHeight);

    if(imageWidth>700|imageHeight>467|imageWidth>0){
        if(imageWidth>imageHeight){
            imageWidth=700;
            imageHeight=Math.floor(imageWidth/aspectRatio);
        }else{
            imageHeight=467;
            imageWidth=imageHeight*aspectRatio;
        }

    }
        canvas.width=imageWidth;
        canvas.height=imageHeight;

ctx.drawImage(img, 0, 0,imageWidth,imageHeight)

if(this.props.godMode){
  ctx.font="12px Arial"
  ctx.fillStyle="black"
  let labelObject={saddleWidth:{},handlebarWidth:{},toptubePlusStem:{},frameSize:{},saddleLineOne:{},saddleLineTwo:{},standoverLineOne:{},standoverLineTwo:{}}
  let barText="Handlebar Width"
  if(this.props.bikeType==="TT/Tri Bike"){
    labelObject.saddleWidth.x=60
    labelObject.saddleWidth.y=90
    labelObject.handlebarWidth.x=596
    labelObject.handlebarWidth.y=65
    labelObject.toptubePlusStem.x=360
    labelObject.toptubePlusStem.y=56
    labelObject.frameSize.x=170
    labelObject.frameSize.y=115
    labelObject.saddleLineOne.x=295
    labelObject.saddleLineOne.y=155
    labelObject.saddleLineTwo.x=295
    labelObject.saddleLineTwo.y=167
    labelObject.standoverLineOne.x=384
    labelObject.standoverLineOne.y=140
    labelObject.standoverLineTwo.x=384
    labelObject.standoverLineTwo.y=152
    barText="Aerobar Pad Width"
  } 
  if(this.props.bikeType!=="Mountain Bike"&&this.props.bikeType!=="TT/Tri Bike"){
    labelObject.saddleWidth.x=60
    labelObject.saddleWidth.y=90
    labelObject.handlebarWidth.x=596
    labelObject.handlebarWidth.y=65
    labelObject.toptubePlusStem.x=360
    labelObject.toptubePlusStem.y=56
    labelObject.frameSize.x=170
    labelObject.frameSize.y=115
    labelObject.saddleLineOne.x=285
    labelObject.saddleLineOne.y=155
    labelObject.saddleLineTwo.x=285
    labelObject.saddleLineTwo.y=167
    labelObject.standoverLineOne.x=380
    labelObject.standoverLineOne.y=140
    labelObject.standoverLineTwo.x=380
    labelObject.standoverLineTwo.y=152
    } 
    if(this.props.bikeType==="Mountain Bike"){
      labelObject.saddleWidth.x=60
      labelObject.saddleWidth.y=90
      labelObject.handlebarWidth.x=596
      labelObject.handlebarWidth.y=65
      labelObject.toptubePlusStem.x=360
      labelObject.toptubePlusStem.y=56
      labelObject.frameSize.x=170
      labelObject.frameSize.y=115
      labelObject.saddleLineOne.x=285
      labelObject.saddleLineOne.y=155
      labelObject.saddleLineTwo.x=285
      labelObject.saddleLineTwo.y=167
      labelObject.standoverLineOne.x=360
      labelObject.standoverLineOne.y=130
      labelObject.standoverLineTwo.x=360
      labelObject.standoverLineTwo.y=142
      }
  
  ctx.fillText("Saddle Width",labelObject.saddleWidth.x,labelObject.saddleWidth.y)
  ctx.fillText(barText,labelObject.handlebarWidth.x,labelObject.handlebarWidth.y)
  ctx.fillText("Top tube + Stem",labelObject.toptubePlusStem.x,labelObject.toptubePlusStem.y)
  ctx.fillText("Frame Size",labelObject.frameSize.x,labelObject.frameSize.y)
  ctx.fillText("Saddle",labelObject.saddleLineOne.x,labelObject.saddleLineOne.y)
  ctx.fillText("Height",labelObject.saddleLineTwo.x,labelObject.saddleLineTwo.y)
  ctx.fillText("Standover",labelObject.standoverLineOne.x,labelObject.standoverLineOne.y)
  ctx.fillText("Height",labelObject.standoverLineTwo.x,labelObject.standoverLineTwo.y)
}

let imgData=ctx.getImageData(0,0,canvas.width,canvas.height);

this.setState({loaded:true,canvas:canvas,ctx: ctx,img:img,hbimg:hbimg,saddleimg:saddleimg,imgData:imgData, imageWidth:imageWidth,imageHeight: imageHeight});
  }

this.animate(ctx)

}

  render(){
let bikeType=bikeImage
let handlebarImage=roadbarImage
if(this.props.bikeType==="Mountain Bike"){
  bikeType=MTBbikeImage
  handlebarImage=mtbbarImage
}
if(this.props.bikeType==="TT/Tri Bike"){
   bikeType=TTbikeImage
   handlebarImage=aerobarImage
}
if(!this.state.ctx)return null
    return(
      <div>
      <canvas onMouseMove={this.myMouseMoved} className="bikeCanvas" ref="canvas" width={0} height={0} />
    
      <img alt="" className="hidden" ref="image" src={bikeType} />
      <img alt="" className="hidden" ref="hbimage" src={handlebarImage} />
      <img alt="" className="hidden" ref="saddleimage" src={saddleImage} />
    </div>
        )
  }
  
}

export default BikeImageCanvas
