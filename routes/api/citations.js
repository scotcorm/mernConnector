const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile model
const Profile = require('../../models/Profile');
//Load user profile
const User = require('../../models/User');

// @route  GET api/citations/test
// @desc   Tests citations route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Citations Works' }));

module.exports = router;
