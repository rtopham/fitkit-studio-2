import jsPDF from 'jspdf'
import roadAnnotated from '../assets/Bikes/roadannotated64.js'
import mtbAnnotated from '../assets/Bikes/mtbannotated64.js'
import ttAnnotated from '../assets/Bikes/ttannotated64.js'
import fksLogo from '../assets/fkslogo64.js'

const bikePDF=(bodyMeasurements, softScores, cyclistAge, bike, user, shop, cyclistProfile, updated, notes, logo)=>{
//console.log(bike)
    let pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'letter'
         })
    
    pdf.setFontSize(10);

    //variables
const gridLines=false
const leftMargin=5.95
const topMargin=3.7
const gridSize=17
const pageLength=272
const pageWidth=204
const lineHeight=3
const lineMargin=1.3
const textMidPoint=(.5*gridSize)+(.5*lineHeight)
const thisYear=(new Date()).getFullYear()
let i
let bikeImage=roadAnnotated
if(bike.type==='Mountain Bike') bikeImage=mtbAnnotated
else if(bike.type==='TT/Tri Bike') bikeImage=ttAnnotated


//GridLines
let col=[], row=[]
for (i=0; i<13; i++){col[i]=i*gridSize+leftMargin}
for (i=0; i<17; i++){row[i]=i*gridSize+topMargin}

if(gridLines){
 pdf.setFillColor(200, 200, 200);
 pdf.setLineWidth(0);
 for (i = 0; i < gridSize*12; i=i+gridSize) {
  pdf.rect(leftMargin+i,topMargin,gridSize,pageLength)  
  }
 for (i = 0; i < gridSize*16; i=i+gridSize) {
    pdf.rect(leftMargin,topMargin+i,pageWidth,gridSize)  
    }
  }

//Lines
pdf.line(col[0],row[1]+8,col[12],row[1]+8)
//pdf.line(col[0],row[11]+8,col[12],row[11]+8)
pdf.line(col[0],row[15],col[12],row[15])

//Header Logo

const aspectRatio=logo.width/logo.height
const maxHeight=15
const adjustedWidth=maxHeight*aspectRatio
pdf.addImage(logo, 'JPG', col[0]+1, topMargin+1, adjustedWidth, maxHeight);
//pdf.addImage(logo, 'JPG', col[0]+1,row[15]+4, 9,9);


//Body Measurements
const BMCol=0
const BMRow=4
const labelColumn=col[BMCol]+1
const dataColumn=col[BMCol+2]
const unitsColumn=col[BMCol+3]
const firstLine=row[BMRow]+lineHeight
let line=[]
line[0]=firstLine
for (i = 1; i < 20; i++) {
    line[i]=line[i-1]+lineHeight+lineMargin
  }

pdf.setTextColor(233, 114, 46);
pdf.text(labelColumn, line[0], 'Body Measurements')
pdf.setTextColor(0,0,0)
pdf.text(labelColumn,line[2], 'Height: ')
pdf.text(dataColumn, line[2], String(bodyMeasurements.height));
pdf.text(unitsColumn,line[2], "cm.")
pdf.text(labelColumn,line[3], 'Weight: ')
pdf.text(dataColumn, line[3], String(bodyMeasurements.weight));
pdf.text(unitsColumn,line[3], "kgs.")
pdf.text(labelColumn,line[4], 'Foot Length: ')
pdf.text(dataColumn, line[4], String(bodyMeasurements.footLength));
pdf.text(unitsColumn,line[4], "cm.")
pdf.text(labelColumn,line[5], 'Inseam: ')
pdf.text(dataColumn, line[5], String(bodyMeasurements.inseam));
pdf.text(unitsColumn,line[5], "cm.")
pdf.text(labelColumn,line[6], 'Torso: ')
pdf.text(dataColumn, line[6], String(bodyMeasurements.torso));
pdf.text(unitsColumn,line[6], "cm.")
pdf.text(labelColumn,line[7], 'Arm: ')
pdf.text(dataColumn, line[7], String(bodyMeasurements.arm));
pdf.text(unitsColumn,line[7], "cm.")
pdf.text(labelColumn,line[8], 'Shoulders: ')
pdf.text(dataColumn, line[8], String(bodyMeasurements.shoulders));
pdf.text(unitsColumn,line[8], "cm.")
pdf.text(labelColumn,line[9], 'Sit Bones: ')
pdf.text(dataColumn, line[9], String(bodyMeasurements.sitBones));
pdf.text(unitsColumn,line[9], "cm.")

//Soft Scores
pdf.setTextColor(233, 114, 46);
pdf.text(labelColumn,line[11], 'Soft Scores')
pdf.setTextColor(0,0,0)
pdf.text(labelColumn,line[13], 'Age: ')
pdf.text(dataColumn, line[13], String(cyclistAge))
pdf.text(labelColumn,line[14], 'Flexibility: ')
pdf.text(dataColumn, line[14], String(softScores.flexibility))
pdf.text(labelColumn,line[15], 'Riding Style: ')
pdf.text(dataColumn, line[15], String(softScores.ridingStyle))
pdf.text(labelColumn,line[16], 'Conditions: ')
pdf.text(dataColumn, line[16], String(softScores.preconditions))

//Bike Image

const bikeAspectRatio=bikeImage.height/bikeImage.width
//const bikeWidth=(8*17)-2
const bikeWidth=134
const bikeHeight=Math.round(bikeWidth*bikeAspectRatio)
pdf.addImage(bikeImage.src, 'JPG', col[4]+1,row[2]+1, bikeWidth, bikeHeight)


//Header Fitter Text
let bikeString=''
if(!bike.make&&!bike.model)bikeString='Unspecified Bike';else bikeString=bike.make+' '+bike.model
let bikeUpdatedString=new Date().toDateString()
if(bike.updated)bikeUpdatedString=new Date(bike.updated).toDateString()
const FTCol=7  
const FTRow=0
const FTlabelColumn=col[FTCol]+1
const FTfirstLine=row[FTRow]+lineHeight
line[0]=FTfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
//pdf.text(FTlabelColumn,line[0],'Bike Fit Results: '+bike.make+' '+bike.model)
pdf.text(FTlabelColumn,line[0],'Bike Fit Results: '+bikeString)
//pdf.text(FTlabelColumn,line[1],new Date(bike.updated).toDateString())
pdf.text(FTlabelColumn,line[1],bikeUpdatedString)
pdf.setTextColor(0,0,0)
pdf.text(FTlabelColumn,line[3],'Evaluated by: '+ user.name)
pdf.text(FTlabelColumn,line[4],'Email: ')
pdf.setTextColor(11, 0, 128)
pdf.textWithLink(user.email,FTlabelColumn+11, line[4],{url:'mailto:'+user.email})
pdf.setTextColor(0,0,0)

//Header Shop Text

let STCol=4  
//if(adjustedWidth<50) STCol=3
//if(adjustedWidth<20) STCol=2
const STRow=0
const STlabelColumn=col[STCol]+1
const STfirstLine=row[STRow]+lineHeight
line[0]=STfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}

pdf.setTextColor(0,0,0)

let shopArray =[]// = nameArray.concat(addressArray)
shopArray.push(shop.name)

shopArray.push(shop.address)
if(shop.address2) shopArray.push(shop.address2)
shopArray.push(shop.phone)

pdf.text(STlabelColumn,line[0],shopArray)
pdf.setTextColor(11, 0, 128)
pdf.textWithLink(shop.website,STlabelColumn, line[shopArray.length],{url: shop.website})

//Cyclist Profile
const CPCol=0
const CPRow=2
const CPlabelColumn=col[CPCol]+1
const CPdataColumn=col[CPCol+1]
const CPfirstLine=row[CPRow]+lineHeight
line[0]=CPfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(CPlabelColumn,line[0],'Cyclist')
pdf.setTextColor(0,0,0)
pdf.text(CPlabelColumn,line[2],'Name: ')
pdf.text(CPdataColumn,line[2],cyclistProfile.firstName+' '+cyclistProfile.lastName)
pdf.text(CPlabelColumn,line[3],'Email: ')
pdf.setTextColor(11, 0, 128)
pdf.textWithLink(cyclistProfile.email,CPdataColumn,line[3],{url:'mailto:'+cyclistProfile.email})
pdf.setTextColor(0,0,0)
pdf.text(CPlabelColumn,line[4],'Gender: ')
pdf.text(CPdataColumn,line[4],cyclistProfile.gender)
pdf.text(CPlabelColumn,line[5],'DOB: ')
pdf.text(CPdataColumn,line[5],cyclistProfile.birthDate.substring(0,10))
pdf.text(CPlabelColumn,line[6],'Updated:')
pdf.text(CPdataColumn,line[6],new Date(updated).toDateString())

//Bike Equipment
const BECol=0
const BERow=8
const BElabelColumn=col[BECol]+1
const BEdataColumn=col[BECol+2]
const BEfirstLine=row[BERow]+lineHeight*4
line[0]=BEfirstLine
for (i = 1; i < 25; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(BElabelColumn,line[0],'Equipment')
pdf.setTextColor(0,0,0)

if(bike.type!=='Mountain Bike'&& bike.type!=='TT/Tri Bike'){
pdf.text(BElabelColumn,line[2],'Bike: ')
//pdf.text(BEdataColumn,line[2],bike.make+' '+bike.model)
pdf.text(BEdataColumn,line[2],bikeString)
pdf.text(BElabelColumn,line[3],'Frame Size: ')
pdf.text(BEdataColumn,line[3],bike.frameSize+ '')
pdf.text(BElabelColumn,line[4],'Frame Stack: ')
pdf.text(BEdataColumn,line[4],bike.frameStack+ ' mm.')
pdf.text(BElabelColumn,line[5],'Frame Reach: ')
pdf.text(BEdataColumn,line[5],bike.frameReach+ ' mm.')
pdf.text(BElabelColumn,line[6],'Effective Top Tube: ')
pdf.text(BEdataColumn,line[6],bike.effectiveTopTube+' mm.')
pdf.text(BElabelColumn,line[7],'Stem Length: ')
pdf.text(BEdataColumn,line[7],bike.stemLength+ ' mm.')
pdf.text(BElabelColumn,line[8],'Stem Angle: ')
pdf.text(BEdataColumn,line[8],bike.stemAngle+ ' deg.')
pdf.text(BElabelColumn,line[9],'Spacers Below: ')
pdf.text(BEdataColumn,line[9],bike.spacersBelow+' mm.')
pdf.text(BElabelColumn,line[10],'Spacers Above: ')
pdf.text(BEdataColumn,line[10],bike.spacersAbove+' mm')
pdf.text(BElabelColumn,line[11],'Handlebar Width: ')
pdf.text(BEdataColumn,line[11],bike.handlebarWidth+ ' mm.')
pdf.text(BElabelColumn,line[12],'Handlebar Reach: ')
pdf.text(BEdataColumn,line[12],bike.handlebarReach+ ' mm.')
pdf.text(BElabelColumn,line[13],'Seat Post Offset: ')
pdf.text(BEdataColumn,line[13],bike.seatPostOffset+ ' mm.')
pdf.text(BElabelColumn,line[14],'Saddle: ')
pdf.text(BEdataColumn,line[14],bike.saddleMake+' '+bike.saddleModel)
pdf.text(BElabelColumn,line[15],'Saddle Width: ')
pdf.text(BEdataColumn,line[15],bike.saddleWidth+ ' mm.')
pdf.text(BElabelColumn,line[16],'Crank Length: ')
pdf.text(BEdataColumn,line[16],bike.crankLength+ ' mm.')
pdf.text(BElabelColumn,line[17],'Pedal Type: ')
pdf.text(BEdataColumn,line[17],bike.pedalType)
pdf.text(BElabelColumn,line[18],'Pedal Make/Model: ')
pdf.text(BEdataColumn,line[18],bike.pedalMakeModel)
pdf.text(BElabelColumn,line[19],'Shifters: ')
pdf.text(BEdataColumn,line[19],bike.shifterType)
pdf.text(BElabelColumn,line[20],'Brakes: ')
pdf.text(BEdataColumn,line[20],bike.brakeType)
}

if(bike.type==='Mountain Bike'){
  pdf.text(BElabelColumn,line[2],'Bike: ')
  pdf.text(BEdataColumn,line[2],bike.make+' '+bike.model)
  pdf.text(BElabelColumn,line[3],'Wheel Size: ')
  pdf.text(BEdataColumn,line[3],bike.mtbWheelSize+ ' in.')
  pdf.text(BElabelColumn,line[4],'Frame Size: ')
  pdf.text(BEdataColumn,line[4],bike.frameSize+ ' cm.')
  pdf.text(BElabelColumn,line[5],'Frame Stack: ')
  pdf.text(BEdataColumn,line[5],bike.frameStack+ ' mm.')
  pdf.text(BElabelColumn,line[6],'Frame Reach: ')
  pdf.text(BEdataColumn,line[6],bike.frameReach+ ' mm.')
  pdf.text(BElabelColumn,line[7],'Effective Top Tube: ')
  pdf.text(BEdataColumn,line[7],bike.effectiveTopTube+' mm.')
  pdf.text(BElabelColumn,line[8],'Stem Length: ')
  pdf.text(BEdataColumn,line[8],bike.stemLength+ ' mm.')
  pdf.text(BElabelColumn,line[9],'Stem Angle: ')
  pdf.text(BEdataColumn,line[9],bike.stemAngle+ ' deg.')
  pdf.text(BElabelColumn,line[10],'Spacers Below: ')
  pdf.text(BEdataColumn,line[10],bike.spacersBelow+' mm.')
  pdf.text(BElabelColumn,line[11],'Spacers Above: ')
  pdf.text(BEdataColumn,line[11],bike.spacersAbove+' mm.')
  pdf.text(BElabelColumn,line[12],'Handlebar Width: ')
  pdf.text(BEdataColumn,line[12],bike.handlebarWidth+ ' mm.')
  pdf.text(BElabelColumn,line[13],'Seat Post Type: ')
  pdf.text(BEdataColumn,line[13],bike.mtbSeatPostType)
  pdf.text(BElabelColumn,line[14],'Seat Post Offset: ')
  pdf.text(BEdataColumn,line[14],bike.seatPostOffset+ ' mm.')
  pdf.text(BElabelColumn,line[15],'Saddle: ')
  pdf.text(BEdataColumn,line[15],bike.saddleMake+' '+bike.saddleModel)
  pdf.text(BElabelColumn,line[16],'Saddle Width: ')
  pdf.text(BEdataColumn,line[16],bike.saddleWidth+ ' mm.')
  pdf.text(BElabelColumn,line[17],'Crank Length: ')
  pdf.text(BEdataColumn,line[17],bike.crankLength+ ' mm.')
  pdf.text(BElabelColumn,line[18],'Pedal Type: ')
  pdf.text(BEdataColumn,line[18],bike.pedalType)
  pdf.text(BElabelColumn,line[19],'Pedal Make/Model: ')
  pdf.text(BEdataColumn,line[19],bike.pedalMakeModel)
  pdf.text(BElabelColumn,line[20],'Shifters: ')
  pdf.text(BEdataColumn,line[20],bike.shifterType)
  pdf.text(BElabelColumn,line[21],'Brakes: ')
  pdf.text(BEdataColumn,line[21],bike.brakeType)
  
  
  }



if(bike.type==='TT/Tri Bike'){
  pdf.text(BElabelColumn,line[2],'Bike: ')
  pdf.text(BEdataColumn,line[2],bike.make+' '+bike.model)
  pdf.text(BElabelColumn,line[3],'Frame Size: ')
  pdf.text(BEdataColumn,line[3],bike.frameSize+ ' cm.')
  pdf.text(BElabelColumn,line[4],'Frame Stack: ')
  pdf.text(BEdataColumn,line[4],bike.frameStack+ ' mm.')
  pdf.text(BElabelColumn,line[5],'Frame Reach: ')
  pdf.text(BEdataColumn,line[5],bike.frameReach+ ' mm.')
  pdf.text(BElabelColumn,line[6],'Effective Top Tube: ')
  pdf.text(BEdataColumn,line[6],bike.effectiveTopTube+' mm.')
  pdf.text(BElabelColumn,line[7],'Basebar Width: ')
  pdf.text(BEdataColumn,line[7],bike.ttBasebarWidth+' mm.')
  pdf.text(BElabelColumn,line[8],'Aerobar Type: ')
  pdf.text(BEdataColumn,line[8],bike.ttAerobarType)
  pdf.text(BElabelColumn,line[9],'Aerobar Model: ')
  pdf.text(BEdataColumn,line[9],bike.ttAerobarMakeModel)
  pdf.text(BElabelColumn,line[10],'Extensions--Shape: ')
  pdf.text(BEdataColumn,line[10],bike.ttExtensionsShape)
  pdf.text(BElabelColumn,line[11],'Risers: ')
  pdf.text(BEdataColumn,line[11],bike.ttRisers)
  pdf.text(BElabelColumn,line[12],'Pads Make/Model: ')
  pdf.text(BEdataColumn,line[12],bike.ttPadsMakeModel)
  pdf.text(BElabelColumn,line[13],'Stem Type: ')
  pdf.text(BEdataColumn,line[13],bike.stemType)
  pdf.text(BElabelColumn,line[14],'Stem Length: ')
  pdf.text(BEdataColumn,line[14],bike.stemLength+ ' mm.')
  pdf.text(BElabelColumn,line[15],'Stem Angle: ')
  pdf.text(BEdataColumn,line[15],bike.stemAngle+ ' deg.')
  pdf.text(BElabelColumn,line[16],'Spacers Below: ')
  pdf.text(BEdataColumn,line[16],bike.spacersBelow+' mm.')
  pdf.text(BElabelColumn,line[17],'Spacers Above: ')
  pdf.text(BEdataColumn,line[17],bike.spacersAbove+' mm.')
  pdf.text(BElabelColumn,line[18],'Saddle: ')
  pdf.text(BEdataColumn,line[18],bike.saddleMake+' '+bike.saddleModel)
//  pdf.text(BElabelColumn,line[19],'Saddle Width: ')
//  pdf.text(BEdataColumn,line[19],bike.saddleWidth+ ' mm.')
  pdf.text(BElabelColumn,line[19],'Crank Length: ')
  pdf.text(BEdataColumn,line[19],bike.crankLength+ ' mm.')
  pdf.text(BElabelColumn,line[20],'Pedal Type: ')
  pdf.text(BEdataColumn,line[20],bike.pedalType)
  pdf.text(BElabelColumn,line[21],'Pedal Make/Model: ')
  pdf.text(BEdataColumn,line[21],bike.pedalMakeModel)
  pdf.text(BElabelColumn,line[22],'Shifters: ')
  pdf.text(BEdataColumn,line[22],bike.shifterType)
  pdf.text(BElabelColumn,line[23],'Brakes: ')
  pdf.text(BEdataColumn,line[23],bike.brakeType)

/*
  pdf.text(BElabelColumn,line[8],'Seat Post Offset: ')
  pdf.text(BEdataColumn,line[8],bike.seatPostOffset+ ' mm.')



  if(bike.type==='TT/Tri Bike') pdf.text(BElabelColumn,line[16],'Aerobar Pad Width: '); else pdf.text(BElabelColumn,line[16],'Handlebar Width: ')
  pdf.text(BEdataColumn,line[16],bike.handlebarWidth+ ' mm.')
  pdf.text(BElabelColumn,line[17],'Handlebar Reach: ')
  pdf.text(BEdataColumn,line[17],bike.handlebarReach+ ' mm.')

  pdf.text(BElabelColumn,line[20],'Shoe Brand: ')
  pdf.text(BEdataColumn,line[20],bike.shoeBrand)
  pdf.text(BElabelColumn,line[21],'Shoe Model: ')
  pdf.text(BEdataColumn,line[21],bike.shoeModel)
  pdf.text(BElabelColumn,line[22],'Shoe Size: ')
  pdf.text(BEdataColumn,line[22],bike.shoeSize+'')
  pdf.text(BElabelColumn,line[23],'Insoles: ')
  pdf.text(BEdataColumn,line[23],bike.insoles)
  pdf.text(BElabelColumn,line[24],'Cleat Model: ')
  pdf.text(BEdataColumn,line[24],bike.cleatModel)
  */
  }


//Fit Position
const FPCol=5
const FPRow=7
const FPlabelColumn=col[FPCol]+1
const FPdataColumn=col[FPCol+5]
const FPunitsColumn=col[FPCol+6]+5
const FPfirstLine=row[FPRow]+lineHeight
line[0]=FPfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(FPlabelColumn,line[0],'Fit Position')
pdf.setTextColor(0,0,0)

if(bike.type!=="Mountain Bike" && bike.type!=="TT/Tri Bike"){
pdf.text(FPlabelColumn,line[2],'Saddle Height (saddle to pedal spindle):')
pdf.text(FPdataColumn, line[2],bike.saddleHeight+'')
pdf.text(FPunitsColumn,line[2],'mm.')
pdf.text(FPlabelColumn,line[3],'Saddle Height (saddle to bottom bracket):')
pdf.text(FPdataColumn, line[3],bike.saddleHeightBB+'')
pdf.text(FPunitsColumn,line[3],'mm.')
pdf.text(FPlabelColumn,line[4],'Saddle Setback (from bottom bracket):')
pdf.text(FPdataColumn, line[4],bike.saddleSetBack+'')
pdf.text(FPunitsColumn,line[4],'mm.')
pdf.text(FPlabelColumn,line[5],'Saddle Angle:')
pdf.text(FPdataColumn, line[5],bike.saddleAngle+'')
pdf.text(FPunitsColumn,line[5],'deg.')
pdf.text(FPlabelColumn,line[6],'Saddle Nose to Bar Center:')
pdf.text(FPdataColumn, line[6],bike.saddleNoseToBar+'')
pdf.text(FPunitsColumn,line[6],'mm.')
pdf.text(FPlabelColumn,line[7],'Saddle Nose to Hood Trough:')
pdf.text(FPdataColumn, line[7],bike.saddleNoseToHood+'')
pdf.text(FPunitsColumn,line[7],'mm.')
pdf.text(FPlabelColumn,line[8],'Saddle To Bar Drop:')
pdf.text(FPdataColumn, line[8],bike.saddleToBarDrop+'')
pdf.text(FPunitsColumn,line[8],'mm.')
pdf.text(FPlabelColumn,line[9],'Handlebar Reach (HX):')
pdf.text(FPdataColumn, line[9],bike.handlebarReachHX+'')
pdf.text(FPunitsColumn,line[9],'mm.')
pdf.text(FPlabelColumn,line[10],'Handlebar Stack (HY):')
pdf.text(FPdataColumn, line[10],bike.handlebarStackHY+'')
pdf.text(FPunitsColumn,line[10],'mm.')
}

if(bike.type==="Mountain Bike"){
  pdf.text(FPlabelColumn,line[2],'Saddle Height (saddle to pedal spindle):')
  pdf.text(FPdataColumn, line[2],bike.saddleHeight+'')
  pdf.text(FPunitsColumn,line[2],'mm.')
  pdf.text(FPlabelColumn,line[3],'Saddle Height (saddle to bottom bracket):')
  pdf.text(FPdataColumn, line[3],bike.saddleHeightBB+'')
  pdf.text(FPunitsColumn,line[3],'mm.')
  pdf.text(FPlabelColumn,line[4],'Saddle Setback (from bottom bracket):')
  pdf.text(FPdataColumn, line[4],bike.saddleSetBack+'')
  pdf.text(FPunitsColumn,line[4],'mm.')
  pdf.text(FPlabelColumn,line[5],'Saddle Angle:')
  pdf.text(FPdataColumn, line[5],bike.saddleAngle+'')
  pdf.text(FPunitsColumn,line[5],'deg.')
  pdf.text(FPlabelColumn,line[6],'Saddle Nose to Bar Center:')
  pdf.text(FPdataColumn, line[6],bike.saddleNoseToBar+'')
  pdf.text(FPunitsColumn,line[6],'mm.')
  pdf.text(FPlabelColumn,line[7],'Saddle Nose to Grip End:')
  pdf.text(FPdataColumn, line[7],bike.mtbSaddleNoseToGripEnd+'')
  pdf.text(FPunitsColumn,line[7],'mm.')
  pdf.text(FPlabelColumn,line[8],'Saddle To Grip Center Drop/Rise:')
  pdf.text(FPdataColumn, line[8],bike.mtbSaddleToGripCenterDropRise+'')
  pdf.text(FPunitsColumn,line[8],'mm.')
  pdf.text(FPlabelColumn,line[9],'Handlebar Reach (HX):')
  pdf.text(FPdataColumn, line[9],bike.handlebarReachHX+'')
  pdf.text(FPunitsColumn,line[9],'mm.')
  pdf.text(FPlabelColumn,line[10],'Handlebar Stack (HY):')
  pdf.text(FPdataColumn, line[10],bike.handlebarStackHY+'')
  pdf.text(FPunitsColumn,line[10],'mm.')
  }

if(bike.type==="TT/Tri Bike"){
  pdf.text(FPlabelColumn,line[2],'Saddle Height (saddle to pedal spindle):')
  pdf.text(FPdataColumn, line[2],bike.saddleHeight+'')
  pdf.text(FPunitsColumn,line[2],'mm.')
  pdf.text(FPlabelColumn,line[3],'Saddle Height (saddle to bottom bracket):')
  pdf.text(FPdataColumn, line[3],bike.saddleHeightBB+'')
  pdf.text(FPunitsColumn,line[3],'mm.')
  pdf.text(FPlabelColumn,line[4],'Saddle Setback (from bottom bracket):')
  pdf.text(FPdataColumn, line[4],bike.saddleSetBack+'')
  pdf.text(FPunitsColumn,line[4],'mm.')
  pdf.text(FPlabelColumn,line[5],'Saddle Angle:')
  pdf.text(FPdataColumn, line[5],bike.saddleAngle+'')
  pdf.text(FPunitsColumn,line[5],'deg.')
  pdf.text(FPlabelColumn,line[6],'Saddle to Pad (center) Drop:')
  pdf.text(FPdataColumn, line[6],bike.ttSaddleToPadCenterDrop+'')
  pdf.text(FPunitsColumn,line[6],'mm.')
  pdf.text(FPlabelColumn,line[7],'Saddle Nose to Pad Rear:')
  pdf.text(FPdataColumn, line[7],bike.ttSaddleNoseToPadRear+'')
  pdf.text(FPunitsColumn,line[7],'mm.')
  pdf.text(FPlabelColumn,line[8],'Saddle Nose to End of Extensions:')
  pdf.text(FPdataColumn, line[8],bike.ttSaddleNoseToEndOfExtensions+'')
  pdf.text(FPunitsColumn,line[8],'mm.')
  pdf.text(FPlabelColumn,line[9],'Extension Width At Clamps:')
  pdf.text(FPdataColumn, line[9],bike.ttExtensionWidthAtClamps+'')
  pdf.text(FPunitsColumn,line[9],'mm.')
  pdf.text(FPlabelColumn,line[10],'Extension Width At End:')
  pdf.text(FPdataColumn, line[10],bike.ttExtensionWidthAtEnd+'')
  pdf.text(FPunitsColumn,line[10],'mm.')
  pdf.text(FPlabelColumn,line[11],'Extension Angle:')
  pdf.text(FPdataColumn, line[11],bike.ttExtensionAngle+'')
  pdf.text(FPunitsColumn,line[11],'deg.')
  pdf.text(FPlabelColumn,line[12],'Pad With:')
  pdf.text(FPdataColumn, line[12],bike.ttPadWidth+'')
  pdf.text(FPunitsColumn,line[12],'mm.')
  pdf.text(FPlabelColumn,line[13],'Pad X Reach (rear of pad):')
  pdf.text(FPdataColumn, line[13],bike.ttPadXReachRearOfPad+'')
  pdf.text(FPunitsColumn,line[13],'mm.')
  pdf.text(FPlabelColumn,line[14],'Pad X Reach (center of pad):')
  pdf.text(FPdataColumn, line[14],bike.ttPadXReachCenterOfPad+'')
  pdf.text(FPunitsColumn,line[14],'mm.')
  pdf.text(FPlabelColumn,line[15],'Pad Y Stack (rear of pad):')
  pdf.text(FPdataColumn, line[15],bike.ttPadYStackRearOfPad+'')
  pdf.text(FPunitsColumn,line[15],'mm.')
  pdf.text(FPlabelColumn,line[16],'Basebar Reach (X):')
  pdf.text(FPdataColumn, line[16],bike.ttBasebarReachX+'')
  pdf.text(FPunitsColumn,line[16],'mm.')
  pdf.text(FPlabelColumn,line[17],'Basebar Stack (Y):')
  pdf.text(FPdataColumn, line[17],bike.ttBasebarStackY+'')
  pdf.text(FPunitsColumn,line[17],'mm.')
  }
//pdf.text(SRlabelColumn,line[13],'Adjusted Bike Length (top tube + stem):')
//pdf.text(SRdataColumn, line[13],bike.adjustedBikeLength.toString())
//pdf.text(SRunitsColumn,line[13],'cm. (drop bar)')


/*
//Shoes/Cleats
const SCCol=5
let   SCRow=10
if(bike.type==='TT/Tri Bike')SCRow=12
const SClabelColumn=col[SCCol]+1
const SCdataColumn=col[SCCol+5]
const SCunitsColumn=col[SCCol+6]+5
const SCfirstLine=row[SCRow]+lineHeight
line[0]=SCfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(SClabelColumn,line[0],'Shoes/Cleats')
pdf.setTextColor(0,0,0)
pdf.text(SClabelColumn,line[1],'Shoe Brand: ')
pdf.text(SCdataColumn,line[1],bike.shoeBrand)
pdf.text(SClabelColumn,line[2],'Shoe Model: ')
pdf.text(SCdataColumn,line[2],bike.shoeModel)
pdf.text(SClabelColumn,line[3],'Shoe Size: ')
pdf.text(SCdataColumn,line[3],bike.shoeSize+'')
pdf.text(SClabelColumn,line[4],'Insoles: ')
pdf.text(SCdataColumn,line[4],bike.insoles)
pdf.text(SClabelColumn,line[5],'Cleat Model: ')
pdf.text(SCdataColumn,line[5],bike.cleatModel)
*/

//Bike Notes
const NCol=5
let NRow=10
if(bike.type==='TT/Tri Bike')NRow=12
const NlabelColumn=col[NCol]+1
const NfirstLine=row[NRow]+lineHeight
line[0]=NfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(NlabelColumn,line[0],'Notes')
pdf.setTextColor(0,0,0)
if (bike.notes) {
  let splitNotes = pdf.splitTextToSize(bike.notes, gridSize*11);
  pdf.text(NlabelColumn,line[2], splitNotes);
}


//Notes
/*
const NCol=0
const NRow=12
const NlabelColumn=col[NCol]+1
const NfirstLine=row[NRow]+lineHeight
line[0]=NfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(NlabelColumn,line[0],'Notes')
pdf.setTextColor(0,0,0)
if (notes) {
  let splitNotes = pdf.splitTextToSize(notes, gridSize*11);
  pdf.text(NlabelColumn,line[2], splitNotes);
}
*/

//footer

pdf.addImage(fksLogo.src, 'JPG', col[0]+4,row[15]+4, 9,9);
const copyrightstring = "Copyright © "+thisYear+" Fit Kit Systems"
pdf.text(copyrightstring,col[1],row[15]+textMidPoint)
pdf.text('Proper use of recommendations is the sole responsibility of the user.',col[5],row[15]+textMidPoint)


pdf.save('FKS_Fit_Report_'+cyclistProfile.firstName+'_'+cyclistProfile.lastName+'_'+bikeString.replace(' ','_')+'_'+new Date(updated).toISOString().substring(0,10)+'.pdf')
}



export {
    
    bikePDF

}