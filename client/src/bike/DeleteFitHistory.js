import React, {Component} from 'react'
import {Button, Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap'
import DeleteFitHistoryModal from './DeleteFitHistoryModal'

class DeleteFitHistory extends Component {

  state = {
    redirect: false,
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
    
  }


handleDelete=()=>{

  this.props.deleteFitHistory(this.props.id)
  this.setState({open:false})
}

  handleRequestClose = () => {
    this.setState({open: false})

  }
  render() {

    const popoverDeleteFitHistory = (
      <Popover id="popover-delete-fit-history">
       Delete Fit History for {this.props.date}.
      </Popover>
    )  

  if (this.state.open){
      return (
        <React.Fragment>
        <Button id={this.props.id} bsStyle="link" bsSize="xsmall">
        <Glyphicon glyph='trash'/>
      </Button>
        <DeleteFitHistoryModal id={this.props.id} date={this.props.date} bike={this.props.bike} handleRequestClose={this.handleRequestClose} handleDelete={this.handleDelete}/>
        </React.Fragment>
      )
    }
    else return (
      <OverlayTrigger trigger={['hover','focus']}
      placement="bottom"
      overlay={popoverDeleteFitHistory}>
      <Button id={this.props.id} bsStyle="link" bsSize="xsmall" onClick={this.clickButton}>
        <Glyphicon glyph='trash'/>
      </Button>
      </OverlayTrigger>
     
    )

  }
}

export default DeleteFitHistory
