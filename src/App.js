import React, { PureComponent } from 'react';
import './App.css';
import { MyMapComponent } from './Map.jsx';
import Modal from 'react-modal';
import {Fixed} from './Fixed.jsx';
import {ModalContainer} from './ModalContainer.jsx';
// UNCOMMENT LINE BELOW FOR HTTPS/LOCAL FILE
// import * as members from './members.json';

// standard class constructor for React in ES6.
class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            datasent: [],
            hoveredElement: {},
            clickedElement: false,
            baseUrl: "http://mappy.dali.dartmouth.edu/",
            toggledval: true,
            selector: RegExp('/*/'),
            selectedOption: '17',
            modalIsOpen: false,
            iframedata: "",
            currPerson: ""
        }
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    // add the json data on componentDidMount, process and save to state.
    // DUE TO ERRORS WITH HTTP vs HTTPS FOR DEPLOY, ATTACHED JSON LOCALLY.
    // Initialize the data sent to the map with all people.
    // Attach the modal to the body.
    componentDidMount() {
      // UNCOMMENT LINES BELOW FOR HTTPS/LOCAL FILE

      // this.setState({datasent: members, data: members});
      // Modal.setAppElement('body');

      // COMMENT OUT REST OF FUNCTION FOR HTTPS/LOCAL FILE
        fetch(this.state.baseUrl + "members.json")
        .then(function(response) {
          return response.json();
            })
            .then( (data) => {
                this.setState({datasent: data, data});
                Modal.setAppElement('body');
            }).
    }

    // Filter set method to decide who to show based on term.
    selectorSet = (selector) => {
      selector = RegExp(selector.value);
      this.setState({selector, datasent: [], selectedOption: selector.value}, () => {
        let nextData = [];
        this.state.data.forEach( (person) =>  {
            for(let i = 0; i < person["terms_on"].length; i++) {
              if(person["terms_on"][i].match(this.state.selector)) {
                nextData.push(person);
              }
            }
        });
        this.setState({datasent: nextData});
      });
    }

    // sets a url to fetch iframe from in modal and establishes hover status.
    hover = (data) => {
      let frameurl = (data.url.substr(0, 2) === "//" )
        ?  "http://" + data.url
        : (data.url.substr(0, 4) === "http")
          ? data.url
          : this.state.baseUrl + data.url;
      if(this.state.currPerson.url === data.url) {
        this.setState({hoveredElement: data, toggledval: true});
        return;
      }
      this.setState({iframedata: frameurl, hoveredElement: data, currPerson: data, toggledval: true})
    }

    // resets state when stop hovering element.
    unhover = (data) => {
      this.setState({hoveredElement: {}, toggledval: false})
    }

    // click event for icon markers. toggles clicked state and then
    clickIcon = () => {
      this.setState({clickedElement: !this.state.clickedElement});
      this.state.clickedElement && this.openModal();

    }

    // open modal event
    openModal() {
        this.setState({modalIsOpen: true});
      }

    // close modal event which also removes clicked, the iframeload, and current person being stored.
    closeModal() {
      this.setState({clickedElement: false, currPerson: "", modalIsOpen: false});
    }

    // rendering method.
    // Referenced props//dali.dartmouth.edu/ for favicon and DALI title image
    render = () =>
        <div className="App" >
          <Fixed
            value={this.state.selectedOption}
            onChange={this.selectorSet}
          />
          <ModalContainer
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            currPerson={this.state.currPerson}
            iframeUrl={this.state.iframedata}
          />
          {/* map component loaded from map.jsx */}
          <MyMapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBjIxwKO-s7ldF5PWW0qOb1KH_BVEhLpAI"
            loadingElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ width: `100vw`}}/>}
            clickIcon={this.clickIcon}
            clicked={this.state.clickedElement}
            hovered={this.state.hoveredElement}
            hover={this.hover}
            unhover={this.unhover}
            data={this.state.datasent}
          />
        </div>

}

export default App;
