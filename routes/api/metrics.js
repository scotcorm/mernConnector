const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile model
const Metric = require('../../models/Metric');

//Profile model
const Profile = require('../../models/Profile');

// Validation
// const validateMetricInput = require('../../validation/metric');

// @route  GET api/metrics/test
// @desc   Tests metrics route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Metrics Works' }));

// @route  GET api/metrics
// @desc   get metrics
// @access Public- anyone can see metrics
router.get('/', (req, res) => {
  Metric.find()
    .sort({ date: -1 })
    .then((metrics) => res.json(metrics))
    .catch((err) =>
      res.status(404).json({ nometricsfound: 'No metrics found' })
    );
});

// @route  GET api/citations/:id
// @desc   get citations by id
// @access Public- anyone can see citations
router.get('/:id', (req, res) => {
  Metric.findById(req.params.id)
    .sort({ date: -1 })
    .then((metric) => res.json(metric))
    .catch((err) =>
      res.status(404).json({ nometricfound: 'No metric found with that ID' })
    );
});

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

// @route  DELETE api/metrics/:id
// @desc   Delete metric
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Metric.findById(req.params.id)
        .then((metric) => {
          // Check for metric record owner
          if (metric.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          //Delete
          metric.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ metricnotfound: 'metric not found' })
        );
    });
  }
);

module.exports = router;
