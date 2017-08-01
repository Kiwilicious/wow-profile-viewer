import React, { Component } from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class AddProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      realmName: '',
      charName: ''
    };
    this.handleRealmChange = this.handleRealmChange.bind(this);
    this.handleCharName = this.handleCharName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleRealmChange(e) {
    console.log(e.target.value);
    this.setState({
      realmName: e.target.value
    })
  }

  handleCharName(e) {
    console.log(e.target.value);
    this.setState({
      charName: e.target.value
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios.post('api/charinfo/post', {
      charName: this.state.charName,
      realmName: this.state.realmName
    })
      .then(res => {
        this.props.handleRender(res.data);
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Form inline inline onSubmit={this.handleFormSubmit} className="nav">
        <FormGroup controlId="formInlineName">
          <ControlLabel>Character Name</ControlLabel>
          {' '}
          <FormControl type="text" placeholder="Uthur" onChange={this.handleCharName} />
        </FormGroup>
        {' '}
        <FormGroup controlId="formInlineEmail">
          <ControlLabel>Realm</ControlLabel>
          {' '}
          <FormControl type="text" placeholder="Frostmourne" onChange={this.handleRealmChange} />
        </FormGroup>
        {' '}
        <Button type="submit">
          Search Character
        </Button>
      </Form>
    );
  }
}

export default AddProfile;