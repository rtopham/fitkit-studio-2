import mongoose from 'mongoose'
const CyclistSchema = new mongoose.Schema({
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  cyclist_profile: {
    firstName: {type: String, trim: true, required: 'First name is required'},
    lastName: {type: String, trim: true, required: 'Last name is required'},
    email: {type: String, trim: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'], required: 'Email is required'},
    phone: {type: String, trim: true, required: 'Phone is required'},
    zipCode: {type: String, trim: true, required: 'Zip Code is required'},
    birthDate: {type: Date, required:'Birth date is required'},
    gender: {type: String, required: 'Gender is required'}      
  },
  body_measurements:{
    inseam: {type: Number, default:86},
    footLength: {type: Number, default:25},
    torso: {type: Number, default: 56},
    arm: {type: Number, default:56},
    height: {type: Number, default:183},
    shoulders:{type: Number, default:40},
    sitBones:{type:Number, default:120}
  },
  soft_scores:{
    flexibility: {type:String, default:'Good'},
    ridingStyle: {type:String, default:'Competitive'},
    preconditions:{type:String,default:'None'}
  },
  notes: String

})


export default mongoose.model('Cyclist', CyclistSchema)
