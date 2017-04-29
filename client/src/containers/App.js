import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ReactSimpleMap from "react-simple-maps";
import './App.css';

class App extends Component {

  componentWillMount() {
    console.log('mounting in app');
  }

  render() {
    return (
      <div>
        <h1>HOME PAGE</h1>
        <ReactSimpleMap
          geographyUrl={"../data/countries.topo.json"}
        />
      </div>
    );
  }
}

export default App;