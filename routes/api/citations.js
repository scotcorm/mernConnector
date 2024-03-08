const express = require('express');
const router = express.Router();

// @route  GET api/citations/test
// @desc   Tests citations route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Citations Works' }));

module.exports = router;
