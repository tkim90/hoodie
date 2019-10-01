import React from 'react';
import PropTypes from 'prop-types';
import Canvas from './Canvas.jsx';
import Categories from './Categories.jsx';
import Map from './Map.jsx';
import $ from 'jquery';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'Techies'
    };
    this.setCategoryChoice = this.setCategoryChoice.bind(this);
    this.selectedCategory = this.state.selectedCategory;
  }

  componentDidMount() {
    this.setState({
      city: window.location.href.split('/')[3]
    });
  }

  setCategoryChoice(e) {
    switch (this.selectedCategory
      .replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
      .trim()
      .toLowerCase()
      ) {
      case 'techies':
        $('.brush').css('background-color', 'blue');
        break;
      case 'hipsters':
        $('.brush').css('background-color', 'purple');
        break;
      case 'rich':
        $('.brush').css('background-color', 'green');
        break;
      case 'normies':
        $('.brush').css('background-color', 'yellow');
        break;
      case 'tourists':
      $('.brush').css('background-color', 'red');
        break;
      default:
      $('.brush').css('background-color', 'blue');
    }
    this.setState({
      selectedCategory: e.target.textContent
    });
  }

  render() {
    return (
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
        <Canvas
          style={{ position: 'absolute', height: '100vh', width: '100vw', zIndex: 10 }}
          ref={(childRef) => {this.childRef = childRef}}
          selectedCategory={this.state.selectedCategory}
        />
        <Categories 
          style={{ position: 'absolute' }}
          setCategoryChoice={this.setCategoryChoice}
        />
        <Map />
      </div>
    )
  }
}

// App.propTypes = {

// }

export default App;