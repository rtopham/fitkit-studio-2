import mongoose from 'mongoose'
const CyclistSchema = new mongoose.Schema({
  cyclistProfile: {
    firstName: {type: String, trim: true, required: 'First name is required'},
    lastName: {type: String, trim: true, required: 'Last name is required'},
    email: {type: String, trim: true, match: [/.+\@.+\..+/, 'Please fill a valid email address']},
    phone: {type: String, trim: true},
    zipCode: {type: String, trim: true},
    birthDate: {type: Date, required:'Birth date is required'},
    gender: {type: String, required: 'Gender is required'}      
  },
  bodyMeasurements:{
    inseam: {type: Number, default:86},
    footLength: {type: Number, default:25},
    torso: {type: Number, default: 56},
    arm: {type: Number, default:56},
    height: {type: Number, default:183},
    weight: {type: Number, default:68},
    shoulders:{type: Number, default:40},
    sitBones:{type:Number, default:120}
  },
  softScores:{
    flexibility: {type:String, default:'Good'},
    ridingStyle: {type:String, default:'Competitive'},
    preconditions:{type:String,default:'None'}
  },
  bikes:[{make: {type: String, default:''},
          model: {type: String, default:''},
          type: {type:String, default:''},
          frameSize: {type: Number, default:0},
          saddleHeight: {type: Number, default:0},
          stanoverHeight: {type: Number, default:0},
          handlebarWidth: {type: Number, default:0},
          saddleWidth: {type: Number, default:0},
          bikeLength: {type: Number, default:0},
          adjustedBikeLength: {type: Number, default:0}
        }],
  notes:{type: String, default: ''},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  updated: {type: Date, default: Date.now},
  created: {
    type: Date,
    default: Date.now
  }


})


export default mongoose.model('Cyclist', CyclistSchema)
