import React from 'react';
import ReactMapGL from 'react-map-gl';
import config from '../mapboxConfig.js';

import {SVGOverlay} from 'react-map-gl';

function redraw({project}) {
  const [cx, cy] = project([-122, 37]);
  return <circle cx={cx} cy={cy} r={4} fill="blue" />;
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100vw",
        height: "100vh",
        latitude: 37.5665,
        longitude: 126.9780,
        zoom: 10,
        interactivityIsEnabled: true,
      }
    };
  }

  toggleMode(e) {
    // drag vs draw
    console.log("Toggled interactivity.");
    // this.state.interactivityIsEnabled ? React.cloneElement(
    //   this.ReactMapGL,
    //   {
    //     dragPan: { false },
    //   }
    // ) : null;
  }

  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken={config.MAPBOX_APP_TOKEN}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        // scrollZoom={false}
        // dragPan={false}
        // doubleClickZoom={false}
        // dragRotate={false}
        // doubleClickZoom={false}
        // touchZoom={false}
      >
        <SVGOverlay redraw={redraw} />
      </ReactMapGL>
    );
  }
}

export default Map;