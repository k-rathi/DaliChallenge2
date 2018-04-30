import React from 'react';

import { InfoWindow, withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps";
import * as fancy from "./snazzymaps.json";

// Presentational component for map
export const MyMapComponent = withScriptjs(withGoogleMap((props) =>

// Initialize map to Dartmouth's coordinates and remove some unnecessary buttons. Style with custom google maps styling
// using Dartmouth colors.
<GoogleMap
  defaultOptions={{styles: fancy, mapTypeControl: false, fullscreenControl: false}}
  defaultZoom={8}
  defaultCenter={{lat: 43.7044, lng:-72.2887}}
  >
  { props.data.map( (person, i ) =>

    // create all markers given the json data. Attach several propagated event handlers to change
    // state of the container component App. Maybe too much ternary, but cleans up code so not sure.
    <Marker
      key={ i }
      clickable={ true }
      onClick={ props.clickIcon }
      animation={ window.google.maps.Animation.DROP }
      onMouseOver={ () => props.hover(person) }
      onMouseOut={ () => props.unhover(person) }
      title= { person.name }
      zIndex={ person.iconUrl === props.hovered.iconUrl
        ? 3
        : 2 }
      shape={ person.iconUrl === props.hovered.iconUrl
        ? {coords: [45,45,45], type: "circle"}
        : {coords: [32.5,32.5,32.5], type: "circle"}}
      icon = { person.iconUrl === props.hovered.iconUrl
        ? { scaledSize: { width: 90, height: 90 },
            url: `https://mappy.dali.dartmouth.edu/${person.iconUrl}`}
        : { scaledSize: { width: 65, height: 65 },
            url: `https://mappy.dali.dartmouth.edu/${person.iconUrl}`}
      }
      position = {{
        lat: person.lat_long[0],
        lng: person.lat_long[1]
      }}
      >
      { person.iconUrl === props.hovered.iconUrl
        ? <InfoWindow >
            <div>
              {`${person.name} : ${person.message}`}
            </div>
          </InfoWindow>
        : <div></div>
      }
    </Marker>
    , this)}
</GoogleMap>
));
