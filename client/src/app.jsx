import React, { Component } from 'react';
import axios from 'axios';
import {Button, Grid, Row, Col, Panel} from 'react-bootstrap';
import AddProfile from './AddProfile';

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
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8} xsOffset={2}><AddProfile /></Col>
        </Row>
         <Button bsStyle="primary" onClick={this.handleGetChars}>Toggle Characters</Button> 
        { this.state.toggle ?
          this.state.characters.map(char => {
            return (
              <Row className="show-grid test">
                <Col className="char" xs={12} md={10} xsOffset={2} data-id={char.id} onClick={this.handleDeleteChar}>
                  <Panel>
                    <div>Name: {char.name}</div>
                    <div>Realm: {char.realm}</div>
                    <div>Battlegroup: {char.battlegroup}</div>
                    <div>Class: {char.wowclass}</div>
                    <div>Race: {char.race}</div>
                    <div>Gender: {char.gender}</div>
                    <div>Level: {char.level}</div>
                  </Panel>
                </Col>
              </Row>
            )
          }) : null
        }
      </Grid>
    );
  }
}

export default App;