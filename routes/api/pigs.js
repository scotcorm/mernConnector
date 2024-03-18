const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Pig model
const Pig = require('../../models/Pig');

//Profile model
const Profile = require('../../models/Profile');

// Validation
// const validatePigInput = require('../../validation/pig');

// @route  GET api/pigs/test
// @desc   Tests pigs route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Pigs Works' }));

// @route  GET api/pigs
// @desc   get pigs
// @access Public- anyone can see pigs
router.get('/', (req, res) => {
  Pig.find()
    .sort({ date: -1 })
    .then((pigs) => res.json(pigs))
    .catch((err) => res.status(404).json({ nopigsfound: 'No pigs found' }));
});

// @route  GET api/pigs/:id
// @desc   get pigs by id
// @access Public- anyone can see pigs
router.get('/:id', (req, res) => {
  Pig.findById(req.params.id)
    .sort({ date: -1 })
    .then((pig) => res.json(pig))
    .catch((err) =>
      res.status(404).json({ nopigfound: 'No pig found with that ID' })
    );
});

// @route  POST api/pigs
// @desc   create pigData
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

// @route  DELETE api/pigs/:id
// @desc   Delete pig
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Pig.findById(req.params.id)
        .then((pig) => {
          // Check for pig record owner
          if (pig.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          //Delete
          pig.remove().then(() => res.json({ success: true }));
        })
        .catch((err) => res.status(404).json({ pignotfound: 'pig not found' }));
    });
  }
);

// @route  Post api/pigs/comment/:id
// @desc   Add comment to pig
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePigInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    Pig.findById(req.params.id)
      .then((pig) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add to comments array
        pig.comments.unshift(newComment);

        //Save
        pig.save().then((pig) => res.json(pig));
      })
      .catch((err) => res.status(404).json({ pignotfound: 'No pig found' }));
  }
);

// @route  Delete api/pigs/comment/:id/:comment_id
// @desc   Remove comment from pig
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Pig.findById(req.params.id)
      .then((pig) => {
        // Check to see if the comment exists
        if (
          pig.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentdoesnotexist: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = pig.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of the array
        pig.comments.splice(removeIndex, 1);

        pig.save().then((pig) => res.json(pig));
      })
      .catch((err) => res.status(404).json({ pignotfound: 'No pig found' }));
  }
);

module.exports = router;
