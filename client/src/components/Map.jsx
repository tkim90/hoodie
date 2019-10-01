import React from 'react';
import { ReactMapGL, StaticMap } from 'react-map-gl';
import config from '../mapboxConfig.js';
import styled from 'styled-components';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100vw",
        height: "100vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 13,
        interactivityIsEnabled: true,
      }
    };
  }

  toggleInteractivity(e) {
    // console.log("Toggled interactivity.");
    // this.state.interactivityIsEnabled ? React.cloneElement(
    //   this.ReactMapGL,
    //   {
    //     dragPan: { false },
    //   }
    // ) : null;
  }

  render() {
    return (
      <StaticMap
        mapboxApiAccessToken={config.MAPBOX_APP_TOKEN}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        // scrollZoom={false}
        // dragPan={false}
        // doubleClickZoom={false}
        // dragRotate={false}
        // doubleClickZoom={false}
        // touchZoom={false}
      />
    );
  }
}

export default Map;