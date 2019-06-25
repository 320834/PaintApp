import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";
import { SketchPicker } from "react-color";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    return (
      <React.Fragment>
        <button onClick={this.props.onClearClick} className="btn btn-primary">
          Clear
        </button>
      </React.Fragment>
    );
  }
}

export default Toolbar;
