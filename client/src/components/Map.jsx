import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import config from '../mapboxConfig.js';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.5665,
        longitude: 126.9780,
        zoom: 12.5,
        maxZoom: 16,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      markers: []
    };
    this.addMarker = this.addMarker.bind(this);
  }

  addMarker({lngLat: [longitude, latitude]}) {
    // get long lat
    // push to markers state array
    let newMarkers = this.state.markers;
    newMarkers.push([longitude, latitude]);
    console.log(`newMarkers: ${JSON.stringify(newMarkers)}`);
    console.log(`this.state.markers: ${JSON.stringify(this.state.markers)}`);
    this.setState({ markers: newMarkers });
  }

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={v => this.setState({viewport: v})}
        mapboxApiAccessToken={config.MAPBOX_APP_TOKEN}
        onClick={this.addMarker}
      >
        {/* {this.state.markers.length ? 
          this.state.markers.map((m, i) => 
            <Marker coordinates={m} key={i} >
              {`Clicked here: ${m.longitude}, ${m.latitude}`}
            </Marker>
          ) 
          : null
        } */}
      </MapGL>
    );
  }
}

export default Map;