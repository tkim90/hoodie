import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const ToggleButton = styled.div`
  position: absolute;
  z-index: 50;
  right: 6%;
  top: 27%;
  cursor: pointer;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 30px;
  background-color: white;
`;

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.isPainting = false;

    this.color = '#0000ff';
    this.prevPos = { offsetX: 0, offsetY: 0 };
    this.line = [];
    this.state = {
      mode: 'draw'
    };
  }

  componentDidMount() {
    this.canvas.width = 2000; // hardcoded for now
    this.canvas.height = 1500;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
    this.context.lineWidth = 50;
    this.setState({ context: this.context });

    document.addEventListener('mousemove', (e) => {
      let x = e.pageX;
      let y = e.pageY;
      $('.brush').css('left', x);
      $('.brush').css('top', y);
    });
  }

  toggleMode() {
    console.log("CLICKED")
    let newMode = this.state.mode === 'draw' ? 'text' : 'draw';
    this.setState({
      mode: newMode
    });
  }

  onMouseDown({ nativeEvent }) {
    if (this.state.mode === 'draw') {
      const { offsetX, offsetY } = nativeEvent;
      this.isPainting = true;
      this.prevPos = { offsetX, offsetY };
    }
  }

  onMouseMove({ nativeEvent }) {
    if (this.state.mode === 'draw') {
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
  }

  paint(prevPos, currPos, strokeStyle) {
    if (this.state.mode === 'draw') {
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
  }

  setColor() {
    switch (this.props.selectedCategory
      .replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
      .trim()
      .toLowerCase()
      ) {
      case 'techies':
        this.color = 'blue';
        break;
      case 'hipsters':
        this.color = 'purple';
        break;
      case 'rich':
        this.color = 'green';
        break;
      case 'normies':
        this.color = 'yellow';
        break;
      case 'tourists':
        this.color = 'red';
        break;
      default:
        this.color = 'blue';
    }
  }

  onMouseUp(e) {
    let x = e.pageX;
    let y = e.pageY;
    if (this.state.mode === 'draw') {
      if (this.isPainting) {
        this.isPainting = false;
      }
    } else if (this.state.mode === 'text') {
      // create canvas context
      this.context = this.canvas.getContext('2d');      
      this.context.font = 'bold 40px sans-serif';
      this.context.globalAlpha = 1.0;
      
      // create form
      var form = document.createElement('form');
      form.setAttribute('id', 'form');
      $('body').append(form);

      // create input
      var input = document.createElement('input');
      form.appendChild(input);
      input.type = 'text';
      input.className = 'dynamicTextInput';
      input.setAttribute('id', 'dynamicTextInput');
      $('input').css({'position': 'absolute'}, {'top': y}, {'right': x}, {'z-index': 60});
      input.setAttribute("style",
        `
        font-family: Helveitca, sans-serif;
        font-size: 40px;
        border: 1px solid black;
        z-index: 70;
        position: absolute;
        opacity: 1.0 !important;
        top: ${y}px;
        left: ${x}px
        `
      );
      $('.dynamicTextInput').focus();

      const renderTextToMap = (text) => {
        console.log("from renderTextToMap: ", text)
        this.context.fillText(text, x, y);
      };

      var textVal = '';

      input.onchange = function(e) {
        console.log('From onchange: ', e.target.value)
        textVal = e.target.value;
        renderTextToMap(textVal);
        console.log('From onchange: ', this.context);
      }

      form.onsubmit = function(e) {
        e.preventDefault();
        $('.dynamicTextInput').remove();
      }
      
    }
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

  renderImageFromBlob() {
    var ctx = this.getContext('2d');
    var img = new Image();
  
    img.onload = function(){
      ctx.drawImage(img, 0, 0)
    }
  
    img.src = URL.createObjectURL(blob);
  }

  render() {
    const buttonVal = this.state.mode.toUpperCase();
    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 10 }}>
        <canvas
          style={{ opacity: '0.5' }}
          ref={(ref) => (this.canvas = ref)}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
        />
          <ToggleButton onClick={this.toggleMode.bind(this)}>{buttonVal}</ToggleButton>
        <button onClick={this.saveStrokes.bind(this)}>DONE</button>
      </div>
    );
  }
}

// Canvas.propTypes = {

// }

export default Canvas;