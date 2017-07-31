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
        CharInfo.findOrCreate({
          where: {
            name: data.name,
            realm: data.realm,
            battlegroup: data.battlegroup,
            wowclass: data.class,
            race: data.race,
            gender: data.gender,
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
  getCharInfo: (req, res) => {},
  putCharInfo: (req, res) => {},
  deleteCharInfo: (req, res) => {}
};