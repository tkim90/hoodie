import React from 'react';
import PropTypes from 'prop-types';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    this.isPainting = false;

    this.color = '#0000ff';
    this.prevPos = { offsetX: 0, offsetY: 0 };
    this.line = [];
  }

  componentDidMount() {
    this.canvas.width = 2000; // hardcoded for now
    this.canvas.height = 1000;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
    this.context.lineWidth = 10;
    this.setState({ context: this.context });
  }

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
    // console.log(this.prevPos);
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      this.line = this.line.concat(positionData);
      this.setColor();
      console.log(this.color);
      this.paint(this.prevPos, offSetData, this.color);
    }
  }

  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.context = this.state.context;

    this.context.beginPath();
    this.context.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.context.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.context.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    this.context.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  setColor() {
    switch (this.props.selectedCategory) {
      case 'Techies':
        this.color = 'blue';
        break;
      case 'Rich':
        this.color = 'green';
        break;
      case 'Normies':
        this.color = 'yellow';
        break;
      default:
        this.color = 'blue';
    }
  }

  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
    }
    console.log(this.line);
  }

  saveStrokes() {
    // save to blob
    // save blob to db
    const saved = this.canvas.toBlob((blob) => {
      console.log('=====PRINTING BLOB=======');
      console.log(blob);
      var newImg = document.createElement('img');
      var url = URL.createObjectURL(blob);

      newImg.onload = function() {
        URL.revokeObjectURL(url);
      };

      newImg.src = url;
      document.body.appendChild(newImg);
    });
    console.log(saved);
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 10 }}>
        <canvas
          // style={{ height: '100%', width: '100%' }}
          ref={(ref) => (this.canvas = ref)}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.endPaintEvent}
          onMouseMove={this.onMouseMove}
        />
        <button onClick={this.saveStrokes.bind(this)}>DONE</button>
      </div>
    );
  }
}

// Canvas.propTypes = {

// }

export default Canvas;