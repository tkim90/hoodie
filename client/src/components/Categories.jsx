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
  position: relative;
  content: url(../assets/logo.png);
  width: 200px;
  height: 85%;
  z-index: 100;
  opacity: 0.8;
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