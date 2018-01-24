import React, {Component} from 'react';
import './App.css';
import server from './server';
import Image from 'react-graceful-image'
const hide = {
  display: 'none'
}
const show = {
  display: 'block'
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      champions: [],
      vis: []
    }
  }
  componentWillMount() {
    server
      .get()
      .then((res) => {
        const vis = new Array(res.data.length - 3)
          .fill()
          .map((e, i) => 0);
        this.setState({
          champions: res.data,
          vis: [
            1, 1, 1, ...vis
          ]
        }, () => console.log(this.state))
      })

  }
  next() {
    let vis = this.state.vis;
    console.log(vis)
    let find = 0,
      index = -1;
    for (let i = 0; i < vis.length; i++) {
      if (vis[i]) {
        find = 1;
      } else if (find) {
        index = i;
        find = 0;
      }
      vis[i] = 0;
    }
    console.log(index, vis.length)
    if (index > -1 && (index + 3 < vis.length || index < vis.length)) {
      const last = index + 3 < vis.length
        ? index + 3
        : vis.length;
      for (let i = index; i < last; i++) 
        vis[i] = 1;
      }
    else {
      for (let i = 0; i < 3; i++) 
        vis[i] = 1;
      }
    console.log(vis)
    this.setState({vis: vis})
  }
  render() {

    let champions = this.state.champions.length
      ? this.state.champions
      : [];
    return (
      <div
        style={{display:'flex'}}
        onClick={this
        .next
        .bind(this, null)}>
        {champions.map((c, i) => (
          <div
            className="champ"
            key={c.name}
            style={this.state.vis[i]
            ? show
            : hide}>
            <Image src={c.img}alt={c.name} width="120" height="120"/>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
