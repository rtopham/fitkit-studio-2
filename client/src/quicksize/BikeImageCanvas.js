import React, { Component } from 'react'
import './QuickSize.css'
import bikeImage from './../assets/Bikes/FitKit3Rd.png'
import handlebarImage from './../assets/Bikes/handlebar.png'
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

getLineObject=(activeMetric)=>{
  let lineObject={
    x1:0,
    x2:0,
    y1:0,
    y2:0,
    handlebar:false,
    saddle:false   
  }
  switch(activeMetric){
    case 'frameSize': lineObject.x1=242
                      lineObject.y1=67
                      lineObject.x2=310
                      lineObject.y2=300;break; 
    case 'saddleHeight': lineObject.x1=225
                         lineObject.y1=12
                         lineObject.x2=328
                         lineObject.y2=367;break; 
    case 'handlebarWidth':lineObject.x1=604
                          lineObject.y1=15
                          lineObject.x2=677
                          lineObject.y2=15
                          lineObject.handlebar=true;break;
    case 'saddleWidth':lineObject.x1=87
                       lineObject.y1=60
                       lineObject.x2=110
                       lineObject.y2=60
                       lineObject.saddle=true;break;  
    case 'standoverHeight': lineObject.x1=370
                            lineObject.y1=90
                            lineObject.x2=370
                            lineObject.y2=400;break
    case 'bikeLength':  lineObject.x1=244
                        lineObject.y1=70
                        lineObject.x2=477
                        lineObject.y2=70;break
    case 'adjustedBikeLength':  lineObject.x1=244
                                lineObject.y1=70
                                lineObject.x2=477
                                lineObject.y2=70;break
    default: console.log('no active metric')
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
  const stemStartX=465
  const stemStartY=40
  const stemEndX=508
  const stemEndY=34
  
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


let imgData=ctx.getImageData(0,0,canvas.width,canvas.height);

this.setState({loaded:true,canvas:canvas,ctx: ctx,img:img,hbimg:hbimg,saddleimg:saddleimg,imgData:imgData, imageWidth:imageWidth,imageHeight: imageHeight});
  }

this.animate(ctx)

}

  render(){
if(!this.state.ctx)return null
    return(
      <div>
      <canvas onMouseMove={this.myMouseMoved} className="bikeCanvas" ref="canvas" width={0} height={0} />
    
      <img alt="" className="hidden" ref="image" src={bikeImage} />
      <img alt="" className="hidden" ref="hbimage" src={handlebarImage} />
      <img alt="" className="hidden" ref="saddleimage" src={saddleImage} />
    </div>
        )
  }
  
}

export default BikeImageCanvas
