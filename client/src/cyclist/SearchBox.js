import React, {Component} from 'react'
import {FormControl} from "react-bootstrap"

import "./Cyclist.css"

class SearchBox extends Component {
state={
    value: ''
  }

handleChange=(e)=>{
    this.setState({value:e.target.value})
    this.props.searchCustomers(e.target.value)
  }

render() {

return (
<span>
<FormControl className="search-box pull-right"
            type="text"
            value={this.state.value}
            placeholder="Search by Last Name"
            onChange={this.handleChange}
          />
      
</span>
)

  }

}

export default SearchBox
