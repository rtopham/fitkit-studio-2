import mongoose from 'mongoose'
const DeletedUserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  
  deleted: {
    type: Date,
    default: Date.now
  },

  created: {
    type: Date
  },

  deletedUserId: {type: mongoose.Schema.ObjectId, ref: 'User'},

})


export default mongoose.model('DeletedUser', DeletedUserSchema)
