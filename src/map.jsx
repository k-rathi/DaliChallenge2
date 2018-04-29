import React from 'react';

import { InfoWindow, withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps";
import * as fancy from "./snazzymaps.json";


export const MyMapComponent = withScriptjs(withGoogleMap((props) => {

return (<GoogleMap
  defaultOptions={{styles: fancy, mapTypeControl: false, fullscreenControl: false}}
  defaultZoom={8}
  defaultCenter={{lat: 43.7044, lng:-72.2887}}
  >
  { props.data.map( (person, i ) =>

    <Marker
      key={i}
      clickable={true}
      zIndex={10}
      onClick={props.clickIcon}
      animation={window.google.maps.Animation.DROP}
      onMouseOver={ () => props.hover(person) }
      onMouseOut={ () => props.unhover(person) }
      title= { person.name }
      style={{border: '100px solid black'}}
      shape={{coords: [45,45,45], type: "circle"}}
      icon = { person.iconUrl === props.hovered.iconUrl ? {
          scaledSize: { width: 90, height: 90 },
          url: `http://mappy.dali.dartmouth.edu/${person.iconUrl}`
      } : {
          scaledSize: { width: 65, height: 65 },
          url: `http://mappy.dali.dartmouth.edu/${person.iconUrl}`
      }}
      position = {{
        lat: person.lat_long[0],
        lng: person.lat_long[1]
      }}
      >
      { person.iconUrl === props.clicked.iconUrl ?
        <InfoWindow >
          <div>
            {`${person.name} : ${person.message}`}
          </div>
        </InfoWindow>
      : <div></div>
      }
    </Marker>
    , this)}
</GoogleMap>)
  }
));
