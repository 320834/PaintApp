import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";

import "../ComponentStyle/Toolbar.css";
import { SketchPicker } from "react-color";

class Toolbar extends React.Component {
  state = {
    color: "#000000"
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="lineWidthDiv">
          <h6 className="lineWidthHeader">Line Width: </h6>
          <select onChange={this.props.onClickSize}>
            <option value="4">4px</option>
            <option value="6">6px</option>
            <option value="8">8px</option>
            <option value="10">10px</option>
            <option value="12">12px</option>
            <option value="16">16px</option>
            <option value="20">20px</option>
            <option value="30">30px</option>
          </select>
        </div>
        <br />
        <button onClick={this.props.onClearClick} className="btn btn-primary">
          Clear Board
        </button>
        <br />
        <br />
        <SketchPicker
          color={this.props.color}
          width={140}
          onChangeComplete={this.props.onColorChange}
        />
      </React.Fragment>
    );
  }
}

export default Toolbar;
