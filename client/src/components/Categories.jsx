import React from 'react';
import styled from 'styled-components';
import SearchCity from './SearchCity.jsx';

const Wrapper = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
  z-index: 11;
  right: 3%;
  top: 30%;
  border: 1px solid red;
`;

const Logo = styled.div`
  content: url(../assets/logo.png);
  opacity: 0.8;
  height: 86%;
  width: 100.5%;
`;

const Categories = (props) => {
  return (
    <Wrapper>
      <SearchCity 
        searchCity={props.searchCity}
        isLoading={props.isLoading}
      />
      <Logo/>
    </Wrapper>
  )
}

export default Categories;