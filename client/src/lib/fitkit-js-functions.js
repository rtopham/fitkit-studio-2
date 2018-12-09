/* eslint-disable */

/*
Fit Kit Systems Javascript Functions
Copyright © 2019 Go Bike LLC and Fit Kit Systems.
This software may be used only by authorized licensees. 
*/

//******************************************************************************************************************************************


//Fit Kit Systems Core JavaScript Functions
//These functions accept user input to calculate various outputs based on Fit Kit Systems methodolgy. 

//******************************************************************************************************************************************


export function calculateTorsoLength(sternalnotch, torsolength, inseam){

//Calculates torso length based on sternal notch measurement (if tape measure is used) or based on torso measurement (if fit kit tools are used).
//Note, this function assumes sternal notch value will be zero if fit kit tools are used. Additional form validation may be necessary to avoid erros.
  
  let returntorsolength=0;
  
       if(sternalnotch==0)returntorsolength=torsolength;
  else if(sternalnotch>0)returntorsolength=(sternalnotch-inseam);
  
  return returntorsolength;
  
}

export function calculateSoftScore(age, ridingstyle, flexibility, preconditions){
    
//Calculates soft score based on inputs provided.
//Returns softscore value. 

var softscore =0;
  if(age<40) softscore=softscore+1;
  if(ridingstyle=="Competitive") softscore=softscore+1;
  if(flexibility=="Ankles/Top of Feet"||flexibility=="Good") softscore=softscore+.5;
else if(flexibility=="Toes/Ground"||flexibility=="Excellent") softscore=softscore+1;
  if(preconditions=="None") softscore=softscore+1;
else if(preconditions=="Somenonsurgical"||preconditions=="Yes") softscore=softscore+0;
else if(preconditions=="Lumbarfusion"||preconditions=="Spinal (-1)") softscore=softscore-1;
else if(preconditions=="Cervicalfusion"||preconditions=="Spinal (-2)") softscore=softscore-2;

return softscore;

}

export function calculateUpperBody(torsolength, armlength){

//Calculates upperbody measurement based on torso length and arm length.
//Torsolength must be calculated before calling this function.

var upperbody=0;
upperbody= +torsolength + +armlength;
		 
return upperbody;

}

export function calculateApeFactor(torsolength, armlength){

//Calculates Ape Factor based on torso length and arm length. 
  
 	let armminustorso=armlength-torsolength;
 	let apefactor=0;
  
  	if(armminustorso<4)apefactor=0;
  else if(armminustorso>=4&&armminustorso<=6)apefactor=1;
  else if(armminustorso>6&&armminustorso<=8)apefactor=2;
  
  return apefactor;
  
}

export function calculateSaddleToHandlebarDrop(softscore, apefactor){

// Calculates Handlebar Drop based on softscore and ape factor.
         
  let handlebardrop=softscore+apefactor;
    
    return handlebardrop;
    
}

export function calculateMinimumSaddleWidth(sitbonewidth){
// Calculates Minimum Saddle Width based on sitbonewidth.

	let minsaddlewidth=sitbonewidth+15;	
	return minsaddlewidth;
		
}

export function calculateMaximumSaddleWidth(sitbonewidth){
// Calculates Maximum Saddle Width based on sitbonewidth.

	let maxsaddlewidth=sitbonewidth+25;	
	return maxsaddlewidth;
		
}
  
export function calculateMaximumStandoverHeight(inseam){

// Calculates minimum standover height.
  
    let maxstandoverheight=inseam-2;
    return maxstandoverheight;
    
}
  
export function calculateEffectiveTopTube(toptubeandstem, recommendedstem){

//Calculates Effective Top Tube based on total recommended top tube and stem length and the supplied stem length.	
//Note: This export function assumes the recommended setem length will be provide in centimeters, not milimeters. 
    
    let recommendedtoptube=toptubeandstem-recommendedstem;
    
    return recommendedtoptube;
    
}
  
export function calculateHandlebarWidth(shoulderwidth){
	
//Calculates recommended handlebar width based on shoulderwith in centimeters. 

let returnhandlebarwidth=0;
    
switch (shoulderwidth){
case 34	 :returnhandlebarwidth=34;break;
case 34.5:returnhandlebarwidth=34;break;
case 35	 :returnhandlebarwidth=36;break;
case 35.5:returnhandlebarwidth=36;break;
case 36	 :returnhandlebarwidth=36;break;
case 36.5:returnhandlebarwidth=36;break;
case 37	 :returnhandlebarwidth=38;break;
case 37.5:returnhandlebarwidth=38;break;
case 38	 :returnhandlebarwidth=38;break;
case 38.5:returnhandlebarwidth=38;break;
case 39	 :returnhandlebarwidth=40;break;
case 39.5:returnhandlebarwidth=40;break;
case 40	 :returnhandlebarwidth=40;break;
case 40.5:returnhandlebarwidth=40;break;
case 41	 :returnhandlebarwidth=42;break;
case 41.5:returnhandlebarwidth=42;break;
case 42	 :returnhandlebarwidth=42;break;
case 42.5:returnhandlebarwidth=42;break;
case 43	 :returnhandlebarwidth=42;break;
case 43.5:returnhandlebarwidth=44;break;
case 44	 :returnhandlebarwidth=44;break;
case 44.5:returnhandlebarwidth=44;break;
case 45	 :returnhandlebarwidth=44;break;
case 45.5:returnhandlebarwidth=46;break;
case 46	 :returnhandlebarwidth=46;break;
case 46.5:returnhandlebarwidth=46;break;
case 47	 :returnhandlebarwidth=46;break;
case 47.5:returnhandlebarwidth=46;break;
case 48	 :returnhandlebarwidth=48;break;
case 48.5:returnhandlebarwidth=48;break;
case 49	 :returnhandlebarwidth=48;break;
case 49.5:returnhandlebarwidth=48;break;
case 50	 :returnhandlebarwidth=48;break;        
  }
  
  if(shoulderwidth<34)returnhandlebarwidth=34;
  if(shoulderwidth>50)returnhandlebarwidth=48;
  
  return returnhandlebarwidth;
}

export function calculateFrameSize(inseam) {
  
//Calculates framesize based on provided inseam in centimeters.
 
  let framesize=0;
  
	  if(inseam>=70&&inseam<=70.9){framesize=44.7;}
  else if(inseam>=71&&inseam<=71.9){framesize=45.5;}
  else if(inseam>=72&&inseam<=72.9){framesize=46  ;}
  else if(inseam>=73&&inseam<=73.9){framesize=47  ;}
  else if(inseam>=74&&inseam<=74.9){framesize=48  ;}
  else if(inseam>=75&&inseam<=75.9){framesize=48.5;}
  else if(inseam>=76&&inseam<=76.9){framesize=49.5;}
  else if(inseam>=77&&inseam<=77.9){framesize=50  ;}
  else if(inseam>=78&&inseam<=78.9){framesize=51  ;}
  else if(inseam>=79&&inseam<=79.9){framesize=52  ;}
  else if(inseam>=80&&inseam<=80.9){framesize=52.5;}
  else if(inseam>=81&&inseam<=81.9){framesize=53.5;}
  else if(inseam>=82&&inseam<=82.9){framesize=54  ;}
  else if(inseam>=83&&inseam<=83.9){framesize=54.5;}
  else if(inseam>=84&&inseam<=84.9){framesize=55.5;}
  else if(inseam>=85&&inseam<=85.9){framesize=56  ;}
  else if(inseam>=86&&inseam<=86.9){framesize=56.5;}
  else if(inseam>=87&&inseam<=87.9){framesize=57.5;}
  else if(inseam>=88&&inseam<=88.9){framesize=58  ;}
  else if(inseam>=89&&inseam<=89.9){framesize=58.5;}
  else if(inseam>=90&&inseam<=90.9){framesize=60  ;}
  else if(inseam>=91&&inseam<=91.9){framesize=61  ;}
  else if(inseam>=92&&inseam<=92.9){framesize=61.5;}
  else if(inseam>=93&&inseam<=93.9){framesize=62  ;}
  else if(inseam>=94&&inseam<=94.9){framesize=63  ;}
  else if(inseam>=95&&inseam<=95.9){framesize=64.5;}
  else if(inseam>=96&&inseam<=96.9){framesize=66  ;}
  else if(inseam>=97&&inseam<=97.9){framesize=66.5;}
  else if(inseam>=98&&inseam<=98.9){framesize=67  ;}
  else if(inseam>=99&&inseam<=99.9){framesize=67.5;}
		
  return framesize;
  
}

export function calculateTopTubeStemCombination(upperbody, softscore, handlebartype){
		
//  Determines recommended top tube and stem combination measurement based on upper body measurement in centimeters, softscore and handlebartype. 
//  Returns toptubeandstem combination in centimeters.  
  
  let toptubeandstem=0;
  
  //calculation for drop bar.
  if(handlebartype=="Drop"){
  
	  if(upperbody>=98 &&upperbody<=99.9){toptubeandstem=52.9;}
  else if(upperbody>=100&&upperbody<=101.9){toptubeandstem=54.1;}
  else if(upperbody>=102&&upperbody<=103.9){toptubeandstem=54.8;}
  else if(upperbody>=104&&upperbody<=105.9){toptubeandstem=56.1;}
  else if(upperbody>=106&&upperbody<=107.9){toptubeandstem=56.3;}
  else if(upperbody>=108&&upperbody<=109.9){toptubeandstem=56.5;}
  else if(upperbody>=110&&upperbody<=111.9){toptubeandstem=57.8;}
  else if(upperbody>=112&&upperbody<=113.9){toptubeandstem=58.5;}
  else if(upperbody>=114&&upperbody<=115.9){toptubeandstem=59.7;}
  else if(upperbody>=116&&upperbody<=117.9){toptubeandstem=60.8;}
  else if(upperbody>=118&&upperbody<=119.9){toptubeandstem=62.4;}
  else if(upperbody>=120&&upperbody<=121.9){toptubeandstem=62.9;}
  else if(upperbody>=122&&upperbody<=123.9){toptubeandstem=64.8;}
  else if(upperbody>=124&&upperbody<=125.9){toptubeandstem=66.0;}
  else if(upperbody>=126&&upperbody<=127.9){toptubeandstem=66.6;}
  else if(upperbody>=128&&upperbody<=129.9){toptubeandstem=67.3;}
  else if(upperbody>=130&&upperbody<=131.9){toptubeandstem=68.4;}
  else if(upperbody>=132&&upperbody<=133.9){toptubeandstem=69.1;}
  else if(upperbody>=134&&upperbody<=135.9){toptubeandstem=70.1;}
  else if(upperbody>=136&&upperbody<=137.9){toptubeandstem=70.3;}
  else if(upperbody>=138&&upperbody<=139.9){toptubeandstem=71.0;}
  else if(upperbody>=140&&upperbody<=141.9){toptubeandstem=71.5;}
  else if(upperbody>=142&&upperbody<=143.9){toptubeandstem=73.0;}
	
  }
  
  //calculation for flat bar.
  if(handlebartype=="Flat"){      
	
	   if(upperbody>=100&&upperbody<=101.9){toptubeandstem=57.0;}
  else if(upperbody>=102&&upperbody<=103.9){toptubeandstem=58.0;}
  else if(upperbody>=104&&upperbody<=105.9){toptubeandstem=59.0;}
  else if(upperbody>=106&&upperbody<=107.9){toptubeandstem=60.0;}
  else if(upperbody>=108&&upperbody<=109.9){toptubeandstem=61.0;}
  else if(upperbody>=110&&upperbody<=111.9){toptubeandstem=61.5;}
  else if(upperbody>=112&&upperbody<=113.9){toptubeandstem=62.0;}
  else if(upperbody>=114&&upperbody<=115.9){toptubeandstem=63.5;}
  else if(upperbody>=116&&upperbody<=117.9){toptubeandstem=65.0;}
  else if(upperbody>=118&&upperbody<=119.9){toptubeandstem=66.0;}
  else if(upperbody>=120&&upperbody<=121.9){toptubeandstem=67.0;}
  else if(upperbody>=122&&upperbody<=123.9){toptubeandstem=67.5;}
  else if(upperbody>=124&&upperbody<=125.9){toptubeandstem=68.5;}
  else if(upperbody>=126&&upperbody<=127.9){toptubeandstem=69.5;}
  else if(upperbody>=128&&upperbody<=129.9){toptubeandstem=70.0;}
  else if(upperbody>=130&&upperbody<=131.9){toptubeandstem=70.5;}
  else if(upperbody>=132&&upperbody<=133.9){toptubeandstem=71.0;}
  else if(upperbody>=134&&upperbody<=135.9){toptubeandstem=71.5;}
  else if(upperbody>=136&&upperbody<=137.9){toptubeandstem=71.8;}
  else if(upperbody>=138&&upperbody<=139.9){toptubeandstem=72.5;}
  else if(upperbody>=140&&upperbody<=141.9){toptubeandstem=73.0;}
	
  }
  toptubeandstem=(Math.round(toptubeandstem*2)/2);
  toptubeandstem=toptubeandstem+softscore;
  return toptubeandstem;
}

export function calculateMinimumSaddleHeight(framesize, footlength){
     
//Determines recommended saddle height minimum based on value of framesize and foot length in centimeters.
//Returns minsaddleheight.  

var minsaddleheight=0;
  
switch (framesize){
case 44.7:if(footlength>0&&footlength<=21.4){minsaddleheight=72.5 ;}else if(footlength<=22.4){minsaddleheight=72.5 ;}else if(footlength<=23.4){minsaddleheight=72.5 ;}else if(footlength<=24.4){minsaddleheight=73.0 ;}else if(footlength<=25.4){minsaddleheight=73.0 ;}else if(footlength<100){minsaddleheight=73.5 ;}break;
case 45.5:if(footlength>0&&footlength<=21.7){minsaddleheight=73.2 ;}else if(footlength<=22.7){minsaddleheight=73.2 ;}else if(footlength<=23.7){minsaddleheight=73.2 ;}else if(footlength<=24.7){minsaddleheight=73.4 ;}else if(footlength<=25.7){minsaddleheight=73.6 ;}else if(footlength<100){minsaddleheight=73.9 ;}break;
case 46  :if(footlength>0&&footlength<=21.9){minsaddleheight=73.3 ;}else if(footlength<=22.9){minsaddleheight=73.3 ;}else if(footlength<=23.9){minsaddleheight=73.3 ;}else if(footlength<=24.9){minsaddleheight=73.7 ;}else if(footlength<=25.9){minsaddleheight=73.7 ;}else if(footlength<100){minsaddleheight=74.0 ;}break;
case 47  :if(footlength>0&&footlength<=22.1){minsaddleheight=74.7 ;}else if(footlength<=23.1){minsaddleheight=74.7 ;}else if(footlength<=24.1){minsaddleheight=74.7 ;}else if(footlength<=25.1){minsaddleheight=74.9 ;}else if(footlength<=26.1){minsaddleheight=75.1 ;}else if(footlength<100){minsaddleheight=75.4 ;}break;
case 48  :if(footlength>0&&footlength<=22.4){minsaddleheight=76.0 ;}else if(footlength<=23.4){minsaddleheight=76.0 ;}else if(footlength<=24.4){minsaddleheight=76.0 ;}else if(footlength<=25.4){minsaddleheight=76.2 ;}else if(footlength<=26.4){minsaddleheight=76.4 ;}else if(footlength<100){minsaddleheight=76.7 ;}break;
case 48.5:if(footlength>0&&footlength<=22.6){minsaddleheight=77.4 ;}else if(footlength<=23.6){minsaddleheight=77.4 ;}else if(footlength<=24.6){minsaddleheight=77.4 ;}else if(footlength<=25.6){minsaddleheight=77.6 ;}else if(footlength<=26.6){minsaddleheight=77.9 ;}else if(footlength<100){minsaddleheight=78.2 ;}break;
case 49.5:if(footlength>0&&footlength<=22.8){minsaddleheight=78.7 ;}else if(footlength<=23.8){minsaddleheight=81.6 ;}else if(footlength<=24.8){minsaddleheight=78.7 ;}else if(footlength<=25.8){minsaddleheight=78.9 ;}else if(footlength<=26.8){minsaddleheight=79.6 ;}else if(footlength<100){minsaddleheight=80.0 ;}break;
case 50  :if(footlength>0&&footlength<=23.0){minsaddleheight=80.0 ;}else if(footlength<=24.0){minsaddleheight=80.0 ;}else if(footlength<=25.0){minsaddleheight=80.0 ;}else if(footlength<=26.0){minsaddleheight=80.2 ;}else if(footlength<=27.0){minsaddleheight=80.9 ;}else if(footlength<100){minsaddleheight=81.3 ;}break;
case 51  :if(footlength>0&&footlength<=23.2){minsaddleheight=81.3 ;}else if(footlength<=24.2){minsaddleheight=81.3 ;}else if(footlength<=25.2){minsaddleheight=81.3 ;}else if(footlength<=26.2){minsaddleheight=81.5 ;}else if(footlength<=27.2){minsaddleheight=82.2 ;}else if(footlength<100){minsaddleheight=82.6 ;}break;
case 52  :if(footlength>0&&footlength<=23.4){minsaddleheight=82.7 ;}else if(footlength<=24.4){minsaddleheight=82.7 ;}else if(footlength<=25.4){minsaddleheight=82.7 ;}else if(footlength<=26.4){minsaddleheight=82.9 ;}else if(footlength<=27.4){minsaddleheight=83.6 ;}else if(footlength<100){minsaddleheight=84.0 ;}break;
case 52.5:if(footlength>0&&footlength<=23.6){minsaddleheight=83.8 ;}else if(footlength<=24.6){minsaddleheight=83.8 ;}else if(footlength<=25.6){minsaddleheight=83.8 ;}else if(footlength<=26.6){minsaddleheight=84.0 ;}else if(footlength<=27.7){minsaddleheight=84.7 ;}else if(footlength<100){minsaddleheight=85.1 ;}break;
case 53.5:if(footlength>0&&footlength<=23.9){minsaddleheight=85.2 ;}else if(footlength<=24.9){minsaddleheight=85.2 ;}else if(footlength<=25.9){minsaddleheight=85.2 ;}else if(footlength<=26.9){minsaddleheight=85.4 ;}else if(footlength<=27.9){minsaddleheight=85.4 ;}else if(footlength<100){minsaddleheight=85.4 ;}break;
case 54  :if(footlength>0&&footlength<=24.1){minsaddleheight=86.2 ;}else if(footlength<=25.1){minsaddleheight=86.2 ;}else if(footlength<=26.1){minsaddleheight=86.2 ;}else if(footlength<=27.1){minsaddleheight=86.7 ;}else if(footlength<=28.1){minsaddleheight=87.4 ;}else if(footlength<100){minsaddleheight=87.8 ;}break;
case 54.5:if(footlength>0&&footlength<=24.4){minsaddleheight=87.7 ;}else if(footlength<=25.4){minsaddleheight=87.7 ;}else if(footlength<=26.4){minsaddleheight=87.7 ;}else if(footlength<=27.4){minsaddleheight=87.9 ;}else if(footlength<=28.4){minsaddleheight=88.6 ;}else if(footlength<100){minsaddleheight=89.0 ;}break;
case 55.5:if(footlength>0&&footlength<=24.6){minsaddleheight=89.2 ;}else if(footlength<=25.6){minsaddleheight=89.2 ;}else if(footlength<=26.6){minsaddleheight=89.2 ;}else if(footlength<=27.6){minsaddleheight=89.4 ;}else if(footlength<=28.6){minsaddleheight=90.1 ;}else if(footlength<100){minsaddleheight=90.5 ;}break;
case 56  :if(footlength>0&&footlength<=24.7){minsaddleheight=90.5 ;}else if(footlength<=25.7){minsaddleheight=90.5 ;}else if(footlength<=26.7){minsaddleheight=90.5 ;}else if(footlength<=27.7){minsaddleheight=90.7 ;}else if(footlength<=28.7){minsaddleheight=91.4 ;}else if(footlength<100){minsaddleheight=91.8 ;}break;
case 56.5:if(footlength>0&&footlength<=24.9){minsaddleheight=91.8 ;}else if(footlength<=25.9){minsaddleheight=91.8 ;}else if(footlength<=26.9){minsaddleheight=91.8 ;}else if(footlength<=27.9){minsaddleheight=92.0 ;}else if(footlength<=28.9){minsaddleheight=93.1 ;}else if(footlength<100){minsaddleheight=93.7 ;}break;
case 57.5:if(footlength>0&&footlength<=25.1){minsaddleheight=92.9 ;}else if(footlength<=26.1){minsaddleheight=92.9 ;}else if(footlength<=27.1){minsaddleheight=92.9 ;}else if(footlength<=28.1){minsaddleheight=93.1 ;}else if(footlength<=29.1){minsaddleheight=94.2 ;}else if(footlength<100){minsaddleheight=95.8 ;}break;
case 58  :if(footlength>0&&footlength<=25.7){minsaddleheight=94.3 ;}else if(footlength<=26.7){minsaddleheight=94.3 ;}else if(footlength<=27.7){minsaddleheight=94.3 ;}else if(footlength<=28.7){minsaddleheight=94.5 ;}else if(footlength<=29.7){minsaddleheight=95.6 ;}else if(footlength<100){minsaddleheight=96.2 ;}break;
case 58.5:if(footlength>0&&footlength<=25.9){minsaddleheight=95.5 ;}else if(footlength<=26.9){minsaddleheight=95.5 ;}else if(footlength<=27.9){minsaddleheight=95.5 ;}else if(footlength<=28.9){minsaddleheight=95.8 ;}else if(footlength<=29.9){minsaddleheight=96.9 ;}else if(footlength<100){minsaddleheight=97.5 ;}break;
case 60  :if(footlength>0&&footlength<=26.1){minsaddleheight=97.0 ;}else if(footlength<=27.1){minsaddleheight=97.0 ;}else if(footlength<=28.1){minsaddleheight=97.0 ;}else if(footlength<=29.1){minsaddleheight=97.2 ;}else if(footlength<=30.1){minsaddleheight=98.3 ;}else if(footlength<100){minsaddleheight=98.9 ;}break;
case 61  :if(footlength>0&&footlength<=26.3){minsaddleheight=97.7 ;}else if(footlength<=27.3){minsaddleheight=97.7 ;}else if(footlength<=28.3){minsaddleheight=97.7 ;}else if(footlength<=29.3){minsaddleheight=97.9 ;}else if(footlength<=30.3){minsaddleheight=99.8 ;}else if(footlength<100){minsaddleheight=100.4;}break;
case 61.5:if(footlength>0&&footlength<=26.5){minsaddleheight=98.3 ;}else if(footlength<=27.5){minsaddleheight=98.3 ;}else if(footlength<=28.5){minsaddleheight=98.3 ;}else if(footlength<=29.5){minsaddleheight=98.5 ;}else if(footlength<=30.5){minsaddleheight=99.6 ;}else if(footlength<100){minsaddleheight=100.2;}break;
case 62  :if(footlength>0&&footlength<=26.7){minsaddleheight=98.7 ;}else if(footlength<=27.7){minsaddleheight=98.7 ;}else if(footlength<=28.7){minsaddleheight=98.7 ;}else if(footlength<=29.7){minsaddleheight=98.9 ;}else if(footlength<=30.7){minsaddleheight=100.0;}else if(footlength<100){minsaddleheight=100.6;}break;
case 63  :if(footlength>0&&footlength<=27.0){minsaddleheight=99.5 ;}else if(footlength<=28.0){minsaddleheight=99.6 ;}else if(footlength<=29.0){minsaddleheight=100.0;}else if(footlength<=30.0){minsaddleheight=100.4;}else if(footlength<=31.0){minsaddleheight=101.0;}else if(footlength<100){minsaddleheight=101.7;}break;
case 64.5:if(footlength>0&&footlength<=27.2){minsaddleheight=102.1;}else if(footlength<=28.2){minsaddleheight=102.3;}else if(footlength<=29.2){minsaddleheight=102.3;}else if(footlength<=30.2){minsaddleheight=103.4;}else if(footlength<=31.2){minsaddleheight=104.0;}else if(footlength<100){minsaddleheight=104.0;}break;
case 66  :if(footlength>0&&footlength<=27.4){minsaddleheight=103.3;}else if(footlength<=28.4){minsaddleheight=103.4;}else if(footlength<=29.4){minsaddleheight=103.5;}else if(footlength<=30.4){minsaddleheight=103.5;}else if(footlength<=31.4){minsaddleheight=104.6;}else if(footlength<100){minsaddleheight=105.2;}break;
case 66.5:if(footlength>0&&footlength<=27.6){minsaddleheight=104.5;}else if(footlength<=28.6){minsaddleheight=104.6;}else if(footlength<=29.6){minsaddleheight=104.7;}else if(footlength<=30.6){minsaddleheight=104.7;}else if(footlength<=31.6){minsaddleheight=105.8;}else if(footlength<100){minsaddleheight=106.4;}break;
case 67  :if(footlength>0&&footlength<=27.8){minsaddleheight=105.6;}else if(footlength<=28.8){minsaddleheight=105.8;}else if(footlength<=29.8){minsaddleheight=105.9;}else if(footlength<=30.8){minsaddleheight=105.9;}else if(footlength<=31.8){minsaddleheight=106.1;}else if(footlength<100){minsaddleheight=106.5;}break;
case 67.5:if(footlength>0&&footlength<=28.0){minsaddleheight=106.5;}else if(footlength<=29.0){minsaddleheight=106.6;}else if(footlength<=29.9){minsaddleheight=106.9;}else if(footlength<=30.9){minsaddleheight=106.9;}else if(footlength<=31.8){minsaddleheight=107.1;}else if(footlength<100){minsaddleheight=107.5;}break;
}
  
  return minsaddleheight;
}

export function calculateMaximumSaddleHeight(framesize, footlength){
 
//Determines recommended saddle height maximum based on value of framesize and foot length in centimeters.
//Returns maxsaddleheight. 

let maxsaddleheight=0;
  
switch (framesize){
case 44.7:if(footlength>0&&footlength<=21.4){maxsaddleheight=75.4 ;}else if(footlength<=22.4){maxsaddleheight=75.7 ;}else if(footlength<=23.4){maxsaddleheight=76.0 ;}else if(footlength<=24.4){maxsaddleheight=76.3 ;}else if(footlength<=25.4){maxsaddleheight=76.5 ;}else if(footlength<100){maxsaddleheight=77.0 ;}break;
case 45.5:if(footlength>0&&footlength<=21.7){maxsaddleheight=76.1 ;}else if(footlength<=22.7){maxsaddleheight=76.4 ;}else if(footlength<=23.7){maxsaddleheight=76.7 ;}else if(footlength<=24.7){maxsaddleheight=76.9 ;}else if(footlength<=25.7){maxsaddleheight=77.1 ;}else if(footlength<100){maxsaddleheight=77.4 ;}break;
case 46  :if(footlength>0&&footlength<=21.9){maxsaddleheight=76.6 ;}else if(footlength<=22.9){maxsaddleheight=76.9 ;}else if(footlength<=23.9){maxsaddleheight=77.2 ;}else if(footlength<=24.9){maxsaddleheight=77.5 ;}else if(footlength<=25.9){maxsaddleheight=77.8 ;}else if(footlength<100){maxsaddleheight=78.1 ;}break;
case 47  :if(footlength>0&&footlength<=22.1){maxsaddleheight=77.5 ;}else if(footlength<=23.1){maxsaddleheight=77.8 ;}else if(footlength<=24.1){maxsaddleheight=78.1 ;}else if(footlength<=25.1){maxsaddleheight=78.4 ;}else if(footlength<=26.1){maxsaddleheight=78.7 ;}else if(footlength<100){maxsaddleheight=79.1 ;}break;
case 48  :if(footlength>0&&footlength<=22.4){maxsaddleheight=76.8 ;}else if(footlength<=23.4){maxsaddleheight=79.1 ;}else if(footlength<=24.4){maxsaddleheight=79.4 ;}else if(footlength<=25.4){maxsaddleheight=79.7 ;}else if(footlength<=26.4){maxsaddleheight=79.9 ;}else if(footlength<100){maxsaddleheight=80.2 ;}break;
case 48.5:if(footlength>0&&footlength<=22.6){maxsaddleheight=79.6 ;}else if(footlength<=23.6){maxsaddleheight=79.9 ;}else if(footlength<=24.6){maxsaddleheight=80.2 ;}else if(footlength<=25.6){maxsaddleheight=80.5 ;}else if(footlength<=26.6){maxsaddleheight=80.8 ;}else if(footlength<100){maxsaddleheight=81.1 ;}break;
case 49.5:if(footlength>0&&footlength<=22.8){maxsaddleheight=81.6 ;}else if(footlength<=23.8){maxsaddleheight=81.9 ;}else if(footlength<=24.8){maxsaddleheight=81.9 ;}else if(footlength<=25.8){maxsaddleheight=82.2 ;}else if(footlength<=26.8){maxsaddleheight=82.5 ;}else if(footlength<100){maxsaddleheight=83.2 ;}break;
case 50  :if(footlength>0&&footlength<=23.0){maxsaddleheight=82.6 ;}else if(footlength<=24.0){maxsaddleheight=82.9 ;}else if(footlength<=25.0){maxsaddleheight=83.2 ;}else if(footlength<=26.0){maxsaddleheight=83.5 ;}else if(footlength<=27.0){maxsaddleheight=83.9 ;}else if(footlength<100){maxsaddleheight=84.5 ;}break;
case 51  :if(footlength>0&&footlength<=23.2){maxsaddleheight=83.2 ;}else if(footlength<=24.2){maxsaddleheight=83.5 ;}else if(footlength<=25.2){maxsaddleheight=83.8 ;}else if(footlength<=26.2){maxsaddleheight=84.1 ;}else if(footlength<=27.2){maxsaddleheight=84.8 ;}else if(footlength<100){maxsaddleheight=85.2 ;}break;
case 52  :if(footlength>0&&footlength<=23.4){maxsaddleheight=84.4 ;}else if(footlength<=24.4){maxsaddleheight=84.7 ;}else if(footlength<=25.4){maxsaddleheight=85.3 ;}else if(footlength<=26.4){maxsaddleheight=85.6 ;}else if(footlength<=27.4){maxsaddleheight=86.0 ;}else if(footlength<100){maxsaddleheight=86.4 ;}break;
case 52.5:if(footlength>0&&footlength<=23.6){maxsaddleheight=85.2 ;}else if(footlength<=24.6){maxsaddleheight=85.7 ;}else if(footlength<=25.6){maxsaddleheight=86.0 ;}else if(footlength<=26.6){maxsaddleheight=86.3 ;}else if(footlength<=27.7){maxsaddleheight=87.0 ;}else if(footlength<100){maxsaddleheight=87.4 ;}break;
case 53.5:if(footlength>0&&footlength<=23.9){maxsaddleheight=86.7 ;}else if(footlength<=24.9){maxsaddleheight=87.0 ;}else if(footlength<=25.9){maxsaddleheight=87.3 ;}else if(footlength<=26.9){maxsaddleheight=87.6 ;}else if(footlength<=27.9){maxsaddleheight=87.6 ;}else if(footlength<100){maxsaddleheight=88.3 ;}break;
case 54  :if(footlength>0&&footlength<=24.1){maxsaddleheight=87.9 ;}else if(footlength<=25.1){maxsaddleheight=87.9 ;}else if(footlength<=26.1){maxsaddleheight=88.5 ;}else if(footlength<=27.1){maxsaddleheight=88.8 ;}else if(footlength<=28.1){maxsaddleheight=89.5 ;}else if(footlength<100){maxsaddleheight=89.9 ;}break;
case 54.5:if(footlength>0&&footlength<=24.4){maxsaddleheight=89.1 ;}else if(footlength<=25.4){maxsaddleheight=89.4 ;}else if(footlength<=26.4){maxsaddleheight=89.7 ;}else if(footlength<=27.4){maxsaddleheight=90.0 ;}else if(footlength<=28.4){maxsaddleheight=90.7 ;}else if(footlength<100){maxsaddleheight=91.1 ;}break;
case 55.5:if(footlength>0&&footlength<=24.6){maxsaddleheight=90.6 ;}else if(footlength<=25.6){maxsaddleheight=90.9 ;}else if(footlength<=26.6){maxsaddleheight=91.2 ;}else if(footlength<=27.6){maxsaddleheight=91.5 ;}else if(footlength<=28.6){maxsaddleheight=92.2 ;}else if(footlength<100){maxsaddleheight=92.6 ;}break;
case 56  :if(footlength>0&&footlength<=24.7){maxsaddleheight=91.9 ;}else if(footlength<=25.7){maxsaddleheight=92.2 ;}else if(footlength<=26.7){maxsaddleheight=92.5 ;}else if(footlength<=27.7){maxsaddleheight=92.8 ;}else if(footlength<=28.7){maxsaddleheight=93.5 ;}else if(footlength<100){maxsaddleheight=93.9 ;}break;
case 56.5:if(footlength>0&&footlength<=24.9){maxsaddleheight=93.3 ;}else if(footlength<=25.9){maxsaddleheight=93.6 ;}else if(footlength<=26.9){maxsaddleheight=93.9 ;}else if(footlength<=27.9){maxsaddleheight=94.2 ;}else if(footlength<=28.9){maxsaddleheight=95.3 ;}else if(footlength<100){maxsaddleheight=95.9 ;}break;
case 57.5:if(footlength>0&&footlength<=25.1){maxsaddleheight=94.4 ;}else if(footlength<=26.1){maxsaddleheight=94.7 ;}else if(footlength<=27.1){maxsaddleheight=95.0 ;}else if(footlength<=28.1){maxsaddleheight=95.3 ;}else if(footlength<=29.1){maxsaddleheight=96.4 ;}else if(footlength<100){maxsaddleheight=97.0 ;}break;
case 58  :if(footlength>0&&footlength<=25.7){maxsaddleheight=95.3 ;}else if(footlength<=26.7){maxsaddleheight=95.6 ;}else if(footlength<=27.7){maxsaddleheight=95.9 ;}else if(footlength<=28.7){maxsaddleheight=96.2 ;}else if(footlength<=29.7){maxsaddleheight=97.3 ;}else if(footlength<100){maxsaddleheight=97.9 ;}break;
case 58.5:if(footlength>0&&footlength<=25.9){maxsaddleheight=96.6 ;}else if(footlength<=26.9){maxsaddleheight=96.9 ;}else if(footlength<=27.9){maxsaddleheight=97.2 ;}else if(footlength<=28.9){maxsaddleheight=97.5 ;}else if(footlength<=29.9){maxsaddleheight=98.6 ;}else if(footlength<100){maxsaddleheight=99.2 ;}break;
case 60  :if(footlength>0&&footlength<=26.1){maxsaddleheight=98   ;}else if(footlength<=27.1){maxsaddleheight=98.3 ;}else if(footlength<=28.1){maxsaddleheight=98.6 ;}else if(footlength<=29.1){maxsaddleheight=98.9 ;}else if(footlength<=30.1){maxsaddleheight=100.0;}else if(footlength<100){maxsaddleheight=100.6;}break;
case 61  :if(footlength>0&&footlength<=26.3){maxsaddleheight=98.7 ;}else if(footlength<=27.3){maxsaddleheight=99.0 ;}else if(footlength<=28.3){maxsaddleheight=99.3 ;}else if(footlength<=29.3){maxsaddleheight=99.6 ;}else if(footlength<=30.3){maxsaddleheight=100.2;}else if(footlength<100){maxsaddleheight=100.6;}break;
case 61.5:if(footlength>0&&footlength<=26.5){maxsaddleheight=98.8 ;}else if(footlength<=27.5){maxsaddleheight=99.1 ;}else if(footlength<=28.5){maxsaddleheight=99.4 ;}else if(footlength<=29.5){maxsaddleheight=99.7 ;}else if(footlength<=30.5){maxsaddleheight=100.8;}else if(footlength<100){maxsaddleheight=101.4;}break;
case 62  :if(footlength>0&&footlength<=26.7){maxsaddleheight=99.3 ;}else if(footlength<=27.7){maxsaddleheight=99.5 ;}else if(footlength<=28.7){maxsaddleheight=99.8 ;}else if(footlength<=29.7){maxsaddleheight=100.1;}else if(footlength<=30.7){maxsaddleheight=101.2;}else if(footlength<100){maxsaddleheight=101.8;}break;
case 63  :if(footlength>0&&footlength<=27.0){maxsaddleheight=100.9;}else if(footlength<=28.0){maxsaddleheight=101.1;}else if(footlength<=29.0){maxsaddleheight=101.0;}else if(footlength<=30.0){maxsaddleheight=101.7;}else if(footlength<=31.0){maxsaddleheight=102.5;}else if(footlength<100){maxsaddleheight=103.1;}break;
case 64.5:if(footlength>0&&footlength<=27.2){maxsaddleheight=102.9;}else if(footlength<=28.2){maxsaddleheight=103.3;}else if(footlength<=29.2){maxsaddleheight=103.5;}else if(footlength<=30.2){maxsaddleheight=104.6;}else if(footlength<=31.2){maxsaddleheight=105.2;}else if(footlength<100){maxsaddleheight=105.2;}break;
case 66  :if(footlength>0&&footlength<=27.4){maxsaddleheight=104.1;}else if(footlength<=28.4){maxsaddleheight=104.3;}else if(footlength<=29.4){maxsaddleheight=104.5;}else if(footlength<=30.4){maxsaddleheight=104.7;}else if(footlength<=31.4){maxsaddleheight=105.8;}else if(footlength<100){maxsaddleheight=106.4;}break;
case 66.5:if(footlength>0&&footlength<=27.6){maxsaddleheight=105.4;}else if(footlength<=28.6){maxsaddleheight=105.5;}else if(footlength<=29.6){maxsaddleheight=105.7;}else if(footlength<=30.6){maxsaddleheight=106.4;}else if(footlength<=31.6){maxsaddleheight=107.0;}else if(footlength<100){maxsaddleheight=107.6;}break;
case 67  :if(footlength>0&&footlength<=27.8){maxsaddleheight=106.5;}else if(footlength<=28.8){maxsaddleheight=106.6;}else if(footlength<=29.8){maxsaddleheight=106.8;}else if(footlength<=30.8){maxsaddleheight=107.2;}else if(footlength<=31.8){maxsaddleheight=107.8;}else if(footlength<100){maxsaddleheight=108.1;}break;
case 67.5:if(footlength>0&&footlength<=28.0){maxsaddleheight=107.4;}else if(footlength<=29.0){maxsaddleheight=107.5;}else if(footlength<=29.9){maxsaddleheight=107.8;}else if(footlength<=30.9){maxsaddleheight=108.2;}else if(footlength<=31.8){maxsaddleheight=108.8;}else if(footlength<100){maxsaddleheight=109.2;}break;
}
	return maxsaddleheight;
}

export function calculateSeatTubeAngle(inseam, lowerleglength){ 
    
//  Determines recommended seat tube angle based on inseam and lower leg length in centimeters. 
//  Returns seattubeangle in degrees.  

var seattubeangle=0;
var rinseam=Math.round(inseam);

//round lowerleglength to nearest .5 by rounding twice the value and dividing by two.
var rlowerleglength=Math.round(lowerleglength*2);
rlowerleglength=rlowerleglength/2;

switch (rlowerleglength){
case 35.5:if(rinseam<=70){seattubeangle=74;}  else if(rinseam>70) {seattubeangle=72;}break;
case 36  :if(rinseam<=72){seattubeangle=74;}  else if(rinseam>72) {seattubeangle=72;}break;
case 36.5:if(rinseam<=73){seattubeangle=74;}  else if(rinseam>73) {seattubeangle=72;}break;
case 37  :if(rinseam<=70){seattubeangle=74.5;}else if(rinseam==71){seattubeangle=74;}  else if(rinseam==72){seattubeangle=74;}  else if(rinseam==73){seattubeangle=74;}  else if(rinseam>=74){seattubeangle=72;}break;
case 37.5:if(rinseam<=70){seattubeangle=75.5;}else if(rinseam==71){seattubeangle=74.5;}else if(rinseam==72){seattubeangle=74;}  else if(rinseam==73){seattubeangle=74;}  else if(rinseam>=75){seattubeangle=72;}break;
case 38  :if(rinseam<=70){seattubeangle=76;}  else if(rinseam==71){seattubeangle=75;}  else if(rinseam==72){seattubeangle=74;}  else if(rinseam==73){seattubeangle=74;}  else if(rinseam==74){seattubeangle=74;}  else if(rinseam==75){seattubeangle=73.5;}else if(rinseam>=76){seattubeangle=72;}break;
case 38.5:if(rinseam<=71){seattubeangle=76;}  else if(rinseam==72){seattubeangle=74;}  else if(rinseam==73){seattubeangle=74;}  else if(rinseam==74){seattubeangle=74;}  else if(rinseam==75){seattubeangle=74;}  else if(rinseam==76){seattubeangle=73.5;}else if(rinseam>=77){seattubeangle=72;}break;
case 39  :if(rinseam<=71){seattubeangle=76;}  else if(rinseam==72){seattubeangle=75;}  else if(rinseam==73){seattubeangle=74;}  else if(rinseam==74){seattubeangle=74.5;}else if(rinseam==75){seattubeangle=74;}  else if(rinseam==76){seattubeangle=74;}  else if(rinseam==77){seattubeangle=73;}  else if(rinseam>=78){seattubeangle=72;}break;
case 39.5:if(rinseam<=71){seattubeangle=76;}  else if(rinseam==72){seattubeangle=75.5;}else if(rinseam==73){seattubeangle=75;}  else if(rinseam==74){seattubeangle=74;}  else if(rinseam==75){seattubeangle=74.5;}else if(rinseam==76){seattubeangle=74;}  else if(rinseam==77){seattubeangle=73.5;}else if(rinseam==78){seattubeangle=73;}  else if(rinseam>=79) {seattubeangle=72;}break;
case 40  :if(rinseam<=72){seattubeangle=76;}  else if(rinseam==73){seattubeangle=75;}  else if(rinseam==74){seattubeangle=75;}  else if(rinseam==75){seattubeangle=74;}  else if(rinseam==76){seattubeangle=74;}  else if(rinseam==77){seattubeangle=73.5;}else if(rinseam==78){seattubeangle=73.5;}else if(rinseam==79){seattubeangle=73;}  else if(rinseam>=80) {seattubeangle=72;}break;
case 40.5:if(rinseam<=73){seattubeangle=76;}  else if(rinseam==74){seattubeangle=75;}  else if(rinseam==75){seattubeangle=74.5;}else if(rinseam==76){seattubeangle=74.5;}else if(rinseam==77){seattubeangle=74;}  else if(rinseam==78){seattubeangle=73.5;}else if(rinseam==79){seattubeangle=73.5;}else if(rinseam==80){seattubeangle=73;}  else if(rinseam>=81) {seattubeangle=72;}break;
case 41  :if(rinseam<=74){seattubeangle=76;}  else if(rinseam==75){seattubeangle=75;}  else if(rinseam==76){seattubeangle=74.5;}else if(rinseam==77){seattubeangle=74;}  else if(rinseam==78){seattubeangle=74.5;}else if(rinseam==79){seattubeangle=73.5;}else if(rinseam==80){seattubeangle=73.5;}else if(rinseam==81){seattubeangle=73;}  else if(rinseam>=82) {seattubeangle=72;}break;
case 41.5:if(rinseam<=75){seattubeangle=76;}  else if(rinseam==76){seattubeangle=74.5;}else if(rinseam==77){seattubeangle=74.5;}else if(rinseam==78){seattubeangle=74;}  else if(rinseam==79){seattubeangle=74;}  else if(rinseam==80){seattubeangle=73.5;}else if(rinseam==81){seattubeangle=73.5;}else if(rinseam==82){seattubeangle=73;}  else if(rinseam>=83) {seattubeangle=72;}break;
case 42  :if(rinseam<=76){seattubeangle=76;}  else if(rinseam==77){seattubeangle=75;}  else if(rinseam==78){seattubeangle=74.5;}else if(rinseam==79){seattubeangle=74;}  else if(rinseam==80){seattubeangle=74;}  else if(rinseam==81){seattubeangle=73.5;}else if(rinseam==82){seattubeangle=72.5;}else if(rinseam==83){seattubeangle=72.5;}else if(rinseam>=84) {seattubeangle=72;}break;
case 42.5:if(rinseam<=77){seattubeangle=76;}  else if(rinseam==78){seattubeangle=75;}  else if(rinseam==79){seattubeangle=74.5;}else if(rinseam==80){seattubeangle=74;}  else if(rinseam==81){seattubeangle=74;}  else if(rinseam==82){seattubeangle=73;}  else if(rinseam==83){seattubeangle=72.5;}else if(rinseam==84){seattubeangle=72.5;}else if(rinseam>=85) {seattubeangle=72;}break;
case 43  :if(rinseam<=78){seattubeangle=76;}  else if(rinseam==79){seattubeangle=75;}  else if(rinseam==80){seattubeangle=74.5;}else if(rinseam==81){seattubeangle=74;}  else if(rinseam==82){seattubeangle=73;}  else if(rinseam==83){seattubeangle=73;}  else if(rinseam==84){seattubeangle=72.5;}else if(rinseam==85){seattubeangle=72.5;}else if(rinseam>=86) {seattubeangle=72;}break;
case 43.5:if(rinseam<=79){seattubeangle=76;}  else if(rinseam==80){seattubeangle=75;}  else if(rinseam==81){seattubeangle=74.5;}else if(rinseam==82){seattubeangle=73.5;}else if(rinseam==83){seattubeangle=73;}  else if(rinseam==84){seattubeangle=73;}  else if(rinseam==85){seattubeangle=72.5;}else if(rinseam==86){seattubeangle=72.5;}else if(rinseam>=87) {seattubeangle=72;}break;
case 44  :if(rinseam<=79){seattubeangle=76;}  else if(rinseam==80){seattubeangle=75;}  else if(rinseam==81){seattubeangle=75;}  else if(rinseam==82){seattubeangle=74.5;}else if(rinseam==83){seattubeangle=73.5;}else if(rinseam==84){seattubeangle=73;}  else if(rinseam==85){seattubeangle=73;}  else if(rinseam==86){seattubeangle=72.5;}else if(rinseam==87) {seattubeangle=72.5;}else if(rinseam>=88) {seattubeangle=72;}break;
case 44.5:if(rinseam<=80){seattubeangle=76;}  else if(rinseam==81){seattubeangle=75;}  else if(rinseam==82){seattubeangle=75;}  else if(rinseam==83){seattubeangle=74.5;}else if(rinseam==84){seattubeangle=73.5;}else if(rinseam==85){seattubeangle=73;}  else if(rinseam==86){seattubeangle=73;}  else if(rinseam==87){seattubeangle=72.5;}else if(rinseam==88) {seattubeangle=72.5;}else if(rinseam>=89) {seattubeangle=72;}break;
case 45  :if(rinseam<=81){seattubeangle=76;}  else if(rinseam==82){seattubeangle=75;}  else if(rinseam==83){seattubeangle=75;}  else if(rinseam==84){seattubeangle=74.5;}else if(rinseam==85){seattubeangle=73.5;}else if(rinseam==86){seattubeangle=73;}  else if(rinseam==87){seattubeangle=73;}  else if(rinseam==88){seattubeangle=72.5;}else if(rinseam==89) {seattubeangle=72.5;}else if(rinseam>=90) {seattubeangle=72;}break;
case 45.5:if(rinseam<=82){seattubeangle=76;}  else if(rinseam==83){seattubeangle=75;}  else if(rinseam==84){seattubeangle=75;}  else if(rinseam==85){seattubeangle=74.5;}else if(rinseam==86){seattubeangle=73.5;}else if(rinseam==87){seattubeangle=73;}  else if(rinseam==88){seattubeangle=73;}  else if(rinseam==89){seattubeangle=72.5;}else if(rinseam==90) {seattubeangle=72.5;}else if(rinseam>=91) {seattubeangle=72;}break;
case 46  :if(rinseam<=83){seattubeangle=76;}  else if(rinseam==84){seattubeangle=75;}  else if(rinseam==85){seattubeangle=75;}  else if(rinseam==86){seattubeangle=74;}  else if(rinseam==87){seattubeangle=73.5;}else if(rinseam==88){seattubeangle=73;}  else if(rinseam==89){seattubeangle=73;}  else if(rinseam==90){seattubeangle=72.5;}else if(rinseam>=91) {seattubeangle=72;}break;                  
case 46.5:if(rinseam<=84){seattubeangle=76;}  else if(rinseam==85){seattubeangle=75;}  else if(rinseam==86){seattubeangle=75;}  else if(rinseam==87){seattubeangle=74;}  else if(rinseam==88){seattubeangle=73.5;}else if(rinseam==89){seattubeangle=73.5;}else if(rinseam==90){seattubeangle=73;}  else if(rinseam==91){seattubeangle=72.5;}else if(rinseam>=92) {seattubeangle=72;}break;                  
case 47  :if(rinseam<=85){seattubeangle=76;}  else if(rinseam==86){seattubeangle=75;}  else if(rinseam==87){seattubeangle=74.5;}else if(rinseam==88){seattubeangle=74;}  else if(rinseam==89){seattubeangle=73.5;}else if(rinseam==90){seattubeangle=73;}  else if(rinseam==91){seattubeangle=73;}  else if(rinseam==92){seattubeangle=72.5;}else if(rinseam>=93) {seattubeangle=72;}break;                  
case 47.5:if(rinseam<=86){seattubeangle=76;}  else if(rinseam==87){seattubeangle=75;}  else if(rinseam==88){seattubeangle=74.5;}else if(rinseam==89){seattubeangle=74;}  else if(rinseam==90){seattubeangle=73.5;}else if(rinseam==91){seattubeangle=73;}  else if(rinseam==92){seattubeangle=73;}  else if(rinseam==93){seattubeangle=72.5;}else if(rinseam>=94) {seattubeangle=72;}break;                  
case 48  :if(rinseam<=87){seattubeangle=76;}  else if(rinseam==88){seattubeangle=75;}  else if(rinseam==89){seattubeangle=74.5;}else if(rinseam==90){seattubeangle=74;}  else if(rinseam==91){seattubeangle=73.5;}else if(rinseam==92){seattubeangle=73;}  else if(rinseam==93){seattubeangle=73;}  else if(rinseam==94){seattubeangle=72.5;}else if(rinseam>=95) {seattubeangle=72;}break;                  
case 48.5:if(rinseam<=88){seattubeangle=76;}  else if(rinseam==89){seattubeangle=75;}  else if(rinseam==90){seattubeangle=74.5;}else if(rinseam==91){seattubeangle=74;}  else if(rinseam==92){seattubeangle=73.5;}else if(rinseam==93){seattubeangle=73;}  else if(rinseam==94){seattubeangle=73;}  else if(rinseam==95){seattubeangle=72.5;}else if(rinseam>=96) {seattubeangle=72;}break;                  
case 49  :if(rinseam<=89){seattubeangle=76;}  else if(rinseam==90){seattubeangle=75;}  else if(rinseam==91){seattubeangle=74.5;}else if(rinseam==92){seattubeangle=74;}  else if(rinseam==93){seattubeangle=73.5;}else if(rinseam==94){seattubeangle=73;}  else if(rinseam==95){seattubeangle=73;}  else if(rinseam==96){seattubeangle=72.5;}else if(rinseam>=97) {seattubeangle=72;}break;                  
case 49.5:if(rinseam<=89){seattubeangle=76;}  else if(rinseam==90){seattubeangle=75;}  else if(rinseam==91){seattubeangle=75;}  else if(rinseam==92){seattubeangle=74.5;}else if(rinseam==93){seattubeangle=74;}  else if(rinseam==94){seattubeangle=73.5;}else if(rinseam==95){seattubeangle=73;}  else if(rinseam==96){seattubeangle=73;}  else if(rinseam==97) {seattubeangle=72.5;}else if(rinseam>=98) {seattubeangle=72;}break;
case 50  :if(rinseam<=90){seattubeangle=76;}  else if(rinseam==91){seattubeangle=75;}  else if(rinseam==92){seattubeangle=75;}  else if(rinseam==93){seattubeangle=74.5;}else if(rinseam==94){seattubeangle=74;}  else if(rinseam==95){seattubeangle=73.5;}else if(rinseam==96){seattubeangle=73;}  else if(rinseam==97){seattubeangle=72.5;}else if(rinseam==98) {seattubeangle=72.5;}else if(rinseam>=99) {seattubeangle=72;}break;
case 50.5:if(rinseam<=91){seattubeangle=76;}  else if(rinseam==92){seattubeangle=75;}  else if(rinseam==93){seattubeangle=75;}  else if(rinseam==94){seattubeangle=74.5;}else if(rinseam==95){seattubeangle=74;}  else if(rinseam==96){seattubeangle=73.5;}else if(rinseam==97){seattubeangle=73;}  else if(rinseam==98){seattubeangle=72.5;}else if(rinseam==99) {seattubeangle=72.5;}else if(rinseam>=100){seattubeangle=72;}break;
case 51  :if(rinseam<=92){seattubeangle=76;}  else if(rinseam==93){seattubeangle=75;}  else if(rinseam==94){seattubeangle=75;}  else if(rinseam==95){seattubeangle=74.5;}else if(rinseam==96){seattubeangle=74;}  else if(rinseam==97){seattubeangle=73.5;}else if(rinseam==98){seattubeangle=73;}  else if(rinseam==99){seattubeangle=72.5;}else if(rinseam>=100){seattubeangle=72;}break;
}
    
    return seattubeangle;
}