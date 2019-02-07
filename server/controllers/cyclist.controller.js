
import Cyclist from '../models/cyclist.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res, next) => {
  let cyclist = new Cyclist(req.body)
  cyclist.createdBy = req.profile
//  console.log('inside create')
  cyclist.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "Successfully created new cyclist!",
      newCyclistId:result._id
    })
  })
}

/**
 * Load user and append to req.
 */
const cyclistByID = (req, res, next, id) => {
  Cyclist.findById(id).exec((err, cyclist) => {
    if (err || !cyclist)
      return res.status('400').json({
        error: "Cyclist not found"
      })
    req.profile = cyclist
    next()
  })
}

const read = (req, res) => {
  return res.json(req.profile)
}

const list = (req, res) => {
  Cyclist.find((err, cyclists) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(cyclists)
  }).select('cyclistProfile updated created createdBy')
}

const listByUser = (req, res) => {
//  console.log(req.profile)
  Cyclist.find({createdBy: req.profile._id})
 // .populate('comments', 'text created')
//  .populate('comments.postedBy', '_id name')
  .populate('createdBy', '_id name')
  .sort('cyclistProfile.lastName')
  .exec((err, cyclists) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(cyclists)
  })
}


const update = (req, res, next) => {
  let cyclist = req.profile
  cyclist = _.extend(cyclist, req.body)
  cyclist.updated = Date.now()
  cyclist.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }

    res.json(cyclist)
  })
}

const newupdate = (req, res, next) => {
  console.log(req) 
  return res.status(200)
//  let cyclist = req.profile
//  cyclist = _.extend(cyclist, req.body)
//  cyclist.updated = Date.now()
//  cyclist.save((err) => {
//    if (err) {
//      return res.status(400).json({
//        error: errorHandler.getErrorMessage(err)
//      })
//    }

//    res.json(cyclist)
//  })
}

const remove = (req, res, next) => {
  let cyclist = req.profile
  cyclist.remove((err, deletedCyclist) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(deletedCyclist)
  })
}

export default {
  create,
  cyclistByID,
  read,
  list,
  listByUser,
  remove,
  update
}
