import React, {Component} from 'react';
import './App.css';
import server from './server';
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
        const vis = new Array(res.data.length - 3).fill().map((e,i)=>0);
        this.setState({
          champions: res.data,
          vis: [
            1, 1, 1, ...vis
          ]
        }, () => console.log(this.state))
      })

  }
  next() {
    const vis = this.state.vis;
    let find = false,
      index = 0;
      console.log(vis)
    const tvis = vis.map((c, i) => {
      if (c&&!find) {
        find = true;
        index = i+2;
        c=0;
      }
      if (find&& i<=index)c=0;
      else if(find&& i>index && i<index+4)c=1;

      console.log(find,index,c)
      return c;
    })
    console.log(tvis)
    this.setState({vis:tvis})
  }
  render() {

    let champions = this.state.champions.length
      ? this.state.champions
      : [];
    return (
      <div
        className="container"
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
            <img src={c.img} alt={c.name}/> {c.name}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
