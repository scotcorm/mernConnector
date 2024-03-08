const express = require('express');
const router = express.Router();

// @route  GET api/metrics/test
// @desc   Tests metrics route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Metrics Works' }));

module.exports = router;
