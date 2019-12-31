import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { media } from './media';
// import Geocoder from '@mapbox/react-geocoder';

const SearchBar = styled.input`
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width: 97.5%;

  ${media.phone`
    width: 100%;
  `}
`;

class SearchCity extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  handleChange(e)  {
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

  fetchCityCoordinates() {

  }

  render() {
    // const { isLoading } = this.props.isLoading;
    
    return (
      <form onSubmit={this.handleSubmit}>
        {/* {isLoading ? 
          <Loader type="TailSpin" color="#00BFFF" height={13} width={13} style={loaderStyle}/>
          : null
        } */}
        <SearchBar placeholder="Search city" onChange={this.handleChange}/>
      </form>
    // <Geocoder
    //   accessToken={process.env.MAPBOX_TOKEN}
    //   onSelect={this.onSelect}
    //   showLoader={true}
    // />
    )
  }
}

export default SearchCity;