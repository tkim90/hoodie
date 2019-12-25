import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import styled from 'styled-components';
import config from '../../../mapboxConfig.js';

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
  font: 25px 'Poppins', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  white-space: normal !important;
  will-change: transform;
  text-align: left;
  color: white;
  user-select: none;
  font-weight: 900;
  max-width: 150px;
  word-wrap: break-word;
  line-height: 104%;
  -webkit-text-stroke: 1px black;
`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: props.currentCity.lat,
        longitude: props.currentCity.lng,
        zoom: 12.5,
        maxZoom: 16,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      markers: [],
      textValue: '',
      inputFormActive: false,
      currCoords: [],
      xYpoint: [],
      geoJSONarray: []
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.saveMarker = this.saveMarker.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.saveGeoJSON = this.saveGeoJSON.bind(this);
    this.parseGeoJSON = this.parseGeoJSON.bind(this);
    this.onChangeInputHandler = this.onChangeInputHandler.bind(this);
  }

  onClickHandler({point, lngLat: [longitude, latitude]}) {
    // Handle event when you click on a point in the map:
    // 1. Add a text input form
    // 2. If a text input form is active, remove it

    if (document.getElementById('inputElement')) {
      this.setState({
        inputFormActive: false,
      });
    } else {
      this.setState({
        inputFormActive: true,
        currCoords: [longitude, latitude],
        xYpoint: point
      });
      document.getElementById('inputElement').focus();
    }
  }
  
  onChangeInputHandler(e) {
    e.preventDefault();
    this.setState( { textValue: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();

    const inputElementValueIsNotEmpty = document.getElementById('inputElement').value !== '';

    if (inputElementValueIsNotEmpty) {
      const newGeoJSONpoint = this.parseGeoJSON();
      this.saveGeoJSON(newGeoJSONpoint);
      this.saveMarker(this.state.currCoords[0], this.state.currCoords[1], newGeoJSONpoint);
    }
    this.setState({ inputFormActive: false });
  }

  saveGeoJSON(newGeoJSONpoint) {
    // Saves GeoJSON to state.
    let newGeoJSON = this.state.geoJSONarray;
    newGeoJSON.push(newGeoJSONpoint);
    this.setState( { geoJSONarray: newGeoJSON });
  }

  saveMarker(longitude, latitude, geoJSON) {
    // Adds the text marker to the state/db.
    let newMarkers = this.state.markers;
    newMarkers.push([longitude, latitude]);
    this.setState({ markers: newMarkers });
    // fetch('/api/saveMarker', {
    //   method: 'post',
    //   headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify(geoJSON)
    // });
  }

  parseGeoJSON() {
    // Parses coordinate data as a GeoJSON point and returns it.
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": this.state.currCoords,
      },
      "properties": {
        "name": this.state.textValue
      }
    };
  }

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={v => this.setState({viewport: v})}
        mapboxApiAccessToken={config.MAPBOX_APP_TOKEN}
        onClick={this.onClickHandler}
      >
        {this.state.inputFormActive ?
            <form id='inputForm' onSubmit={this.onSubmitHandler}>
              <InputElement
                id='inputElement'
                type='text'
                onChange={this.onChangeInputHandler}
                style={{ 
                  left: `${this.state.xYpoint[0]}px`,
                  top: `${this.state.xYpoint[1]}px`
                }}
              />
            </form>
        : null}

        {this.state.markers.length !== 0 ? 
          this.state.markers.map((m, i) => {
            return (
              <Marker latitude={m[1]} longitude={m[0]} key={i} >
                <MarkerText>{this.state.geoJSONarray.length ? this.state.geoJSONarray[i].properties.name : null}</MarkerText>
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