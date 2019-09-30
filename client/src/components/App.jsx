import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Canvas from './Canvas.jsx'
import Categories from './Categories.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setCategoryChoice = this.setCategoryChoice.bind(this);
    this.state = {
      selectedCategory: 'Techies'
    };
  }

  componentDidMount() {
    this.setState({
      city: window.location.href.split('/')[3]
    });
  }

  setCategoryChoice(e) {
    this.setState({
      selectedCategory: e.target.textContent
    });
  }

  render() {
    return (
      <div>
        <img src="../sf.png" alt="SF"></img>
        <Canvas 
          ref={(childRef) => {this.childRef = childRef}}
          selectedCategory={this.state.selectedCategory}
        />
        <Categories setCategoryChoice={this.setCategoryChoice} />
      </div>
    )
  }
}

// App.propTypes = {

// }

export default App;