import React, { Component } from 'react';
import NavBar from './navBar.js';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  render() {
    return (
      <div className="Main">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
