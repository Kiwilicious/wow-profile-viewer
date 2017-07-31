const router = require('express').Router();

router.use('/charinfo', require('./charInfo'));

module.exports = router;