const Sequelize = require('sequelize');
const db = require('./config');

const CharInfo = db.define('charInfo', {
  name: Sequelize.STRING,
  realm: Sequelize.STRING,
  battlegroup: Sequelize.STRING,
  wowclass: Sequelize.STRING,
  race: Sequelize.STRING,
  gender: Sequelize.STRING,
  level: Sequelize.INTEGER,
  thumbnail: Sequelize.STRING
});

CharInfo.sync();

module.exports = {
  CharInfo
}