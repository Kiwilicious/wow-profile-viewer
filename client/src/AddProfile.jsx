import React, { Component } from 'react';
import axios from 'axios';

class AddProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      realms: ['Illidan', 'Frostmourne', 'Stormrage', 'Sargeras', 'Zul\'jin', 'Kil\'Jaeden', 'Mal\'Ganis'],
      currentRealm: '',
      charName: ''
    };
    this.handleRealmChange = this.handleRealmChange.bind(this);
    this.handleCharName = this.handleCharName.bind(this);
  }

  handleRealmChange(e) {
    console.log(e.target.value);
    this.setState({
      currentRealm: e.target.value
    })
  }

  handleCharName(e) {
    console.log(e.target.value);
    this.setState({
      charName: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form>
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