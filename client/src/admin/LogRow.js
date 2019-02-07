import React, {Component} from 'react'
//import DeleteCyclist from './DeleteCyclist'
//import "./Cyclist.css"

class LogRow extends Component {
state={

    open: false,

  }



  render() {

return (


      <tr>
      <td>{(new Date(this.props.log.date)).toDateString()}</td>
      <td>{(new Date(this.props.log.date)).toLocaleTimeString()}</td>
      <td>{this.props.log.description}</td>
    </tr>



    )
  }


}

export default LogRow
