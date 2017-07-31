const router = require('express').Router();
const controller = require('../controllers/AuctionCtrl');

router.post('/post', controller.postAuction);
router.get('/get', controller.getAuction);
router.put('/put', controller.putAuction);
router.delete('/delete', controller.deleteAuction);

module.exports = router;