import React from 'react';
import styled from 'styled-components';
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

const SearchCity = ({ searchCity }) => {
  const handleChange = (e) => searchCity(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted form.`);
  };

  const onSelect = (value) => console.log(value);

  return (
    <form onSubmit={handleSubmit}>
      <SearchBar placeholder="Search city" onChange={handleChange} />
    </form>
  );
};

export default SearchCity;
