const Sequelize = require('sequelize');
const db = require('./config');

const CharacterInfo = db.define('characterInfo', {
  name: Sequelize.STRING,
  realm: Sequelize.STRING,
  battlegroup: Sequelize.STRING,
  class: Sequelize.INTEGER,
  race: Sequelize.INTEGER,
  gender: Sequelize.INTEGER,
  level: Sequelize.INTEGER
});

CharacterInfo.sync();

module.exports = {
  CharacterInfo
}