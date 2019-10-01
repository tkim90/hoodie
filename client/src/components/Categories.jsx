import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
  z-index: 11;
  right: 3%;
  top: 30%;

`;

const PickerArea = styled.div`
  position: relative;
  height: 90%;
  vertical-align: center;
  font-family: Helvetica, sans-serif;
  font-size: 30px;
  font-weight: bold;
`;

const Category = styled.div`
  opacity: 0.75;
  padding-left: 15px;
  &:hover {
    cursor: pointer;
  }
`;

class Categories extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <PickerArea>
          <Category 
            style={{ backgroundColor: 'blue' }}
            onClick={this.props.setCategoryChoice}
          > 🤓 Techies</Category>
          <Category
            style={{ backgroundColor: 'green' }}
            onClick={this.props.setCategoryChoice}
          > 💸 Rich</Category>
          <Category
            style={{ backgroundColor: 'yellow' }}
            onClick={this.props.setCategoryChoice}
          > 💁🏻 Normies</Category>
          <Category
            style={{ backgroundColor: 'red' }}
            onClick={this.props.setCategoryChoice}
          > 📷 Tourists</Category>
        </PickerArea>
      </Wrapper>
    )
  }
}

export default Categories;