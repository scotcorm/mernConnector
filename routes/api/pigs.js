const express = require('express');
const router = express.Router();

// @route  GET api/pigs/test
// @desc   Tests pigs route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Pigs Works' }));

module.exports = router;
