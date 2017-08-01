import React, { Component } from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class AddProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // realms: ['Illidan', 'Frostmourne', 'Stormrage', 'Sargeras', 'Zul\'jin', 'Kil\'Jaeden', 'Mal\'Ganis'],
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
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Form inline inline onSubmit={this.handleFormSubmit}>
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

      // <div>
      //   <form onSubmit={this.handleFormSubmit}>
      //     Character Name:
      //     <input type="text" onChange={this.handleCharName}/>
      //     Realm:
      //     <select onChange={this.handleRealmChange}>
      //       {
      //         this.state.realms.map(realm => {
      //           return <option value={realm}>{realm}</option>
      //         })
      //       }
      //     </select>
      //   </form>
      // </div>