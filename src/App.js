import React, { PureComponent } from 'react';
import './App.css';
import { MyMapComponent } from './map.jsx';
import Select from 'react-select';
import Modal from 'react-modal';
import Iframe from 'react-iframe';

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
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        fetch(this.state.baseUrl + "members.json")
        .then(function(response) {
          return response.json();
            })
            .then( (data) => {
                this.setState({datasent: data});
                this.setState({data});
                Modal.setAppElement('body');
            });
    }
    selectorSet = (selector) => {
      selector = RegExp(selector.value);
      console.log(selector);
      this.setState({datasent: [], selectedOption: selector.value});
      this.setState({selector}, () => {
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
    hover = (data) => {
      let frameurl = (data.url.substr(0, 2) === "//" ) ?  "http://" + data.url : (data.url.substr(0, 4) === "http") ? data.url : this.state.baseUrl + data.url;
      if(this.state.currPerson.url === data.url) {
        this.setState({hoveredElement: data, toggledval: true});
        return;
      };
      this.setState({iframedata: frameurl, hoveredElement: data, currPerson: data, toggledval: true})
    }
    unhover = (data) => {
      this.setState({hoveredElement: {}, toggledval: false})
    }

    clickIcon = () => {
      this.setState({clickedElement: !this.state.clickedElement});
      if (this.state.clickedElement)  {
          this.openModal();
      } else {
        this.setState({clickedElement: false})
      }
    }

    openModal() {
        this.setState({modalIsOpen: true});
      }

    closeModal() {
      this.setState({clickedElement: false, currPerson: "", iframedata: "", modalIsOpen: false});
    }

    render = () =>
        <div className="App" >
          <div className="title">DALI '17
            <a className="code" href="https://github.com/k-rathi/DaliChallenge">code on github</a>
          </div>
          <div>
          <Modal
            className="modal"
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.3)"
              },
            }}
          >
            <div className= "flex-modal">
              <div className="flex-row">
                <div className="thumbnail-flexed"><img alt="" className="thumb" src={`http://mappy.dali.dartmouth.edu/${this.state.currPerson.iconUrl}`}/></div>
              <div className="flex-col">
                <div id="name">{this.state.currPerson.name}</div>
                <div id="message">{this.state.currPerson.message}</div>
              </div>
              <div id="projects"><div> Projects: </div> {
                this.state.currPerson.project && this.state.currPerson.project.map((project, i) => {
                  return (<div key={i} className="prj"> {project} </div>)
                })}
              </div>
            </div>
              <div className="iframe-container">
              <Iframe
                url={this.state.iframedata !== "" ? this.state.iframedata : "http://www.myguysolutions.com/wp-content/uploads/2010/01/404-basic.gif"}
                width="97.5%"
                height="96%"
              /></div>
            </div>
          </Modal>
        </div>
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

}

export default App;
