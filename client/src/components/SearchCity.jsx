import React from 'react';
import styled from 'styled-components';
import config from '../../../mapboxConfig.js';
// import Geocoder from '@mapbox/react-geocoder';

const SearchBar = styled.input`
  position: absolute;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
  z-index: 50;
  text-align: center;
  width: 97%;
  top: -30px;
`;

class SearchCity extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.onSelect = this.onSelect.bind(this);
  }

  handleSearch(e)  {
    this.props.searchCity(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`Submitted form.`)
  }

  onSelect(value) {
    // this.setState({ value });
    console.log(value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <SearchBar placeholder="Search city" onChange={this.handleSearch}/>
      </form>
    // <Geocoder
    //   accessToken={config.MAPBOX_APP_TOKEN}
    //   onSelect={this.onSelect}
    //   showLoader={true}
    // />
    )
  }
}

export default SearchCity;