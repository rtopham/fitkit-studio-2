import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-prefitinterview.js'
import DeletePreFitInterviewModal from './DeletePreFitInterviewModal'
import {recordLogAction} from '../admin/api-admin'

class DeletePreFitInterview extends Component {

  state = {
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }

  deletePreFitInterview = () => {

    const jwt = auth.isAuthenticated()
    remove({userId: jwt.user._id,
      interviewId: this.props.interview._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
//        this.setState({redirect: true})
        const logData={userId:jwt.user._id,action: "deleted pre-fit interview", description: "User "+jwt.user.name+" deleted pre-fit interview of "+this.props.interview.firstName+' '+this.props.interview.lastName+".", documentId:this.props.interview._id}
        recordLogAction(logData)
        this.props.reloadInterviews()
        this.props.changeTabAfterDelete()
        this.setState({open: false})
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
  if (this.state.open){
      return (
          <DeletePreFitInterviewModal interview={this.props.interview} handleRequestClose={this.handleRequestClose} handleDelete={this.deletePreFitInterview}/>
          )
            }
    else return (
    <Button bsStyle="link" bsSize="xsmall" onClick={this.clickButton}><span className="glyphicon glyphicon-trash" aria-label="Delete" aria-hidden="true" > </span></Button>
   )
 }
}
export default DeletePreFitInterview
