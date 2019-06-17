import mongoose from 'mongoose'
const BikeSchema = new mongoose.Schema({


make: {type: String, default:''},
model: {type: String, default:''},
type: {type:String, default:''},
frameSize: {type: Number, default:0},
saddleHeight: {type: Number, default:0},
stanoverHeight: {type: Number, default:0},
handlebarWidth: {type: Number, default:0},
saddleWidth: {type: Number, default:0},
bikeLength: {type: Number, default:0},
notes:{type: String, default: ''},
ownedBy: {type: mongoose.Schema.ObjectId, ref: 'Cyclist'},
createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
updated: {type: Date, default: Date.now},
created: {type: Date, default: Date.now}
})


export default mongoose.model('Bike', BikeSchema)
