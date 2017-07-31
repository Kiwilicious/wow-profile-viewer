const router = require('express').Router();
const controller = require('../controllers/charInfoCtrl');

router.post('/post', controller.postCharInfo);
router.get('/get', controller.getCharInfo);
router.put('/put', controller.putCharInfo);
router.delete('/delete', controller.deleteCharInfo);

module.exports = router;