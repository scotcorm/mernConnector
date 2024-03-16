const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Pig model
const Pig = require('../../models/Pig');

// Validation
// const validateMetricInput = require('../../validation/metric');

// @route  GET api/pigs/test
// @desc   Tests pigs route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Pigs Works' }));

// @route  POST api/posts
// @desc   create post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newPig = new Pig({
      pigs: req.body.data,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id,
    });

    newPig.save().then((pig) => res.json(pig));
  }
);

module.exports = router;
