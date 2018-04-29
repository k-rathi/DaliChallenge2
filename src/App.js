import React, { PureComponent } from 'react';
import './App.css';
import { MyMapComponent } from './map.jsx';
const fancystyles = require('./snazzymaps.json');
class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            hoveredElement: {},
            clickedElement: "null",
            baseUrl: "http://mappy.dali.dartmouth.edu/",
            toggledval: true
        }
    }

    componentDidMount() {
        fetch(this.state.baseUrl + "members.json")
        .then(function(response) {
          return response.json();
            })
            .then( (data) => {
                this.setState({data});
            });
    }

    hover = (data) => {
      console.log("hover");
      this.setState({hoveredElement: data, toggledval: true})
    }

    unhover = (data) => {
      console.log("unhover");
      this.setState({hoveredElement: {}, clickedElement: "null",toggledval: false})
    }

    toggleInfo = () => {
      console.log("toggleinfo");
      this.setState({toggledval: !this.state.toggledval});
    }
    clickIcon = () => {
      if (this.state.clickedElement === "null")  {
        this.setState({clickedElement: this.state.hoveredElement})
      } else {
        this.setState({clickedElement: "null"})
      }
    }
    render = () => {
        return (
        <div className="App" >
          <div className="title">DALI '17<a className="code" href="https://github.com/k-rathi/DaliChallenge">code on github</a></div>
          <MyMapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBjIxwKO-s7ldF5PWW0qOb1KH_BVEhLpAI"
            loadingElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            isMarkerShown={true}
            buildModal={this.modal}
            clickIcon={this.clickIcon}
            toggledval= {this.state.toggledval}
            toggleInfo={this.toggleInfo}

            clicked={this.state.clickedElement}

            hovered={this.state.hoveredElement}
            hover={this.hover}
            unhover={this.unhover}

            data={this.state.data}
            containerElement={<div style={{ height:`100vh`, width: `100vw`}}/>}
          />
        </div>
        )
      }
}

export default App;
