import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";
import "../ComponentStyle/CanvasStyle.css";
import Toolbar from "./Toolbar";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import socketIOClient from "socket.io-client";

class SocketInstance {
  constructor(socketID) {
    this.socketID = socketID;
    this.x = [];
    this.y = [];
    this.paint = false;
  }

  /**
   * Coordinates to push
   */
  push(x, y) {
    this.x.push(x);
    this.y.push(y);
  }

  clear() {
    this.x = [];
    this.y = [];
  }

  setPaintTrue() {
    this.paint = true;
  }

  setPaintFalse() {
    this.paint = false;
  }
}

class Canvas extends React.Component {
  state = {
    paint: false,
    canvasHeight: 5000,
    canvasWidth: 5000,
    strokeStyle: "#000000",
    linewidth: 4,
    positionX: [],
    positionY: [],
    stroke: true,
    socket: socketIOClient("173.72.102.109:3001"),
    pageUrl: "http://173.72.102.109:3001"
  };

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.bottomScroll = React.createRef();
    this.topScroll = React.createRef();
    this.tools = React.createRef();
  }

  componentDidMount() {
    let context = this.canvas.current.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);

    fetch(this.state.pageUrl + "/getdata")
      .then(response => response.json())
      .then(data => {
        //Load data and draw on canvas
        this.saveDataDraw(data, context);
      });

    //window.addEventListener("load".this.updateDimensions);
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {};

  saveDataDraw = (arr, context) => {
    for (var i = 0; i < arr.length; i++) {
      context.strokeStyle = arr[i].color;
      context.lineJoin = "round";
      context.lineWidth = arr[i].linewidth;
      for (var a = 1; a < arr[i].x.length || a < arr[i].y.length; a++) {
        context.beginPath();
        context.moveTo(arr[i].x[a - 1], arr[i].y[a - 1]);
        context.lineTo(arr[i].x[a], arr[i].y[a]);
        context.closePath();
        context.stroke();
      }
    }
  };

  handleClick = event => {
    if (this.state.stroke) {
      var context = this.canvas.current.getContext("2d");

      let boardX =
        event.clientX -
        this.canvas.current.getBoundingClientRect()["x"] -
        this.state.linewidth / 3;
      let boardY =
        event.clientY -
        this.canvas.current.getBoundingClientRect()["y"] -
        this.state.linewidth / 3;

      context.fillStyle = this.state.strokeStyle;
      context.fillRect(
        boardX,
        boardY,
        this.state.linewidth,
        this.state.linewidth
      );

      // context.arc(boardX, boardY, this.state.linewidth, 0, 2 * Math.PI, true);
    } else if (this.state.fill) {
      // var context = this.canvas.current.getContext("2d");
      // let boardX =
      //   event.clientX - this.canvas.current.getBoundingClientRect()["x"];
      // let boardY =
      //   event.clientY - this.canvas.current.getBoundingClientRect()["y"];
      // this.fillFuncHelper(boardX, boardY);
    }
  };

  fillFuncHelper = (startX, startY) => {
    var context = this.canvas.current.getContext("2d");
    var myImageData = context.getImageData(startX, startY, 2, 2);

    var selectedColor = this.hexToRGB(this.state.strokeStyle);
    var boardColor = myImageData.data;
    context.fillStyle = selectedColor;
    this.fillFunc(startX, startY, selectedColor, boardColor, context);
  };

  fillFunc = (posX, posY, selectedColor, boardColor, context) => {
    var currentImageData = context.getImageData(posX, posY, 2, 2);
    if (posX < 0 || posX > 1000) {
      return;
    } else if (posY < 0 || posY > 800) {
      return;
    } else if (
      currentImageData.data[0] == selectedColor[0] &&
      currentImageData.data[1] == selectedColor[1] &&
      currentImageData.data[2] == selectedColor[2]
    ) {
      return;
    } else {
      //Fill current space
      context.fillRect(posX, posY, 2, 2);

      this.fillFunc(posX + 2, posY, selectedColor, boardColor, context);
      this.fillFunc(posX, posY + 2, selectedColor, boardColor, context);
      this.fillFunc(posX - 2, posY, selectedColor, boardColor, context);
      this.fillFunc(posX, posY - 2, selectedColor, boardColor, context);
    }
  };

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

  drawFunctionRecieving = (socketID, color, width, socketObj) => {
    let context = this.canvas.current.getContext("2d");

    context.strokeStyle = color;
    context.lineJoin = "round";
    context.lineWidth = width;

    context.beginPath();

    context.moveTo(
      socketObj.x[socketObj.x.length - 2],
      socketObj.y[socketObj.y.length - 2]
    );

    context.lineTo(
      socketObj.x[socketObj.x.length - 1],
      socketObj.y[socketObj.y.length - 1]
    );

    context.closePath();
    context.stroke();
  };

  handleMouseDown = event => {
    if (!this.state.paint) {
      this.state.socket.emit("mouseDown", this.state.socket.id);
    }

    if (this.state.stroke) {
      this.setState({ paint: true });
    }
    //console.log("mouseDown");
  };

  handleMouseMove = event => {
    if (this.state.stroke && this.state.paint) {
      let boardX =
        event.clientX - this.canvas.current.getBoundingClientRect()["x"];
      let boardY =
        event.clientY - this.canvas.current.getBoundingClientRect()["y"];
      let tempX = this.state.positionX;
      let tempY = this.state.positionY;
      tempX.push(boardX);
      tempY.push(boardY);

      this.state.socket.emit("draw", [
        boardX,
        boardY,
        this.state.strokeStyle,
        this.state.linewidth
      ]);

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
    if (this.state.stroke) {
      this.setState({ paint: false });

      //Send data to database.
      let jsonObj = {
        x: this.state.positionX,
        y: this.state.positionY,
        linewidth: this.state.linewidth,
        color: this.state.strokeStyle
      };

      fetch(this.state.pageUrl + "/postdata", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObj)
      })
        .then(function(response) {})
        .then(function(data) {});

      //Clear the arrays.
      this.setState({ positionX: [] });
      this.setState({ positionY: [] });
    }

    if (this.state.paint) {
      this.state.socket.emit("mouseUp", this.state.socket.id);
    }
  };

  handleClear = () => {
    this.canvas.current.getContext("2d").fillStyle = "white";
    this.canvas.current
      .getContext("2d")
      .fillRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);

    //Clear message for connected clients
    this.state.socket.emit("clear", this.state.socket.id);

    let jsonObj = {
      clear: true
    };

    //Clear message for database
    fetch(this.state.pageUrl + "/clearPost", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonObj)
    })
      .then(response => response.json())
      .then(data => {});

    this.setState({ positionX: [] });
    this.setState({ positionY: [] });
  };

  handleClearReceive = () => {
    this.canvas.current.getContext("2d").fillStyle = "white";
    this.canvas.current
      .getContext("2d")
      .fillRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);

    //this.setState({ positionX: [] });
    //this.setState({ positionY: [] });
  };

  handleColorChange = picker => {
    this.setState({ strokeStyle: picker.hex });
  };

  hoverSketch = (color, event) => {};

  toggleStroke = () => {
    this.setState({ stroke: true, fill: false });
  };

  toggleFill = () => {
    this.setState({ stroke: false, fill: true });
  };

  toggleSize = event => {
    this.setState({ linewidth: event.target.value });
  };

  hexToRGB = hex => {
    var red = hex.charAt(1) + hex.charAt(2);
    var green = hex.charAt(3) + hex.charAt(4);
    var blue = hex.charAt(5) + hex.charAt(6);

    red = parseInt(red, 16);
    green = parseInt(green, 16);
    blue = parseInt(blue, 16);

    return [red, green, blue];
  };

  getState = () => {
    console.log(this.state);
  };

  changeScroll = event => {
    this.bottomScroll.current.scrollLeft = this.topScroll.current.scrollLeft;
  };

  getToolComp = () => {
    return (
      <Toolbar
        onClearClick={this.handleClear}
        onClickStroke={this.toggleStroke}
        onClickFill={this.toggleFill}
        onClickSize={this.toggleSize}
        onColorChange={this.handleColorChange}
        color={this.state.strokeStyle}
      />
    );
  };

  render() {
    let connectedSockets = new Map();

    this.state.socket.on("socketConnect", socketIDIterator => {
      for (var i = 0; i < socketIDIterator.length; i++) {
        if (connectedSockets.has(socketIDIterator[i])) {
          //Do nothing
        } else {
          //Add to current list
          connectedSockets.set(
            socketIDIterator[i],
            new SocketInstance(socketIDIterator[i])
          );
        }
      }
    });

    this.state.socket.on("drawReceive", data => {
      if (data[0] != this.state.socket.id) {
        let socketObj = connectedSockets.get(data[0]);
        //console.log(socketObj);

        //data[0] = socket id
        //data[1] = x
        //data[2] = y
        //data[3] = color
        //data[4] = width

        if (socketObj) {
          socketObj.x.push(data[1]);
          socketObj.y.push(data[2]);
          this.drawFunctionRecieving(data[0], data[3], data[4], socketObj);
        } else {
          //console.error("Found no socket.");
        }
      }
    });

    this.state.socket.on("mouseDownReceive", socketID => {
      if (socketID != this.state.socket.id) {
        var socketObj = connectedSockets.get(socketID);
        if (socketObj != null) {
          socketObj.setPaintTrue();
        }
      }
    });

    this.state.socket.on("mouseUpReceive", socketID => {
      if (socketID != this.state.socket.id) {
        var socketObj = connectedSockets.get(socketID);
        if (socketObj != null) {
          socketObj.x = [];
          socketObj.y = [];
          socketObj.setPaintFalse();
        }
      }
    });

    this.state.socket.on("clearReceive", socketID => {
      if (socketID != this.state.socket.id) {
        this.handleClearReceive();
      }
    });

    this.state.socket.on("disconnectUser", socketID => {
      connectedSockets.delete(socketID);
    });

    //In line css
    const divStyle = {
      width: this.state.canvasWidth,
      height: "1px"
    };

    return (
      <React.Fragment>
        <div class="contain">
          <div className="Canvas">
            <div
              onScroll={this.changeScroll}
              className="topScroll"
              ref={this.topScroll}
            >
              <div style={divStyle} />
            </div>
            <div className="canvasWrapper" ref={this.bottomScroll}>
              <canvas
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                height={this.state.canvasHeight}
                width={this.state.canvasWidth}
                className="canvas"
                ref={this.canvas}
              />
            </div>
          </div>

          <div class="tools" ref={this.tools}>
            <Router>
              <div className="toolsNav">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <Link className="page-link" to="/">
                        Paint Tools
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <Route exact path="/" component={this.getToolComp} />
            </Router>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Canvas;
