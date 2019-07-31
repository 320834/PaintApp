import React from "react";
import Canvas from "./Components/Canvas";
import HomePage from "./Components/HomePage";
import Navigation from "./Components/Navigation";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.welcomeButton = React.createRef();
  }

  welcomeDiv = () => {
    return (
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Welcome
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  componentDidMount = () => {
    this.welcomeButton.current.click();
  };

  welcomeText = () => {
    return (
      <p>
        Welcome to my real-time paint application.
        <br />
        <br />
        In the white space behind this message, please draw something.
      </p>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Navigation />
          <Canvas />
        </div>

        <button
          type="button"
          className="welcomeButton"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          ref={this.welcomeButton}
        >
          Launch demo modal
        </button>
        <div>
          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Hello
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">{this.welcomeText()}</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
