const axios = require('axios');
const Auction = require('../db/index').Auction;
const env = require('../../env');

module.exports = {
  postAuction: (req, res) => {
    // const itemName = req.body.itemName;
    const realmName = req.body.realmName;
    const APIKEY = env.APIKEY;
    axios.get(`https://us.api.battle.net/wow/auction/data/${realmName}?locale=en_US&apikey=${APIKEY}`)
      .then(({data}) => {
        const dataURL = data.files[0].url;
        console.log(dataURL);
        axios.get(dataURL)
          .then(inner => {
            console.log(inner.data.auctions);
            res.status(200).send(inner.data.auctions);
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        res.status(500).send(`Character/Realm combination not found! ${err}`);
      })
  },
  getAuction: (req, res) => {},
  putAuction: (req, res) => {},
  deleteAuction: (req, res) => {}
};