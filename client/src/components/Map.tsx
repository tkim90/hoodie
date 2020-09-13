import React, { useState, useEffect } from 'react';
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

interface Coordinates {
  x: number;
  y: number;
}

interface IMarker {
  coordinates: Coordinates;
  text: string;
}

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

  const [viewport, setViewport] = useState(initialViewport);
  const [text, setText] = useState('');
  const [inputFormActive, setInputFormActive] = useState<boolean | null>(null);
  const [currentMarkerCoordinates, setCurrentMarkerCoordinates] = useState<number[] | null>([]);
  const [windowXyPoint, setWindowXyPoint] = useState([]);
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {}, [markers]);

  const onMouseOverHandler = (e) => {
    e.target.setAttribute('style', 'border: blue solid 5px;');
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
      setInputFormActive(false);
    } else {
      setInputFormActive(true);
      setCurrentMarkerCoordinates([longitude, latitude]);
      setWindowXyPoint(point);
      const inputElement: HTMLElement | null = document.getElementById('inputElement');
      inputElement?.focus();
    }
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
    /**
    Save most recent geoJSON input to db via POST /api/v1/markers.
    @param {Object} geoJSON - the marker geoJSON created by the user.
    */

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

    const markerData = {
      coordinates: {
        x: newGeoJSONobject.geometry.coordinates[0],
        y: newGeoJSONobject.geometry.coordinates[1],
      },
      text: newGeoJSONobject.properties.name,
    };

    setMarkers([...markers, markerData]);
    // console.log("Sending marker: ");
    // console.log(newGeoJSONobject);
    console.log(JSON.stringify(newGeoJSONobject)); 

    fetch(`${process.env.API_URL}/api/v1/markers`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGeoJSONobject),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
