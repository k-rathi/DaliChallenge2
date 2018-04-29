import React, { PureComponent } from 'react';
import './App.css';
import { MyMapComponent } from './map.jsx';
const fancystyles = require('./snazzymaps.json');
class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            datasent: [],
            hoveredElement: {},
            clickedElement: "null",
            baseUrl: "http://mappy.dali.dartmouth.edu/",
            toggledval: true,
            selector: RegExp('/*/'),
            id: 'All'
        }
    }

    componentDidMount() {
        fetch(this.state.baseUrl + "members.json")
        .then(function(response) {
          return response.json();
            })
            .then( (data) => {
                this.setState({datasent: data});
                this.setState({data});
            });
    }

    selectorSet = (selector) => {
      selector = RegExp(selector.target.value);
      console.log(selector);
      this.setState({datasent: []});
      this.setState({selector}, () => {
        let nextData = [];
        this.state.data.map( (person, j ) =>  {
            for(let i = 0; i < person["terms_on"].length; i++) {
              if(person["terms_on"][i].match(this.state.selector)) {
                nextData.push(person);
              }
            }
        });
        this.setState({datasent: nextData});
      });
    }

    hover = (data) => {
      console.log("hover");
      this.setState({hoveredElement: data, clickedElement: data, toggledval: true})
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
          <select className="selector" onChange={this.selectorSet}>
            <option value="17W"> 17W </option>
            <option value="17S"> 17S </option>
            <option selected value='17'> All </option>
          </select>
          <MyMapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBjIxwKO-s7ldF5PWW0qOb1KH_BVEhLpAI"
            loadingElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            isMarkerShown={true}
            selector={this.state.selector}
            clickIcon={this.clickIcon}
            toggledval= {this.state.toggledval}
            toggleInfo={this.toggleInfo}

            clicked={this.state.clickedElement}

            hovered={this.state.hoveredElement}
            hover={this.hover}
            unhover={this.unhover}

            selector={this.state.selector}
            data={this.state.datasent}
            containerElement={<div style={{ height:`100vh`, width: `100vw`}}/>}
          />
        </div>
        )
      }
}

export default App;
