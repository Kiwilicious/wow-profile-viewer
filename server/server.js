const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/config');
const models = require('./db/index');
const routes = require('./routes/index');

const PORT = 3000;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(express.static(path.join(__dirname, '../client/public')))
  .use('/api', routes);

app.listen(PORT, err => {
  if (err) {
    console.log(`There was an error starting the server! ${err}`);
  } else {
    console.log(`Server successfully started!`);
  }
})