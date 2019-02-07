import mongoose from 'mongoose'
const LogSchema = new mongoose.Schema({

date: {type: Date, default: Date.now},
user: {type: mongoose.Schema.ObjectId, ref: 'User'},
action: String,
description: String,
documentId: {type: mongoose.Schema.ObjectId}
  
})

export default mongoose.model('Log', LogSchema)
