import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import styled from 'styled-components';
import { media } from './media';
import config from '../../mapboxConfig'

const InputElement = styled.input`
  font-family: Helveitca Neue, sans-serif;
  border: 3px solid black;
  z-index: 70;
  position: absolute;
  opacity: 1.0 !important;
  border-radius: 25px;
  font-size: 30px;

  ${media.phone`
    font-size: 15px;
  `}
`;

const MarkerText = styled.div`
  font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
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
  font-size: 30px;

  ${media.phone`
    font-size: 15px;
  `}
`;

const DeleteButton = styled.div`
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 50%;
  border: #999999 solid 1px;
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
      text: '',
      inputFormActive: false,
      currentMarkerCoordinates: [],
      windowXyPoint: [],
      markers: [],
      hovered: false
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onMouseOverHandler = this.onMouseOverHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.saveGeoJSON = this.saveGeoJSON.bind(this);
    this.parseGeoJSON = this.parseGeoJSON.bind(this);
    this.onChangeInputHandler = this.onChangeInputHandler.bind(this);
  }

  // componentDidMount() {
  //   fetch(`${API_ROOT}/group/markers`)
  //     .then(response => response.json())
  //     .then(markers =>
  //       this.setState({
  //         markers
  //       })
  //     )
  // }

  onMouseOverHandler(e) {
    e.target.setAttribute('style', 'border: blue solid 1px;');
  }

  onMouseLeaveHandler(e) {
    e.target.style.border = null;
  }

  markerOnClickHandler(e) {

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
        currentMarkerCoordinates: [longitude, latitude],
        windowXyPoint: point
      });
      document.getElementById('inputElement').focus();
    }

    // document.getElementById('inputElement').addEventListener('onmouseover')
  }
  
  onChangeInputHandler(e) {
    e.preventDefault();
    this.setState( { text: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();

    const inputElementValueIsNotEmpty = document.getElementById('inputElement').value !== '';

    if (inputElementValueIsNotEmpty) {
      const newGeoJSONobject = this.parseGeoJSON(this.state.currentMarkerCoordinates, this.state.text);
      this.saveGeoJSON(newGeoJSONobject);
    }
    this.setState({ inputFormActive: false });
  }

  saveGeoJSON(newGeoJSONobject) {
    // Saves GeoJSON to state.

    // geoJSON data from server (postgres):
    // {
    //   "coordinates": {
    //       "x": -122.386697379757,
    //       "y": 37.7940630457069
    //   },
    //   "text": "sd"
    // }
    
    // geoJSON created client-side:
    // {
    //   "type": "Feature",
    //   "geometry": {
    //     "type": "Point",
    //     "coordinates": [123, 456],
    //   },
    //   "properties": {
    //     "name": "Hello World"
    //   }
    // }

    // convert geoJSONobject to postgres output format
    const markerData = {
      coordinates: {
        x: newGeoJSONobject.geometry.coordinates[0],
        y: newGeoJSONobject.geometry.coordinates[1],
      },
      text: newGeoJSONobject.properties.name
    }

    let newMarkers = this.state.markers;
    newMarkers.push(markerData);

    this.setState( { markers: newMarkers });

    fetch(`${API_ROOT}/markers`, {
      method: 'post',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(newGeoJSONobject),
    });
  };

  parseGeoJSON(currentCoordinates, text) {
    // Parses coordinate data as a GeoJSON point and returns it.
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": currentCoordinates,
      },
      "properties": {
        "name": text
      }
    };
  }

  render() {
    const { viewport, hovered, markers } = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={v => this.setState({viewport: v})}
        // mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapboxApiAccessToken={config.MAPBOX_TOKEN}
        onClick={this.onClickHandler}
      >
        {this.state.inputFormActive ?
            <form id='inputForm' onSubmit={this.onSubmitHandler}>
              <InputElement
                id='inputElement'
                type='text'
                onChange={this.onChangeInputHandler}
                style={{
                  left: `${this.state.windowXyPoint[0]}px`,
                  top: `${this.state.windowXyPoint[1]}px`
                }}
              />
            </form>
        : null}

        {markers.length !== 0 ? 
          markers.map((geoJson, i) => {
            const longitude = geoJson.coordinates.x;
            const latitude = geoJson.coordinates.y;
            const text = geoJson.text;

            return (
              <Marker className='marker' latitude={latitude} longitude={longitude} key={i}>
                <MarkerText 
                  onMouseOver={this.onMouseOverHandler}
                  onMouseLeave={this.onMouseLeaveHandler}
                >
                  {text}
                </MarkerText>
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