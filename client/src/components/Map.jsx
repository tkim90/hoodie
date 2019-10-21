import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import $ from 'jquery';
import styled from 'styled-components';
import config from '../../../mapboxConfig.js'

const InputElement = styled.input`
  font-family: Helveitca Neue, sans-serif;
  font-size: 30px;
  border: 3px solid black;
  z-index: 70;
  position: absolute;
  opacity: 1.0 !important;
  border-radius: 25px;
`;

const MarkerText = styled.div`
  font: 32px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  white-space: normal !important;
  will-change: transform;
  text-align: left;
  color: white;
  user-select: none;
  font-weight: 900;
  -webkit-text-stroke: 1px black;
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
      textValue: '',
      inputForm: [],
      currCoords: [],
      xYpoint: [],
      geoJSON: []
    };
    this.addMarker = this.addMarker.bind(this);
    this.appendInput = this.appendInput.bind(this);
    this.onChangeInputHandler = this.onChangeInputHandler.bind(this);
    this.removeInput = this.removeInput.bind(this);
  }

  appendInput({point, lngLat: [longitude, latitude]}) {
    const newInputForm = this.state.inputForm;
    newInputForm.push('input-form');
    this.setState({
      inputForm: newInputForm,
      currCoords: [longitude, latitude],
      xYpoint: point
    });
    $('#inputElement').focus();
  }
  
  onChangeInputHandler(e) {
    e.preventDefault();
    this.setState( { textValue: e.target.value });
  }

  removeInput(e) {
    e.preventDefault();
    this.addMarker(this.state.currCoords[0], this.state.currCoords[1]);
    const newGeoJSONpoint = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": this.state.currCoords
      },
      "properties": {
        "name": this.state.textValue
      }
    };
    let newGeoJSON = this.state.geoJSON;
    newGeoJSON.push(newGeoJSONpoint);
    this.setState( { geoJSON: newGeoJSON });
    $(e.target).remove();
  }

  addMarker(longitude, latitude) {
    let newMarkers = this.state.markers;
    newMarkers.push([longitude, latitude]);
    this.setState({ markers: newMarkers });
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
            <form key={i} onSubmit={this.removeInput}>
              <InputElement
                id='inputElement'
                type='text'
                key={i}
                onChange={this.onChangeInputHandler}
                style={{ left: `${this.state.xYpoint[0]}.px`, top: `${this.state.xYpoint[1]}px` }}
              />
            </form>
          )
        : null}

        {this.state.markers.length !== 0 ? 
          this.state.markers.map((m, i) => {
            return (
              <Marker latitude={m[1]} longitude={m[0]} key={i} >
                <MarkerText>{this.state.geoJSON.length ? this.state.geoJSON[i].properties.name : null}</MarkerText>
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