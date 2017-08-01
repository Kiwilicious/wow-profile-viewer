const axios = require('axios');
const CharInfo = require('../db/index').CharInfo;
const env = require('../../env');

module.exports = {
  postCharInfo: (req, res) => {
    const charName = req.body.charName;
    const realmName = req.body.realmName;
    const APIKEY = env.APIKEY;
    axios.get(`https://us.api.battle.net/wow/character/${realmName}/${charName}?locale=en_US&apikey=${APIKEY}`)
      .then(({data}) => {
        const races = {
          1: 'Human', 2: 'Orc', 3: 'Dwarf', 4: 'Night Elf', 5: 'Undead', 6: 'Tauren', 7: 'Gnome', 8: 'Troll', 9: 'Goblin',
          10: 'Blood Elf', 11: 'Draenei', 22: 'Worgen', 24: 'Pandaren', 25: 'Pandaren', 26: 'Pandaren'
        };
        const wowclasses = {
          1: 'Warrior', 2: 'Paladin', 3: 'Hunter', 4: 'Rogue', 5: 'Priest', 6: 'Death Knight', 7: 'Shaman', 8: 'Mage',
          9: 'Warlock', 10: 'Monk', 11: 'Druid', 12: 'Demon Hunter'
        }
        const sex = {0: 'Male', 1: 'Female'};
        CharInfo.findOrCreate({
          where: {
            name: data.name,
            realm: data.realm,
            battlegroup: data.battlegroup,
            wowclass: wowclasses[data.class],
            race: races[data.race],
            gender: sex[data.gender],
            level: data.level
          }
        })
          .spread((char, created) => {
            if (created) {
              res.status(201).send(`Created user profile!`);
            } else {
              res.status(200).send(`Already in db!`);
            }
          })
          .catch(err => res.status(500).send(`Error creating profile! ${err}`))
      })
      .catch(err => {
        res.status(500).send(`Character/Realm combination produced an error! ${err}`);
      })
  },
  getCharInfo: (req, res) => {
    CharInfo.findAll({})
      .then(info => {
        res.status(200).send(info);
      })
      .catch(err => {
        res.status(500).send(`Error getting character information! ${err}`)
      })
  },
  putCharInfo: (req, res) => {},
  deleteCharInfo: (req, res) => {
    const id = req.body.id;
    CharInfo.destroy({
      where: {id}
    })
      .then(rowsDeleted => {
        res.status(200).send(`Deleted ${rowsDeleted} entr(ies)!`);
      })
      .catch(err => {
        res.status(500).send(`Error deleting entr(ies)! ${err}`);
      })
  }
};