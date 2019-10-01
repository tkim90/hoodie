import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  border: 1px solid red;
`;

const PickerArea = styled.div`
  position: relative;
  height: 90%;
  border: 1px solid blue;
  vertical-align: center;
`;

const Category = styled.div`
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
          <Category onClick={this.props.setCategoryChoice}>Techies</Category>
          <Category onClick={this.props.setCategoryChoice}>Rich</Category>
          <Category onClick={this.props.setCategoryChoice}>Normies</Category>
        </PickerArea>
      </Wrapper>
    )
  }
}

export default Categories;