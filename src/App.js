import React, { PureComponent } from 'react';
import './App.css';
import { MyMapComponent } from './map.jsx';
import Select from 'react-select';

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
            selectedOption: '17'
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
      selector = RegExp(selector.value);
      console.log(selector);
      this.setState({datasent: [], selectedOption: selector.value});
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
          <div className="selector">
          <Select
            autofocus
            name="select"
            defaultValue='17'
            value={this.state.selectedOption}
            onChange={this.selectorSet}
            options={[
              {value: '17W', label: '17W'},
              {value: '17S', label: '17S'},
              {value: '17', label: 'All' }
            ]}
          />
        </div>
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
