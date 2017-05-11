import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Container from './containers/Container';
import Controls from './containers/Controls';
import Store from './Store';
import './../App.css';
import 'material-design-lite';

class App extends Component {
  render() {
    return (
      <Provider store={Store} className="App">
        <div id="App-root">
          <Container />
          <Controls />
        </div>
      </Provider>
    );
  }
}

export default App;
