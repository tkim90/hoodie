import React from 'react';
import styled from 'styled-components';
import SearchCity from './SearchCity';

const Wrapper = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
  z-index: 11;
  right: 3%;
  top: 30%;
`;

const Logo = styled.div`
  content: url(../assets/logo.png);
  opacity: 0.8;
  height: 86%;
  width: 100.5%;
`;

const Categories = ({ searchCity, isLoading }) => {
  return (
    <Wrapper>
      <SearchCity searchCity={searchCity} />
      <Logo />
    </Wrapper>
  );
};

export default Categories;
