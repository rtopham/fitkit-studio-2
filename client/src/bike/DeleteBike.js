import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-bike.js'
import {Redirect} from 'react-router-dom'
import DeleteBikeModal from './DeleteBikeModal'
import {recordLogAction} from '../admin/api-admin'

class DeleteBike extends Component {

  state = {
    redirect: false,
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
    this.props.togglePrinterIcon()
  }
  deleteBike = () => {

    const jwt = auth.isAuthenticated()
    remove({userId: jwt.user._id,
      cyclistId: this.props.cyclistId,
      bikeId: this.props.bike._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
//        this.setState({redirect: true})
        const logData={userId:jwt.user._id,action: "deleted bike", description: "User "+jwt.user.name+" deleted bike "+ this.props.bike.make+" "+this.props.bike.model+" from cyclist "+this.props.cyclistProfile.firstName+' '+this.props.cyclistProfile.lastName+".", documentId:this.props.bike._id}
        recordLogAction(logData)
        this.props.reloadBikes()
        this.props.togglePrinterIcon()
        this.setState({open: false})
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
    this.props.togglePrinterIcon()
  }
  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/'/>
    }

    if (this.state.open){
      return (
        <DeleteBikeModal bike={this.props.bike} handleRequestClose={this.handleRequestClose} handleDelete={this.deleteBike}/>
      )
    }
    else return (
     
      <Button bsStyle="link" bsSize="xsmall" onClick={this.clickButton}><span className="glyphicon glyphicon-trash" aria-label="Delete" aria-hidden="true" > </span></Button>
     
    )

  }
}

export default DeleteBike
