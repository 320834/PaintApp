import React from "react";
import Canvas from "./Components/Canvas";
import Navigation from "./Components/Navigation";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.welcomeButton = React.createRef();
  }

  state = {
    welcomeText: "",
    ip: "54.80.26.41"
  };

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
    if (window.innerWidth < 500) {
      this.setState({
        welcomeText:
          "We apologize for the inconvience. Phone functionality has not been fully implemented. Please use a personal computer"
      });
      this.welcomeButton.current.click();
    } else {
      this.setState({
        welcomeText:
          "Please draw anything in the background. Your strokes are displayed real time to other connected users to see."
      });
      this.welcomeButton.current.click();
    }
  };

  welcomeText = () => {
    return (
      <p>
        Welcome to my real-time paint application.
        <br />
        <br />
        {this.state.welcomeText}
      </p>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="totalBody">
          <Navigation />
          <Canvas ip={this.state.ip} />
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
