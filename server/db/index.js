const Sequelize = require('sequelize');
const db = require('./config');

const CharInfo = db.define('charInfo', {
  name: Sequelize.STRING,
  realm: Sequelize.STRING,
  battlegroup: Sequelize.STRING,
  class: Sequelize.INTEGER,
  race: Sequelize.INTEGER,
  gender: Sequelize.INTEGER,
  level: Sequelize.INTEGER
});

CharInfo.sync();

module.exports = {
  CharInfo
}