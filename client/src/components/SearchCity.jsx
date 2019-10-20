import React from 'react';
import styled from 'styled-components';

const SearchBar = styled.input`
  position: absolute;
  top: 4%;
  left: 35%;
  vertical-align: center;
  font-family: Helvetica, sans-serif;
  font-size: 50px;
  font-weight: bold;
  z-index: 50;
  text-align: center;
`;

class SearchCity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // return <SearchBar value = "San Francisco" />
    return <div>TEST</div>
  }
}

export default SearchCity;