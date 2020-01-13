import jsPDF from 'jspdf'
//import bikeImage from '../assets/sizingannotated64.js'
import roadBikeImage from '../assets/Bikes/roadsizingannotated64'
import ttBikeImage from '../assets/Bikes/ttsizingannotated64'
import mtbBikeImage from '../assets/Bikes/mtbsizingannotated64'
import fksLogo from '../assets/fkslogo64.js'

const sizingPDF=(bodyMeasurements, softScores, cyclistAge, bike, user, shop, cyclistProfile, updated, notes, logo)=>{
    let pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'letter'
         })
    
    pdf.setFontSize(10);
//console.log(bike)
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
pdf.line(col[0],row[11]+8,col[12],row[11]+8)
pdf.line(col[0],row[15],col[12],row[15])

//Header Logo
const aspectRatio=logo.width/logo.height
const maxHeight=15
const adjustedWidth=maxHeight*aspectRatio
pdf.addImage(logo, 'JPG', col[0]+1, topMargin+1, adjustedWidth, maxHeight);


//Body Measurements
const BMCol=0
const BMRow=7
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
let bikeImage=roadBikeImage
if(bike.type==='TT/Tri Bike') bikeImage=ttBikeImage
if(bike.type==='Mountain Bike') bikeImage=mtbBikeImage
const bikeAspectRatio=bikeImage.height/bikeImage.width
const bikeWidth=(8*17)-2
const bikeHeight=Math.round(bikeWidth*bikeAspectRatio)
pdf.addImage(bikeImage.src, 'JPG', col[4]+1,row[2]+1, bikeWidth, bikeHeight)

//Header Fitter Text
const FTCol=7  
const FTRow=0
const FTlabelColumn=col[FTCol]+1
const FTfirstLine=row[FTRow]+lineHeight
line[0]=FTfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(FTlabelColumn,line[0],'Fit Kit Systems Sizing Recommendations')
pdf.setTextColor(0,0,0)
pdf.text(FTlabelColumn,line[2],'Evaluated by: '+ user.name)
pdf.text(FTlabelColumn,line[3],'Email: ')
pdf.setTextColor(11, 0, 128)
pdf.textWithLink(user.email,FTlabelColumn+11, line[3],{url:'mailto:'+user.email})
pdf.setTextColor(0,0,0)

//Header Shop Text

let STCol=4  
if(adjustedWidth<50) STCol=3
if(adjustedWidth<20) STCol=2
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
pdf.text(CPdataColumn,line[6],new Date(updated).toDateString().substring(0,10))

//Sizing Recommendations
const SRCol=4
const SRRow=7
const SRlabelColumn=col[SRCol]+1
const SRdataColumn=col[SRCol+4]
const SRunitsColumn=col[SRCol+5]+5
const SRfirstLine=row[SRRow]+lineHeight
line[0]=SRfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(SRlabelColumn,line[0],'Sizing Recommendations')
pdf.setTextColor(0,0,0)
pdf.text(SRlabelColumn,line[2],'Frame Size (virtual seat tube):')
pdf.text(SRdataColumn, line[2],bike.frameSize.toString())
pdf.text(SRunitsColumn,line[2],'cm.')
pdf.text(SRlabelColumn,line[3],'Saddle Height (saddle to pedal spindle):')
pdf.text(SRdataColumn, line[3],bike.minSaddle.toString()+' - '+bike.maxSaddle.toString())
pdf.text(SRunitsColumn,line[3],'cm.')
pdf.text(SRlabelColumn,line[4],'Maximum Standover Height:')
pdf.text(SRdataColumn, line[4],bike.maxStandoverHeight.toString())
pdf.text(SRunitsColumn,line[4],'cm.')
pdf.text(SRlabelColumn,line[6],'Handlebar Width (drop bar):')
pdf.text(SRdataColumn, line[6],bike.handlebarWidth.toString())
pdf.text(SRunitsColumn,line[6],'cm.')
pdf.text(SRlabelColumn,line[7],'Saddle Width:')
pdf.text(SRdataColumn, line[7],bike.minSaddleWidth.toString()+' - '+bike.maxSaddleWidth.toString())
pdf.text(SRunitsColumn,line[7],'mm.')
pdf.text(SRlabelColumn,line[9],'Bike Length (top tube + stem):')
pdf.text(SRdataColumn, line[9],bike.dropTopTubeAndStem.toString())
pdf.text(SRunitsColumn,line[9],'cm. (drop bar)')
pdf.text(SRdataColumn, line[10],bike.flatTopTubeAndStem.toString())
pdf.text(SRunitsColumn,line[10],'cm. (flat bar)')
pdf.text(SRdataColumn, line[11],(bike.dropTopTubeAndStem-2).toString())
pdf.text(SRunitsColumn,line[11],'cm. (aero bar)')
pdf.text(SRlabelColumn,line[13],'Adjusted Bike Length (top tube + stem):')
pdf.text(SRdataColumn, line[13],bike.adjustedDropTopTubeAndStem.toString())
pdf.text(SRunitsColumn,line[13],'cm. (drop bar)')
pdf.text(SRdataColumn, line[14],bike.adjustedFlatTopTubeAndStem.toString())
pdf.text(SRunitsColumn,line[14],'cm. (flat bar)')
pdf.text(SRdataColumn, line[15],(bike.adjustedDropTopTubeAndStem-2).toString())
pdf.text(SRunitsColumn,line[15],'cm. (aero bar)')

//Notes
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

//footer
pdf.addImage(fksLogo.src, 'JPG', col[0]+4,row[15]+4, 9,9);
const copyrightstring = "Copyright © "+thisYear+" Fit Kit Systems"
pdf.text(copyrightstring,col[1],row[15]+textMidPoint)
pdf.text('Proper use of recommendations is the sole responsibility of the user.',col[5],row[15]+textMidPoint)


pdf.save('FKS_Sizing_Report_'+cyclistProfile.firstName+'_'+cyclistProfile.lastName+'_'+new Date(updated).toISOString().substring(0,10)+'.pdf')
}



export {
    
    sizingPDF

}