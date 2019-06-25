import React from "react";
import Canvas from "./Components/Canvas";
import { SketchPicker } from "react-color";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Canvas colorHex={this.colorChange} />
      </React.Fragment>
    );
  }
}

export default App;
