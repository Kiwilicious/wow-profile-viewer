import React, { Component } from 'react';
import axios from 'axios';
import {Button, Grid, Row, Col, Panel, PanelGroup} from 'react-bootstrap';
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
    this.handleRender = this.handleRender.bind(this);
  }

  componentDidMount() {
    this.handleGetChars();
  }  

  handleGetChars() {
    // this.setState({
    //   toggle: !this.state.toggle
    // });
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
    for (let i = 0; i < this.state.characters.length; i++) {
      if (this.state.characters[i].id === parseInt(id)) {
        this.setState({
          characters: this.state.characters.slice(0, i).concat(this.state.characters.slice(i + 1))
        })
      }
    }
    axios.delete('api/charinfo/delete', {data: {id}})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  handleRender(char) {
    this.setState({
      characters: [...this.state.characters, char]
    });
  }

  handleToggle() {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={10} xsOffset={1}><AddProfile handleRender={this.handleRender}/></Col>
        </Row>
        {/* <Button bsStyle="primary" onClick={this.handleGetChars}>Refresh</Button> */}
        <hr/>
        <PanelGroup accordion>
          {
            this.state.characters.map(char => {
              return (
                <Panel header={`${char.name} / ${char.realm}`} eventKey={char.id} className="panel">
                  <Row className="show-grid test" data-id={char.id} onClick={this.handleDeleteChar}>
                    <Col className="char" xs={6} md={3}>
                      <img src={`http://us.battle.net/static-render/us/${char.thumbnail}`} alt="No image found" />
                      <div className="level"> Level: {char.level}</div>
                    </Col>
                    <Col className="char" xs={6} md={3}>
                      <div className="name">Name: {char.name}</div>
                      <div className="realm">Realm: {char.realm}</div>
                    </Col>
                    <Col className="char" xs={6} md={3}>
                      <div className="battlegroup">{char.battlegroup}</div>
                      <div className="class">Class: {char.wowclass}</div>
                    </Col>
                    <Col className="char" xs={6} md={3}>
                      <div className="race">Race: {char.race}</div>
                      <div className="gender">Gender: {char.gender}</div>
                    </Col>
                  </Row>
                </Panel>
              )
            })
          }
        </PanelGroup>
      </Grid>
    );
  }
}

export default App;