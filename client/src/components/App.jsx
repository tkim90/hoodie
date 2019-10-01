import React from 'react';
import PropTypes from 'prop-types';
import Canvas from './Canvas.jsx'
import Categories from './Categories.jsx'
import Map from './Map.jsx'

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
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
        <Canvas
          style={{ position: 'absolute', height: '100vh', width: '100vw', zIndex: 10 }}
          ref={(childRef) => {this.childRef = childRef}}
          selectedCategory={this.state.selectedCategory}
        />
        {/* <Categories 
          style={{ position: 'absolute' }}
          setCategoryChoice={this.setCategoryChoice}
        /> */}
        <Map />
      </div>
    )
  }
}

// App.propTypes = {

// }

export default App;