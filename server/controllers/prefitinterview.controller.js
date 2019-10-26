
import PreFitInterview from '../models/prefitinterview.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res, next) => {
  let prefitinterview = new PreFitInterview(req.body)
  prefitinterview.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "Successfully created new pre-fit interview!",
      newPreFitInterviewId:result._id
    })
  })
}

const listByUser = (req, res) => {
  //  console.log(req.profile)
    PreFitInterview.find({createdForUser: req.profile._id, createdForCyclist: null })
   // .populate('comments', 'text created')
  //  .populate('comments.postedBy', '_id name')
    .populate('createdForUser', '_id name')
    .sort('-created')
    .exec((err, interviews) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(interviews)
    })
  }

  const listByCyclist = (req, res) => {
//      console.log(req)
      PreFitInterview.find({createdForCyclist: req.params.cyclistId})
      .populate('createdForCyclist', '_id name')
      .sort('-created')
      .exec((err, interviews) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        res.json(interviews)
      })
    }


const interviewByID = (req, res, next, id) => {
    PreFitInterview.findById(id).exec((err, interview) => {
      if (err || !interview)
        return res.status('400').json({
          error: "Interview not found"
        })
      req.profile = interview
      next()
    })
  }


  const update = (req, res, next) => {

    let interview = req.profile
    interview = _.extend(interview, req.body)
    interview.save((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
  
      res.json(interview)
    })
  }

  const remove = (req, res, next) => {
    let interview = req.profile
    interview.remove((err, deletedInterview) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(deletedInterview)
    })
  }


/**
 * Load user and append to req.
 */

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



const listByUserSearch = (req, res) => {

let filter={createdBy:req.profile._id}

if (req.query.lastName) filter ={createdBy: req.profile._id,'cyclistProfile.lastName':req.query.lastName}
if (req.query.lastNameRegX) filter ={createdBy: req.profile._id,'cyclistProfile.lastName':{$regex: req.query.lastNameRegX,$options:'i'}}
if (req.query.birthDate&&req.query.birthDate) filter={createdBy: req.profile._id, 'cyclistProfile.lastName':req.query.lastName,'cyclistProfile.birthDate':new Date(req.query.birthDate)}

//console.log(filter)

  Cyclist.find(filter)
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


export default {
  create,
  interviewByID,
  read,
  list,
  listByUser,
  listByCyclist,
  listByUserSearch,
  remove,
  update
}
