import React, { Component } from 'react';
import AddProfile from './AddProfile';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      toggle: true
    };
    this.handleGetChars = this.handleGetChars.bind(this);
    this.handleDeleteChar = this.handleDeleteChar.bind(this);
  }

  componentDidMount() {
    this.handleGetChars();
  }  

  handleGetChars() {
    this.setState({
      toggle: !this.state.toggle
    });
    axios.get('/api/charinfo/get')
      .then(res => {
        this.setState({
          characters: res.data
        })
      })
        .catch(err => console.log(err))
  }

  handleDeleteChar(e) {
    const id = e.currentTarget.dataset.id;
    axios.delete('api/charinfo/delete', {data: {id}})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <AddProfile />
        <button onClick={this.handleGetChars}>Toggle Characters</button>
        { this.state.toggle ?
          this.state.characters.map(char => {
            return (
              <div data-id={char.id} onClick={this.handleDeleteChar}>
                <div>Name: {char.name}</div>
                <div>Realm: {char.realm}</div>
                <div>Battlegroup: {char.battlegroup}</div>
                <div>Class: {char.wowclass}</div>
                <div>Race: {char.race}</div>
                <div>Gender: {char.gender}</div>
                <div>Level: {char.level}</div>
              </div>              
            )
          }) : null
        }
      </div>
    );
  }
}

export default App;