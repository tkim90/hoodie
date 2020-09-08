import React from 'react';
import styled from 'styled-components';
import SearchCity from './SearchCity.jsx';
import { media } from './media';

const Wrapper = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
  z-index: 11;
  right: 3%;
  top: 30%;

  ${media.phone`
    height: 30px;
    width: 100%;
    top: 0%;
    right: 0%;
  `}
`;

const Logo = styled.div`
  content: url(../assets/logo.png);
  opacity: 0.8;
  height: 86%;
  width: 100.5%;

  ${media.phone`
    display:none;
  `}
`;

const Categories = ({ searchCity, isLoading }) => {
  return (
    <Wrapper>
      <SearchCity searchCity={searchCity} isLoading={isLoading} />
      <Logo />
    </Wrapper>
  );
};

export default Categories;
