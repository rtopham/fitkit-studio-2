import React, { Component } from 'react';
import MainRouter from './MainRouter';
import {BrowserRouter} from 'react-router-dom'

class App extends Component {

  render() {
   
    return (
      <BrowserRouter>
      
      <MainRouter/>
      </BrowserRouter>
      
    );
  }
}

export default App;
