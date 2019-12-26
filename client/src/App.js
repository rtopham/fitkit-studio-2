import React, { Component } from 'react';
import MainRouter from './MainRouter';
import {BrowserRouter} from 'react-router-dom'

class App extends Component {
updateMenu=()=>{
  console.log("update menu here")
}
  render() {
   
    return (
      <BrowserRouter>
      
      <MainRouter/>
      </BrowserRouter>
      
    );
  }
}

export default App;
