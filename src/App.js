import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MyMapComponent } from './map.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            baseUrl: "http://mappy.dali.dartmouth.edu/"
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

    loadData( data ) {
        this.setState({data});
    }

    render = () => {
        let data = this.state.data;

        return (
        <div className="App" >
          <MyMapComponent
            isMarkerShown={true}
            data={data}
            containerElement={<div style={{ height: `100vh`, width: `100vw`}}/>}
            mapElement={<div style={{ height:`100%`}} /> }
          />
        {
            this.state.data.map((person, i)  => {
                (<img className="photo" src={this.state.baseUrl +  person.iconUrl} />)
            })
        }

        </div>
        )
      }
}

export default App;
