import React from 'react';
import Categories from './Categories.jsx';
import Map from './Map.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'Techies',
      currentCity: {
        country: 'US',
        name: 'San Francisco',
        lat: 37.778810345244956,
        lng: -122.42208050200567
      }
    };
    this.setCategoryChoice = this.setCategoryChoice.bind(this);
    this.selectedCategory = this.state.selectedCategory;
    this.searchCity = this.searchCity.bind(this);
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

  setCategoryChoice(e) {
    switch (this.selectedCategory
      .replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
      .trim()
      .toLowerCase()
      ) {
      case 'techies':
        $('.brush').css('background-color', 'blue');
        break;
      case 'hipsters':
        $('.brush').css('background-color', 'purple');
        break;
      case 'rich':
        $('.brush').css('background-color', 'green');
        break;
      case 'normies':
        $('.brush').css('background-color', 'yellow');
        break;
      case 'tourists':
      $('.brush').css('background-color', 'red');
        break;
      default:
      $('.brush').css('background-color', 'blue');
    }
    this.setState({
      selectedCategory: e.target.textContent
    });
  }

  render() {
    return (
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
        <Categories
          style={{ position: 'absolute' }}
          setCategoryChoice={this.setCategoryChoice}
          searchCity={this.searchCity}
        />
        <Map currentCity={this.state.currentCity}/>
      </div>
    )
  }
}

export default App;