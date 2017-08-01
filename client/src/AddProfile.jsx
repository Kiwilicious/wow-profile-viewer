import React, { Component } from 'react';
import axios from 'axios';

class AddProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      realms: ['Illidan', 'Frostmourne', 'Stormrage', 'Sargeras', 'Zul\'jin', 'Kil\'Jaeden', 'Mal\'Ganis'],
      realmName: 'Illidan',
      charName: ''
    };
    this.handleRealmChange = this.handleRealmChange.bind(this);
    this.handleCharName = this.handleCharName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleRealmChange(e) {
    this.setState({
      realmName: e.target.value
    })
  }

  handleCharName(e) {
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          Character Name:
          <input type="text" onChange={this.handleCharName}/>
          Realm:
          <select onChange={this.handleRealmChange}>
            {
              this.state.realms.map(realm => {
                return <option value={realm}>{realm}</option>
              })
            }
          </select>
        </form>
      </div>
    );
  }
}

export default AddProfile;