import React, {Component} from 'react'

class LogRow extends Component {

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
