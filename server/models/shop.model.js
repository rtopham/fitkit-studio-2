import mongoose from 'mongoose'
const ShopSchema = new mongoose.Schema({

  active: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  address2: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  logo: {
    data: Buffer,
    contentType: String
  },
  owner: {type: mongoose.Schema.ObjectId, ref: 'User'}
  
})

export default mongoose.model('Shop', ShopSchema)
