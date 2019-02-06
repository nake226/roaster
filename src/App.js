import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super(props);

    this.state = {
      location: "三浦海岸"
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>こんにちは、三浦海岸🍣</p>
        </header>
      </div>
    );
  }
}

export default App;
