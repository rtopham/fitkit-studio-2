import React, {Component} from 'react'
//import DeleteCyclist.cyclistProfile from './DeleteCyclist.cyclistProfile'
//import "./Cyclist.cyclistProfile.css"
import auth from '../auth/auth-helper'
import {readUserName} from './../user/api-user'

class CyclistRow extends Component {
state={

    loading: true,
    createdBy:'',
    cyclistAge:25

  }



componentDidMount=()=>{
  let ageDifMs = Date.now() - new Date(this.props.cyclist.cyclistProfile.birthDate).getTime()
  let ageDate = new Date(ageDifMs)
  let age = Math.abs(ageDate.getUTCFullYear() - 1970)
    const jwt = auth.isAuthenticated()
    readUserName({
      userId: this.props.cyclist.createdBy
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data)
      } else {
//        console.log(data)
        this.setState({createdBy: data.name, loading:false,cyclistAge:age})
  
      }
    })
  
  }


  render() {

return (


      <tr>

      <td>{this.props.cyclist.cyclistProfile.firstName+' '+this.props.cyclist.cyclistProfile.lastName}</td>
      <td>{this.props.cyclist.cyclistProfile.email}</td>
      <td>{this.props.cyclist.cyclistProfile.gender}</td>
      <td>{this.state.cyclistAge}</td>
      <td>{this.state.createdBy}</td>
      <td>{(new Date(this.props.cyclist.created)).toDateString()}</td>
      <td>{(new Date(this.props.cyclist.updated)).toDateString()}</td>
    </tr>



    )
  }


}

export default CyclistRow
