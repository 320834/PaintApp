import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";
import "../ComponentStyle/CanvasStyle.css";
import Toolbar from "./Toolbar";
import { SketchPicker } from "react-color";

class Canvas extends React.Component {
  state = {
    paint: false,
    strokeStyle: "#000000",
    linewidth: 5,
    positionX: [],
    positionY: []
  };

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.canvas.current.getContext("2d");
  }

  handleClick = event => {};

  drawFunction = (mouseX, mouseY) => {
    //console.log("Draw Function");
    let context = this.canvas.current.getContext("2d");

    context.strokeStyle = this.state.strokeStyle;
    context.lineJoin = "round";
    context.lineWidth = this.state.linewidth;

    context.beginPath();

    context.moveTo(
      this.state.positionX[this.state.positionX.length - 2],
      this.state.positionY[this.state.positionY.length - 2]
    );

    context.lineTo(
      this.state.positionX[this.state.positionX.length - 1],
      this.state.positionY[this.state.positionY.length - 1]
    );

    context.closePath();
    context.stroke();
  };

  handleMouseDown = event => {
    this.setState({ paint: true });
  };

  handleMouseMove = event => {
    if (this.state.paint) {
      let boardX =
        event.clientX - this.canvas.current.getBoundingClientRect()["x"];
      let boardY =
        event.clientY - this.canvas.current.getBoundingClientRect()["y"];
      let tempX = this.state.positionX;
      let tempY = this.state.positionY;
      tempX.push(boardX);
      tempY.push(boardY);

      this.setState({ positionX: tempX });
      this.setState({ positionY: tempY });

      //Add some buffering. Position for x and y are added to the array.
      if (this.state.positionX.length > 1 && this.state.positionY.length > 1) {
        this.drawFunction(boardX, boardY);
      }
    } else {
    }
  };

  handleMouseUp = event => {
    this.setState({ paint: false });

    //Remember to send data here

    //Clear the arrays.
    this.setState({ positionX: [] });
    this.setState({ positionY: [] });
  };

  handleClear = () => {
    this.canvas.current.getContext("2d").fillStyle = "white";
    this.canvas.current.getContext("2d").fillRect(0, 0, 1000, 1000);

    this.setState({ positionX: [] });
    this.setState({ positionY: [] });
  };

  handleColorChange = picker => {
    // console.log(picker);

    // console.log(picker.hex);
    this.setState({ strokeStyle: picker.hex });
  };

  hoverSketch = (color, event) => {
    console.log(color);
    console.log(event);
  };

  render() {
    return (
      <React.Fragment>
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownbutton"
          >
            Select Color
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownbutton">
            <SketchPicker
              color={this.state.strokeStyle}
              width={300}
              onChangeComplete={this.handleColorChange}
            />
          </div>
        </div>
        <Toolbar onClearClick={this.handleClear} />
        <br />
        <canvas
          draggable
          onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          height="1000"
          width="1000"
          className="canvas"
          ref={this.canvas}
        />
      </React.Fragment>
    );
  }
}

export default Canvas;
