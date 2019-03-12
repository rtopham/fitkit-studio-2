import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-cyclist.js'
import {Redirect} from 'react-router-dom'
import DeleteCyclistModal from './DeleteCyclistModal'
import {recordLogAction} from '../admin/api-admin'

class DeleteCyclist extends Component {

  state = {
    redirect: false,
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }
  deleteCyclist = () => {

    const jwt = auth.isAuthenticated()
    remove({userId: jwt.user._id,
      cyclistId: this.props.cyclist._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
//        this.setState({redirect: true})
        const logData={userId:jwt.user._id,action: "deleted cyclist", description: "User "+jwt.user.name+" deleted cyclist "+this.props.cyclist.cyclistProfile.firstName+' '+this.props.cyclist.cyclistProfile.lastName+".", documentId:this.props.cyclist._id}
        recordLogAction(logData)
        this.props.reloadCyclists()
        this.setState({open: false})
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/'/>
    }

    if (this.state.open){
      return <div>
        <DeleteCyclistModal cyclist={this.props.cyclist} container={this.props.container} handleRequestClose={this.handleRequestClose} handleDelete={this.deleteCyclist}/>
        <div className="centerthis">
        <Button bsStyle="link" bsSize="xsmall" onClick={this.clickButton}><span className="glyphicon glyphicon-trash" aria-label="Delete" aria-hidden="true" > </span></Button>
        </div>
        </div>
    }
    else return (
     <div className="centerthis">
      <Button bsStyle="link" bsSize="xsmall" onClick={this.clickButton}><span className="glyphicon glyphicon-trash" aria-label="Delete" aria-hidden="true" > </span></Button>
      </div>
    )

  }
}

export default DeleteCyclist
