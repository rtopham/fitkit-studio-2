
import Bike from '../models/bike.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res, next) => {
  let bike = new Bike(req.body)
  bike.createdBy = req.params.userId
  bike.ownedBy= req.params.cyclistId
//  console.log(req.params)
//  console.log('inside create')
  bike.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "Successfully created new bike!",
      newBikeId:result._id
    })
  })
}

/**
 * Load user and append to req.
 */
const bikeByID = (req, res, next, id) => {
  Bike.findById(id).exec((err, bike) => {
    if (err || !bike)
      return res.status('400').json({
        error: "Bike not found"
      })
    req.profile = bike
    next()
  })
}

const read = (req, res) => {
  return res.json(req.profile)
}

const list = (req, res) => {
  Bike.find((err, bikes) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(bikes)
  }).select('make model type updated created createdBy')
}

const listByUser = (req, res) => {
//  console.log(req.profile)
  Bike.find({createdBy: req.profile._id})
 // .populate('comments', 'text created')
//  .populate('comments.postedBy', '_id name')
  .populate('createdBy', '_id name')
  .sort('make')
  .exec((err, bikes) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(bikes)
  })
}

const listByCyclist = (req, res) => {
  //  console.log(req.profile)
    Bike.find({ownedBy: req.params.cyclistId})
   // .populate('comments', 'text created')
  //  .populate('comments.postedBy', '_id name')
    .populate('ownedBy', '_id name')
    .sort('created')
    .exec((err, bikes) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(bikes)
    })
  }


const update = (req, res, next) => {
  let bike = req.profile
  bike = _.extend(bike, req.body)
  bike.updated = Date.now()
  bike.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }

    res.json(bike)
  })
}

const remove = (req, res, next) => {
  let bike = req.profile
  bike.remove((err, deletedBike) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(deletedBike)
  })
}

export default {
  create,
  bikeByID,
  read,
  list,
  listByUser,
  listByCyclist,
  remove,
  update
}
