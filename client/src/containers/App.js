import React, { Component } from 'react';
import ReactSimpleMap from "react-simple-maps";
import './App.css';

class App extends Component {

  componentWillMount() {
    console.log('mounting in app');
  }

  render() {
    return (
    	<div id="home">
      	<h1>Adventure Awaits!</h1>
        <div id="homeMap">
        <ReactSimpleMap
          geographyUrl={"../data/countries.topo.json"}
          events={{
            geography: {
              onClick: (geography, evt) => {
                var countryName = `${geography.properties.admin}`;
                if(countryName.includes("United") || countryName.includes("Islands") || countryName.includes("Lands") || countryName.includes("Democratic") || countryName.includes("Republic")) {
                  alert(`Travel to the ${countryName}!`);
                } else {
                  alert(`Travel to ${countryName}!`);
                }
              }
            }
          }}
        />
        </div>
      </div>
    );
  }
}

export default App;