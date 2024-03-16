const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile model
const Metric = require('../../models/Metric');

// Validation
// const validateMetricInput = require('../../validation/metric');

// @route  GET api/metrics/test
// @desc   Tests metrics route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Metrics Works' }));

// @route  POST api/posts
// @desc   create post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newMetric = new Metric({
      metrics: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id,
    });

    newMetric.save().then((metric) => res.json(metric));
  }
);

module.exports = router;
