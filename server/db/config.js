const Sequelize = require('sequelize');
const env = require('../../env');

const db = new Sequelize(env.serverURL, {
  dialect: 'postgres',
  pool: {max: 3, min: 0, idle: 1000}
});

db.authenticate()
  .then(() => {
    console.log(`Connected to database!`);
  })
  .catch(err => {
    console.log(`Error connecting to database! ${err}`);
  })