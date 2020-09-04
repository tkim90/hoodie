import React, { Suspense, useState, useEffect } from 'react';
import Categories from './components/Categories.jsx';
import BarLoader from 'react-spinners/BarLoader';
const Map = React.lazy(() => import('./components/Map.jsx'));

const override = `
  top: 50%;
  left: 50%;
  border-color: white;
`;

const initialCity = {
  country: 'US',
  name: 'San Francisco',
  lat: 37.778810345244956,
  lng: -122.42208050200567,
};

const App = () => {
  const [city, setCity] = useState(initialCity);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Re-rendering.');
  }, []);

  const searchCity = (query) => {
    // fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityQuery}.json`)
    // .then((currentCity) => console.log(JSON.stringify(currentCity)))
    // .catch((err) => console.log(err.stack));
  };

  const updateCity = (query) => {
    // fetch(`/${query}`)
    // .then((currentCity) => this.setState({ currentCity }))
    // .catch((err) => console.log(err.stack));
  };

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
      <Suspense fallback={<BarLoader css={override} height={4} width={100} />}>
        <Categories style={{ position: 'absolute' }} searchCity={searchCity} isLoading={loading} />
        <Map currentCity={city} />
      </Suspense>
    </div>
  );
};

export default App;
