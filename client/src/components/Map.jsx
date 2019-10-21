import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import config from '../mapboxConfig.js';
import $ from 'jquery';
import styled from 'styled-components';

const InputElement = styled.input`
  font-family: Helveitca Neue, sans-serif;
  font-size: 30px;
  border: 3px solid black;
  z-index: 70;
  position: absolute;
  opacity: 1.0 !important;
  border-radius: 25px;
`;

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
      markers: [],
      textValues: [],
      inputForm: [],
      currCoords: []
    };
    this.addMarker = this.addMarker.bind(this);
    this.appendInput = this.appendInput.bind(this);
    this.onChangeInputHandler = this.onChangeInputHandler.bind(this);
    this.removeInput = this.removeInput.bind(this);
  }

  appendInput({lngLat: [longitude, latitude]}) {
    const newInputForm = this.state.inputForm;
    newInputForm.push('input-form');
    this.setState({ 
      inputForm: newInputForm,
      currCoords: [longitude, latitude]
    });
  }
  
  onChangeInputHandler(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  addMarker(longitude, latitude) {
    let newMarkers = this.state.markers;
    newMarkers.push([longitude, latitude]);
    this.setState({ markers: newMarkers });
  }

  removeInput(e) {
    e.preventDefault();
    console.log(`adding marker and removing input`)
    this.addMarker(this.state.currCoords[0], this.state.currCoords[1]);
    $(e.target).remove();
  }

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={v => this.setState({viewport: v})}
        mapboxApiAccessToken={config.MAPBOX_APP_TOKEN}
        onClick={this.appendInput}
      >
        {this.state.inputForm.length !== 0 ?
          this.state.inputForm.map((input, i) =>
            <form onSubmit={this.removeInput}>
              <InputElement type='text' key={i} onChange={this.onChangeInputHandler}/>
            </form>
          )
        : null}

        {this.state.markers.length !== 0 ? 
          this.state.markers.map((m, i) => {
            console.log(m, i)
            return (
              <Marker latitude={m[1]} longitude={m[0]} key={i} >
                {`Clicked here: ${m[1]}, ${m[0]}`}
              </Marker>
            )
          }
          )
          : null
        }
      </MapGL>
    );
  }
}

export default Map;