import React from 'react';
import Categories from './Categories.jsx';
import Map from './Map.jsx';
import lodash from 'lodash';

const DEBOUNCE_DELAY = 500;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCity: {
        country: 'US',
        name: 'San Francisco',
        lat: 37.778810345244956,
        lng: -122.42208050200567
      },
      isLoading: false,
    };
    this.searchCity = lodash.debounce(this.searchCity.bind(this), DEBOUNCE_DELAY);
  }

  componentDidMount() {
    window.location.href.split('/').push('sanfrancisco');
    this.setState({
      city: window.location.href.split('/')[3]
    });
  }

  searchCity(query) {
    // fetch(`/${query}`)
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityQuery}.json`)
    .then((currentCity) => console.log(JSON.stringify(currentCity)))
    .catch((err) => console.log(err.stack));
  }

  updateCity(query) {
    fetch(`/${query}`)
    .then((currentCity) => this.setState({ currentCity }))
    .catch((err) => console.log(err.stack));
  }

  render() {
    return (
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
        <Categories
          style={{ position: 'absolute' }}
          searchCity={this.searchCity}
          isLoading={this.isLoading}
        />
        <Map currentCity={this.state.currentCity}/>
      </div>
    )
  }
}

export default App;