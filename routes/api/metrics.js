const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile model
const Profile = require('../../models/Profile');
//Load user profile
const User = require('../../models/User');

// @route  GET api/metrics/test
// @desc   Tests metrics route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Metrics Works' }));

module.exports = router;
