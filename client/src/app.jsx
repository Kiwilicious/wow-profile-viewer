import React, { Component } from 'react';
import AddProfile from './AddProfile';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: []
    };
    this.handleGetChars = this.handleGetChars.bind(this);
  }

  componentDidMount() {
    this.handleGetChars;
  }
  

  handleGetChars() {
    axios.get('/api/charinfo/get')
      .then(res => {
        this.setState({
          characters: res
        })
      })
        .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <AddProfile />
      </div>
    );
  }
}

export default App;