import React, { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import styled from 'styled-components';

const InputElement = styled.input`
  font-family: Helveitca Neue, sans-serif;
  border: 3px solid black;
  z-index: 70;
  position: absolute;
  opacity: 1 !important;
  border-radius: 25px;
  font-size: 30px;
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
`;

const DeleteButton = styled.div`
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 50%;
  border: #999999 solid 1px;
`;

const Map = ({ currentCity }) => {
  const initialViewport = {
    // latitude: currentCity.lat,
    // longitude: currentCity.lng,
    latitude: 37.778810345244956,
    longitude: -122.42208050200567,
    zoom: 12.5,
    maxZoom: 16,
    bearing: 0,
    pitch: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  interface Marker {
    x: number;
    y: number;
  }

  interface IMarkers {
    coordinates: Marker;
    text: string;
  }

  const [viewport, setViewport] = useState(initialViewport);
  const [text, setText] = useState('');
  const [inputFormActive, setInputFormActive] = useState<boolean | null>(null);
  const [currentMarkerCoordinates, setCurrentMarkerCoordinates] = useState<number[] | null>([]);
  const [windowXyPoint, setWindowXyPoint] = useState([]);
  const [markers, setMarkers] = useState<IMarkers[] | null>(null);
  const [hovered, setHovered] = useState(false);

  const onMouseOverHandler = (e) => {
    e.target.setAttribute('style', 'border: blue solid 1px;');
  };

  const onMouseLeaveHandler = (e) => {
    e.target.style.border = null;
  };

  // markerOnClickHandler= (e) =>{}

  const onClickHandler = ({ point, lngLat: [longitude, latitude] }) => {
    // Handle event when you click const on a point in the map:
    // 1. Add a text input form
    // 2. If a text input form is active, remove it

    if (document.getElementById('inputElement')) {
      setInputFormActive: false;
    } else {
      setInputFormActive(true);
      setCurrentMarkerCoordinates([longitude, latitude]);
      setWindowXyPoint(point);
      const inputElement: HTMLElement | null = document.getElementById('inputElement');
      inputElement?.focus();
    }
    // document.getElementById('inputElement').addEventListener('onmouseover')
  };

  const onChangeInputHandler = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const inputElementValue: HTMLElement | null = document.getElementById('inputElement');
    const inputElementValueIsNotEmpty: boolean =
      (inputElementValue as HTMLInputElement).value !== '';

    if (inputElementValueIsNotEmpty) {
      const newGeoJSONobject = parseGeoJSON(currentMarkerCoordinates, text);
      saveGeoJSON(newGeoJSONobject);
    }
    setInputFormActive(false);
  };

  const saveGeoJSON = (newGeoJSONobject) => {
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
      text: newGeoJSONobject.properties.name,
    };

    let newMarkers = markers;
    newMarkers?.push(markerData);

    setMarkers(newMarkers);

    fetch(`${process.env.API_URL}/markers`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGeoJSONobject),
    });
  };

  const parseGeoJSON = (currentCoordinates, text) => {
    // Parses coordinate data as a GeoJSON point and returns it.
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: currentCoordinates,
      },
      properties: {
        name: text,
      },
    };
  };

  return (
    <MapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={(v) => setViewport(v)}
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
      onClick={onClickHandler}
    >
      {inputFormActive ? (
        <form id="inputForm" onSubmit={onSubmitHandler}>
          <InputElement
            id="inputElement"
            type="text"
            onChange={onChangeInputHandler}
            style={{
              left: `${windowXyPoint[0]}px`,
              top: `${windowXyPoint[1]}px`,
            }}
          />
        </form>
      ) : null}

      {markers?.length !== 0
        ? markers?.map((geoJson, i) => {
            const longitude = geoJson.coordinates?.x;
            const latitude = geoJson.coordinates?.y;
            const text = geoJson.text;

            return (
              <Marker className="marker" latitude={latitude} longitude={longitude} key={i}>
                <MarkerText onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
                  {text}
                </MarkerText>
              </Marker>
            );
          })
        : null}
    </MapGL>
  );
};

export default Map;
