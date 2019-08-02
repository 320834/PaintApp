import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";

class Navigation extends React.Component {
  onClickAbout = () => {
    alert("Stuff");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="">
          Paint App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav aboutDiv">
            <li className="nav-item">
              <a
                className="aboutDiv nav-link"
                data-toggle="modal"
                data-target="#exampleModal"
                href=""
              >
                About
              </a>
            </li>
          </ul>
        </div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  About
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
              <div class="modal-body">
                <p>Real Time Paint Application</p>
                <p>Frontend: React</p>
                <p>Backend: Express</p>
                <p>
                  Libraries Used:
                  <br />
                  1. Bootstrap
                  <br />
                  2. React-Router
                </p>
                <p>
                  Source Code: <br />
                  https://github.com/320834/PaintApp <a />
                </p>
                <p>
                  Color Picker: <br />
                  <a>https://github.com/casesandberg/react-color/</a>
                </p>
              </div>
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
      </nav>
    );
  }
}

export default Navigation;
