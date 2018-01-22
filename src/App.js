import React, {Component} from 'react';
import './App.css';
import server from './server';

class App extends Component {
  constructor() {
    super();
    this.state = {champions:[]}
  }
  componentWillMount() {
    server
      .get()
      .then((res) => {
        this.setState({champions: res})
      })

  }
  render() {
    return (
      <div className="container">
        {this
          .state
          .champions
          .map((c) => (
            <div>
              {c.name}
            </div>
          ))}
      </div>
    );
  }
}

export default App;
