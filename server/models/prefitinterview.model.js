import mongoose from 'mongoose'
const PreFitInterviewSchema = new mongoose.Schema({

firstName: {type: String, trim: true, required: 'First name is required'},
lastName: {type: String, trim: true, required: 'Last name is required'},
email: {type: String, trim: true, match: [/.+\@.+\..+/, 'Please fill a valid email address']},
phone: {type: String, trim: true},
zipCode: {type: String, trim: true},
birthDate: {type: Date, required:'Birth date is required'},
referralSource: {type: String, trim: true},
referralSourceDetails:{type: String, default:'', trim:true},
gender: {type: String, required: 'Gender is required'},
height: {type: Number, default:0},
weight: {type: Number, default:0},
bikeMake: {type: String, default:''},
bikeModel: {type: String, default:''},
bikeType: {type:String, default:'Road Bike'},
bikeFrameSize: {type: String, default:''},
ridingStyle: {type: String, default:'Competitive'},
yearsCycling:{type: Number, default:0},
hoursPerWeek:{type: Number, default:0},
skillsAndConfidence: {type:String,default:''},
cyclingGoals:{type: String, default:''},
priorBikeFit:{type: Boolean, default:false},
objectiveMeasureAndAdvise:{type:Boolean, default:false},
objectiveSetUp: {type: Boolean, default:false},
objectiveGeneral:{type: Boolean, default:false},
objectiveRelieve:{type: Boolean, default:false},
objectiveImprove:{type: Boolean, default:false},
objectiveReplicate:{type: Boolean, default:false},
objectiveShoe:{type: Boolean, default:false},
objectiveSaddle:{type: Boolean, default:false},
objectiveAero:{type: Boolean, default:false},
objectiveComments:{type: String, default:''},
physicalComments:{type: String, default:''},
discomfortAreas: {type: String, default:''},
otherPhysicalActivities:{type: String, default:''},
bikeComments:{type: String, default:''},
bikeNewStyle: {type: Boolean, default:false},
bikeReasons: {type: String, default: ''},
bikeChannels: {type: String, default:''},
bikeBudget: {type: String, default: ''},
bikeBrandsModels: {type:String, default:''},
bikeDecisionFactors: {type: String, default:''},
mediaConsent:{type: String, default:'No'},
createdForUser: {type: mongoose.Schema.ObjectId, ref: 'User'},
createdForShop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
createdForCyclist:{type: mongoose.Schema.ObjectId, ref: 'Cyclist'},
created: {type: Date, default: Date.now},

})


export default mongoose.model('PreFitInterview', PreFitInterviewSchema)
