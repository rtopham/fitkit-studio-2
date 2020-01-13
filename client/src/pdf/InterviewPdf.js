import jsPDF from 'jspdf'
import fksLogo from '../assets/fkslogo64.js'

const interviewPDF=(interview, shop, logo, objectives, existingBike, age)=>{
    let pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'letter'
         })
    
    pdf.setFontSize(10);

//init

/*const keys= Object.keys(interview)
for (const key of keys){
//  console.log(key+":"+interview[key])
  if(!interview[key]) interview[key]=""
}
*/

if(interview.priorBikeFit!==true) interview.priorBikeFit="No"; else interview.priorBikeFit="Yes"


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
const lineMarginBody=3.3
const textMidPoint=(.5*gridSize)+(.5*lineHeight)
const thisYear=(new Date()).getFullYear()
let i
let line=[]


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
pdf.line(col[0],row[10],col[12],row[10])
pdf.line(col[0],row[15],col[12],row[15])

//Header Logo
const aspectRatio=logo.width/logo.height
const maxHeight=15
const adjustedWidth=maxHeight*aspectRatio
pdf.addImage(logo, 'JPG', col[0]+1, topMargin+1, adjustedWidth, maxHeight);

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
pdf.text(FTlabelColumn,line[0],'Pre-Fit Interview Summary')
pdf.setTextColor(0,0,0)
pdf.text(FTlabelColumn,line[2],'Customer: '+ interview.firstName+' '+interview.lastName)
if(interview.objectiveMeasureAndAdvise) pdf.text(FTlabelColumn,line[4],'Bike: New Bike')
if(!interview.objectiveMeasureAndAdvise) pdf.text(FTlabelColumn,line[4],'Bike: '+existingBike)



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

let shopArray =[]
shopArray.push(shop.name)

shopArray.push(shop.address)
if(shop.address2) shopArray.push(shop.address2)
shopArray.push(shop.phone)

pdf.text(STlabelColumn,line[0],shopArray)
pdf.setTextColor(11, 0, 128)
pdf.textWithLink(shop.website,STlabelColumn, line[shopArray.length],{url: shop.website})


//Interview Summary
const CPCol=0
const CPRow=2
const CPlabelColumn=col[CPCol]+1
const CPfirstLine=row[CPRow]+lineHeight
line[0]=CPfirstLine
for (i = 1; i < 25; i++) {
  line[i]=line[i-1]+lineHeight+lineMarginBody
}
pdf.setTextColor(233, 114, 46)
pdf.text(CPlabelColumn,line[0],'Pre-Fit Interview Summary')
pdf.setTextColor(0,0,0)
pdf.text(CPlabelColumn,line[2], 'Date Completed: '+interview.created.substring(0,10))
pdf.text(CPlabelColumn,line[3], 'Contact Details: '                    +interview.firstName+' '+interview.lastName+' | '+interview.email+' | '+interview.phone+' | '+interview.zipCode)
pdf.text(CPlabelColumn,line[4], 'Referral Source: '                    +interview.referralSource)
pdf.text(CPlabelColumn,line[5], 'Referral Source Details: '            +interview.referralSourceDetails)
pdf.text(CPlabelColumn,line[6], 'Prior Bike Fit: '                     +interview.priorBikeFit)
pdf.text(CPlabelColumn,line[7], 'Bike Fit Objectives: '                +objectives)
pdf.text(CPlabelColumn,line[8], 'Additional Comments: '                +interview.objectiveComments)
pdf.text(CPlabelColumn,line[9], 'Riding Profile: '                     +interview.ridingStyle+' | Years of Experience: '+interview.yearsCycling+' | Average Hours Per Week: '+interview.hoursPerWeek)
pdf.text(CPlabelColumn,line[10],'Cycling Goals: '                      +interview.cyclingGoals)
pdf.text(CPlabelColumn,line[11],'Physical Profile: Age: '              +age+' | Gender: '+interview.gender+' | Height: '+interview.height+' cm. | Weight: '+interview.weight+' kg.')
pdf.text(CPlabelColumn,line[12],'Physical Considerations '             +interview.physicalComments)
pdf.text(CPlabelColumn,line[13],'Areas of Discomfort: '                +interview.discomfortAreas)
pdf.text(CPlabelColumn,line[14],'Other Physical Activities: '          +interview.otherPhysicalActivities)
let nextLine
if(interview.objectiveMeasureAndAdvise){
pdf.text(CPlabelColumn,line[15],'New Bike Details: '                    +interview.bikeType+' | New Style: '+interview.bikeNewStyle+' | Budget: '+interview.bikeBudget)
pdf.text(CPlabelColumn,line[16],'Reasons for Purchase: '                +interview.bikeReasons)
pdf.text(CPlabelColumn,line[17],'Type of Purchase: '                    +interview.bikeChannels)
pdf.text(CPlabelColumn,line[18],'Brands or Models Under Consideration: '+interview.bikeBrandsModels)
pdf.text(CPlabelColumn,line[19],'Primary Decision Factors: '            +interview.bikeDecisionFactors)
nextLine=20
  }

if(!interview.objectiveMeasureAndAdvise){
    pdf.text(CPlabelColumn,line[15],'Current Bike Details: '                +interview.bikeType+' | Make: '+interview.bikeMake+' | Model: '+interview.bikeModel+' | Frame Size: '+interview.bikeFrameSize)
    pdf.text(CPlabelColumn,line[16],'Additional Comments: '                 +interview.bikeComments)
nextLine=17
      }
pdf.text(CPlabelColumn,line[nextLine],'Media Permission: '               +interview.mediaConsent)


//footer
pdf.addImage(fksLogo.src, 'JPG', col[4]+4,row[15]+4, 9,9);
const copyrightstring = "Copyright © "+thisYear+" Fit Kit Systems"
pdf.text(copyrightstring,col[5],row[15]+textMidPoint)
//pdf.text('Proper use of recommendations is the sole responsibility of the user.',col[5],row[15]+textMidPoint)


pdf.save('FKS_Prefit_Interview_Summary_'+interview.firstName+'_'+interview.lastName+'_'+new Date(interview.created).toISOString().substring(0,10)+'.pdf')
}



export {
    
    interviewPDF

}