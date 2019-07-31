import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";

import "../ComponentStyle/HomePage.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
  }

  handleClick = () => {
    console.log(this.refInput.current.value);
    //Check if name is good

    this.props.getUsername(this.refInput.current.value);

    //Pass name up to App
    this.refInput.current.value = "";
  };
  render() {
    return (
      <div>
        <form>
          <label>
            Username:
            <input ref={this.refInput} type="text" name="username" />
          </label>
        </form>
        <a
          className="btn btn-primary"
          href="/canvas"
          onClick={this.handleClick}
        >
          Click
        </a>
      </div>
    );
  }
}

export default HomePage;
