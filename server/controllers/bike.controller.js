
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
  .skip(parseInt(req.query.offset,10))
  .limit(parseInt(req.query.limit,10))
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
  if(req.header('Update-Last-Updated')!='false') bike.updated = Date.now()
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

const removeCyclistBikes = (req, res, next) => {

  Bike.deleteMany({ownedBy: req.params.cyclistId})
   .exec((err, bikes) => {
     if (err) {
       
       return res.status(400).json({
         error: errorHandler.getErrorMessage(err)
       })
     }
     res.json(bikes)
   })
}

const countBikesByUser =  async (req, res, next) => {
  let user = req.profile
  let bikesCreated={today:{},lastSevenDays:{},lastThirtyDays:{},yearToDate:{}}
  let bikesUpdated={today:{},lastSevenDays:{},lastThirtyDays:{},yearToDate:{}}
  let sevenDaysAgo = new Date()
  let thirtyDaysAgo = new Date()
  let todaysDate = new Date()
  todaysDate.setDate(todaysDate.getDate())
  todaysDate.setHours(0,0,0,0)

  sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)
  let beginningOfYear = new Date(new Date().getFullYear(),0,1)
    try{
      let totalBikes = await Bike.countDocuments({
        createdBy: user._id
      })

      let roadBikes= await Bike.countDocuments({
        createdBy: user._id,
        type:'Road Bike'
      })

      let mountainBikes= await Bike.countDocuments({
        createdBy: user._id,
        type:'Mountain Bike'
      })      

      let ttBikes= await Bike.countDocuments({
        createdBy: user._id,
        type:'TT/Tri Bike'
      })

      let gravelBikes= await Bike.countDocuments({
        createdBy: user._id,
        type:'Gravel'
      })

      let cyclocrossBikes= await Bike.countDocuments({
        createdBy: user._id,
        type:'Cyclocross'
      })

      let touringBikes= await Bike.countDocuments({
        createdBy: user._id,
        type:'Touring or Commuting'
      })

      let tandemBikes= await Bike.countDocuments({
        createdBy: user._id,
        type:'Tandem'
      })

      bikesCreated.today.total= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: todaysDate}
      })

      bikesCreated.lastSevenDays.total= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: sevenDaysAgo}
      })

      bikesCreated.lastThirtyDays.total= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: thirtyDaysAgo}
      })

      bikesCreated.yearToDate.total= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: beginningOfYear}
      })

      bikesCreated.today.roadBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: todaysDate},
        type:"Road Bike"
      })

      bikesCreated.lastSevenDays.roadBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: sevenDaysAgo},
        type:"Road Bike"
      })

      bikesCreated.lastThirtyDays.roadBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: thirtyDaysAgo},
        type:'Road Bike'
      })

      bikesCreated.yearToDate.roadBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: beginningOfYear},
        type:'Road Bike'
      })

      bikesCreated.today.mountainBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: todaysDate},
        type:"Mountain Bike"
      })

      bikesCreated.lastSevenDays.mountainBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: sevenDaysAgo},
        type:"Mountain Bike"
      })

      bikesCreated.lastThirtyDays.mountainBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: thirtyDaysAgo},
        type:'Mountain Bike'
      })

      bikesCreated.yearToDate.mountainBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: beginningOfYear},
        type:'Mountain Bike'
      })

      bikesCreated.today.ttBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: todaysDate},
        type:"TT/Tri Bike"
      })

      bikesCreated.lastSevenDays.ttBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: sevenDaysAgo},
        type:"TT/Tri Bike"
      })

      bikesCreated.lastThirtyDays.ttBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: thirtyDaysAgo},
        type:'TT/Tri Bike'
      })

      bikesCreated.yearToDate.ttBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: beginningOfYear},
        type:'TT/Tri Bike'
      })

      bikesCreated.today.gravelBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: todaysDate},
        type:"Gravel"
      })

      bikesCreated.lastSevenDays.gravelBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: sevenDaysAgo},
        type:"Gravel"
      })

      bikesCreated.lastThirtyDays.gravelBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: thirtyDaysAgo},
        type:'Gravel'
      })

      bikesCreated.yearToDate.gravelBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: beginningOfYear},
        type:'Gravel'
      })

      bikesCreated.today.cyclocrossBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: todaysDate},
        type:'Cyclocross'
      })

      bikesCreated.lastSevenDays.cyclocrossBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: sevenDaysAgo},
        type:'Cyclocross'
      })

      bikesCreated.lastThirtyDays.cyclocrossBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: thirtyDaysAgo},
        type:'Cyclocross'
      })

      bikesCreated.yearToDate.cyclocrossBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: beginningOfYear},
        type:'Cyclocross'
      })

      bikesCreated.today.touringBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: todaysDate},
        type:'Touring or Commuting'
      })
      
      bikesCreated.lastSevenDays.touringBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: sevenDaysAgo},
        type:'Touring or Commuting'
      })

      bikesCreated.lastThirtyDays.touringBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: thirtyDaysAgo},
        type:'Touring or Commuting'
      })

      bikesCreated.yearToDate.touringBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: beginningOfYear},
        type:'Touring or Commuting'
      })

      bikesCreated.today.tandemBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: todaysDate},
        type:'Tandem'
      })      

      bikesCreated.lastSevenDays.tandemBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: sevenDaysAgo},
        type:'Tandem'
      })

      bikesCreated.lastThirtyDays.tandemBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: thirtyDaysAgo},
        type:'Tandem'
      })

      bikesCreated.yearToDate.tandemBikes= await Bike.countDocuments({
        createdBy: user._id,
        created: {$gte: beginningOfYear},
        type:'Tandem'
      })

      bikesUpdated.today.roadBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: todaysDate},
        type:"Road Bike"
      })

      bikesUpdated.lastSevenDays.roadBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: sevenDaysAgo},
        type:"Road Bike"
      })

      bikesUpdated.lastThirtyDays.roadBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: thirtyDaysAgo},
        type:'Road Bike'
      })

      bikesUpdated.yearToDate.roadBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: beginningOfYear},
        type:'Road Bike'
      })

      bikesUpdated.today.mountainBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: todaysDate},
        type:"Mountain Bike"
      })

      bikesUpdated.lastSevenDays.mountainBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: sevenDaysAgo},
        type:"Mountain Bike"
      })

      bikesUpdated.lastThirtyDays.mountainBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: thirtyDaysAgo},
        type:'Mountain Bike'
      })

      bikesUpdated.yearToDate.mountainBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: beginningOfYear},
        type:'Mountain Bike'
      })

      bikesUpdated.today.ttBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: todaysDate},
        type:"TT/Tri Bike"
      })

      bikesUpdated.lastSevenDays.ttBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: sevenDaysAgo},
        type:"TT/Tri Bike"
      })

      bikesUpdated.lastThirtyDays.ttBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: thirtyDaysAgo},
        type:'TT/Tri Bike'
      })

      bikesUpdated.yearToDate.ttBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: beginningOfYear},
        type:'TT/Tri Bike'
      })

      bikesUpdated.today.gravelBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: todaysDate},
        type:"Gravel"
      })

      bikesUpdated.lastSevenDays.gravelBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: sevenDaysAgo},
        type:"Gravel"
      })

      bikesUpdated.lastThirtyDays.gravelBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: thirtyDaysAgo},
        type:'Gravel'
      })

      bikesUpdated.yearToDate.gravelBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: beginningOfYear},
        type:'Gravel'
      })

      bikesUpdated.today.cyclocrossBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: todaysDate},
        type:'Cyclocross'
      })

      bikesUpdated.lastSevenDays.cyclocrossBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: sevenDaysAgo},
        type:'Cyclocross'
      })

      bikesUpdated.lastThirtyDays.cyclocrossBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: thirtyDaysAgo},
        type:'Cyclocross'
      })

      bikesUpdated.yearToDate.cyclocrossBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: beginningOfYear},
        type:'Cyclocross'
      })

      bikesUpdated.today.touringBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: todaysDate},
        type:'Touring or Commuting'
      })

      bikesUpdated.lastSevenDays.touringBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: sevenDaysAgo},
        type:'Touring or Commuting'
      })

      bikesUpdated.lastThirtyDays.touringBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: thirtyDaysAgo},
        type:'Touring or Commuting'
      })

      bikesUpdated.yearToDate.touringBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: beginningOfYear},
        type:'Touring or Commuting'
      })

      bikesUpdated.today.tandemBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: todaysDate},
        type:'Tandem'
      })

      bikesUpdated.lastSevenDays.tandemBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: sevenDaysAgo},
        type:'Tandem'
      })

      bikesUpdated.lastThirtyDays.tandemBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: thirtyDaysAgo},
        type:'Tandem'
      })

      bikesUpdated.yearToDate.tandemBikes= await Bike.countDocuments({
        createdBy: user._id,
        updated: {$gte: beginningOfYear},
        type:'Tandem'
      })



      res.json({totalBikes,roadBikes,mountainBikes,ttBikes,gravelBikes,cyclocrossBikes,touringBikes,tandemBikes,bikesCreated,bikesUpdated})
    
  
    } catch (err) {
      res.status(500).json({error:err.message})
    }
  }

export default {
  create,
  bikeByID,
  read,
  list,
  listByUser,
  listByCyclist,
  remove,
  removeCyclistBikes,
  update,
  countBikesByUser
}
